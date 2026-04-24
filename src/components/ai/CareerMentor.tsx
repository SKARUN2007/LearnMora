"use client";

import { useState } from "react";
import styles from "./CareerMentor.module.css";

export default function CareerMentor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your Learnmora AI Career Mentor. How can I help you build your professional authority today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "That's a great question. Based on current market trends, I suggest looking into 100% Free Professional Certificates from Google and Harvard to build your foundational credits." 
      }]);
    }, 1000);
  };

  return (
    <div className={`${styles.mentor} ${isOpen ? styles.open : ""}`}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬 AI Mentor"}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Career Mentor</h3>
            <span>Powered by Gemini API</span>
          </div>
          <div className={styles.messages}>
            {messages.map((m, idx) => (
              <div key={idx} className={`${styles.message} ${styles[m.role]}`}>
                {m.content}
              </div>
            ))}
          </div>
          <div className={styles.inputArea}>
            <input 
              type="text" 
              placeholder="Ask about free certificates..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
