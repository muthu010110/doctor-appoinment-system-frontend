import React, { useState } from "react";
import axios from "axios";
import { MessageCircle, Send, X } from "lucide-react";
import "./Stylefile/Chatbot.scss";

function Chatbot() {
  const [isOpen, setisOpen] = useState(false);
  const [message, setMessage] = useState([
    { from: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setinput] = useState("");

  const toggleChat = () => setisOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

   
    const usermessage = { from: "user", text: input };
    setMessage(prev => [...prev, usermessage]);
    setinput("");

    try {
      const response = await axios.post("http://localhost:8080/api/ai/chat", {
        message: input,
      });

      const aiText = response.data;
      setMessage(prev => [...prev, { from: "bot", text: aiText }]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessage(prev => [
        ...prev,
        { from: "bot", text: "Sorry, I'm having trouble responding right now." }
      ]);
    }
  };

  return (
    <div className="chatbot">
      {isOpen ? (
        <div className="chatbot__window">
          <div className="chatbot__header">
            <span>Health Assistant</span>
            <button className="chatbot__close" onClick={toggleChat}>
              <X size={14} />
            </button>
          </div>
          <div className="chatbot__messages">
            {message.map((msg, i) => (
              <div key={i} className={`chatbot__message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot__input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setinput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>
              <Send size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button className="chatbot__toggle" onClick={toggleChat}>
          <MessageCircle size={20} />
        </button>
      )}
    </div>
  );
}

export default Chatbot;
