"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "katex/dist/katex.min.css";
import { Paperclip, Trash2, Square, Send, X, MessageSquare, Sparkles } from "lucide-react";
import styles from "./CareerMentor.module.css";
import { useUser } from "@/context/UserContext";

type Message = { role: "assistant" | "user", content: string, attachments?: { name: string, type: string }[] };

export default function CareerMentor() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ 
    role: "assistant", 
    content: "Hello! I'm your LearnMora Ai Mentor. How can I help you today?" 
  }]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);
    // ... simulation of AI logic omitted for brevity in reset
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: "I am processing your request. Our Global Index has over 10,000 Ivy League courses verified for 2026." }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`${styles.mentor} ${isOpen ? styles.open : ""}`}>
      <button 
        style={{
          background: 'linear-gradient(135deg, #022778 0%, #1e293b 100%)',
          color: 'white',
          height: '60px',
          padding: '0 1.5rem',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(2, 39, 120, 0.3)',
          border: 'none',
          cursor: 'pointer'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <span style={{ fontWeight: 700, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Sparkles size={18} /> AI Mentor</span>}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerTitle}>
              <h3>LearnMora Ai Mentor</h3>
              <span>Global Agent • Gemini 1.5 Pro</span>
            </div>
            <button className={styles.clearBtn} onClick={() => setMessages([])} title="Clear Chat">
              <Trash2 size={18} />
            </button>
          </div>
          <div className={styles.messages}>
            {messages.map((m, idx) => (
              <div key={idx} className={`${styles.message} ${styles[m.role]}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {m.content}
                </ReactMarkdown>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputArea}>
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className={styles.sendBtn} onClick={handleSend}>
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
