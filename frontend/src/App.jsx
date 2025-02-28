import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Hovermessage from "./components/Hovermessage";
import Footer from "./components/Footer";
import Top from "./components/Top";
import Messages from "./components/Messages";
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
  }, []);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const newMessages = [
      ...messages,
      {
        text: query,
        sender: "user",
      },
    ];

    setMessages(newMessages);
    setQuery("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/get-user-details", // Api call
        { query }
      );
      setMessages([
        ...newMessages,
        {
          text: response.data.response,
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.log(error);
      setMessages([
        ...newMessages,
        {
          text: "Error fetching response",
          sender: "bot",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 to-purple-50 relative">
        <Header />
        <Hovermessage showMessage={showMessage} />
        <Top />
        <div
          className="flex-1 flex flex-col w-full max-w-3xl mx-auto p-2 md:p-4 overflow-hidden"
          onMouseEnter={() => !isMobile && setShowMessage(true)}
          onMouseLeave={() => !isMobile && setShowMessage(false)}
        >
          <Messages messages={messages} loading={loading} />
          {/* Input Area */}
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 pr-12 md:p-4 md:pr-16 rounded-full border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md text-sm md:text-base"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask something..."
            />
            <button
              className="absolute right-1 top-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 md:p-3 rounded-full hover:opacity-90 transition-opacity shadow-md disabled:opacity-50"
              onClick={sendMessage}
              disabled={loading || !query.trim()}
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ChatBot;
