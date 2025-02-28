import sqlite3
import os
import re
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

client = Groq(api_key=GROQ_API_KEY)

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

def execute_groq_generated_query(query: str):
    conn = sqlite3.connect('UserDetails.db')
    cursor = conn.cursor()

    try:
        cursor.execute(query)
        result = cursor.fetchone()
        conn.close()

        if result:
            return {
                "name": result[1],
                "age": result[2],
                "address": result[3],
                "role": result[4],
                "salary": result[5]
            }
        else:
            return None
    except Exception as e:
        conn.close()
        return {"error": str(e)}

def ask_groq(query: str):
    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": 
             "You are an AI assistant connected to an SQLite database containing user details."
             "Generate an SQL query to fetch details from the 'users' table."
             "Return ONLY the SQL query in the format: SELECT * FROM users WHERE name = 'John Doe';"
            },
            {"role": "user", "content": query}
        ]
    )

    return response.choices[0].message.content

def extract_sql_query(response: str):
    match = re.search(r'SELECT .*?;', response, re.DOTALL)
    return match.group(0) if match else None

def format_response_with_groq(user_query: str, user_data: dict):
    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": 
             "You are an AI assistant that formats database responses in a human-readable format."
             "Use the provided user details to generate a conversational response."
            },
            {"role": "user", "content": f"User query: {user_query}. User details: {user_data}"}
        ]
    )

    return response.choices[0].message.content


@app.post("/get-user-details")
async def get_user_details(request: QueryRequest):
    user_query = request.query

    if not user_query:
        raise HTTPException(status_code=400, detail="Query parameter is required")

    groq_response = ask_groq(user_query)
    sql_query = extract_sql_query(groq_response)

    if sql_query:
        user_data = execute_groq_generated_query(sql_query)

        if user_data:
            formatted_response = format_response_with_groq(user_query, user_data)
            return {"response": formatted_response}
        else:
            return {"response": "No details found in the database."}
    else:
        raise HTTPException(status_code=500, detail="Failed to generate a valid SQL query.")
