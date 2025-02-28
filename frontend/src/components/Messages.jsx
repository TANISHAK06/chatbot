import { useEffect, useRef } from "react";

const Messages = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-2 md:p-3 space-y-3 md:space-y-4 mb-3 md:mb-4 rounded-lg bg-white bg-opacity-60 backdrop-blur-sm shadow-inner">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 italic text-xs md:text-sm mt-12">
          No messages yet. Start a conversation!
        </div>
      )}

      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div className="flex items-center space-x-2">
            {msg.sender !== "user" && <span className="text-lg">🤖</span>}
            <div
              className={`max-w-xs lg:max-w-md px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm md:text-base mt-2 ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                  : "bg-white text-gray-800 rounded-bl-none shadow-md"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && <span className="text-lg">🤵</span>}
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-white text-indigo-600 rounded-lg rounded-bl-none p-2 md:p-3 flex items-center shadow-md">
            <div className="flex space-x-1">
              <span
                className="w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></span>
              <span
                className="w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-600 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></span>
              <span
                className="w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
