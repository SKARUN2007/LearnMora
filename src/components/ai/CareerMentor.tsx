"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./CareerMentor.module.css";
import { useUser } from "@/context/UserContext";

type Message = { role: "assistant" | "user", content: string };

export default function CareerMentor() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [shake, setShake] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your Learnmora AI Career Mentor. How can I help you build your professional authority today?" }
  ]);

  // Handle path changes for context awareness
  useEffect(() => {
    if (pathname && pathname.includes("/subjects/")) {
      const subject = pathname.split('/').pop()?.replace(/-/g, ' ');
      setPulse(true);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `I noticed you're exploring **${subject}**. Would you like me to map out a 2026 career roadmap for this field?`
      }]);
    }
  }, [pathname]);

  // Handle auth failures
  useEffect(() => {
    const handleAuthFailure = () => {
      setIsOpen(true);
      setPulse(false);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I noticed that didn't go through! Try using your work email for better professional syncing!"
      }]);
      setShake(true);
      setTimeout(() => setShake(false), 800);
    };

    window.addEventListener('auth_failure', handleAuthFailure);
    return () => window.removeEventListener('auth_failure', handleAuthFailure);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input;
    setInput("");
    setPulse(false);
    
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setIsTyping(true);

    // Initialize an empty assistant message that will be streamed into
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: newMessages,
          context: {
            pathname,
            jobTitle: user?.user_metadata?.job_title || "Professional"
          }
        })
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        
        // Append chunk to the last message
        setMessages(prev => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: updated[lastIndex].content + chunkValue
          };
          return updated;
        });
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].content = "I'm having trouble connecting to my knowledge base right now. Please try again later.";
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <div className={`${styles.mentor} ${isOpen ? styles.open : ""}`}>
      <button 
        className={`${styles.trigger} ${shake ? styles.shake : ""} ${pulse && !isOpen ? styles.pulse : ""}`} 
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setPulse(false);
        }}
      >
        {isOpen ? "✕" : "💬 AI Mentor"}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Career Architect</h3>
            <span>Powered by Gemini API</span>
          </div>
          <div className={styles.messages}>
            {messages.map((m, idx) => (
              <div key={idx} className={`${styles.message} ${styles[m.role]}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
              </div>
            ))}
            {isTyping && <div className={`${styles.message} ${styles.assistant}`}>...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputArea}>
            <input 
              type="text" 
              placeholder="Ask about ROI, compare courses..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isTyping}
            />
            <button onClick={handleSend} disabled={isTyping}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
