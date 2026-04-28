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
import { Paperclip, Trash2, Square, Send, X } from "lucide-react";
import styles from "./CareerMentor.module.css";
import { useUser } from "@/context/UserContext";

type Message = { role: "assistant" | "user", content: string, attachments?: { name: string, type: string }[] };

export default function CareerMentor() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [shake, setShake] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<{ name: string, type: string, base64: string }[]>([]);

  const initialMessage: Message = { 
    role: "assistant", 
    content: "Hello! I'm your Learnmora AI. I'm a master of all subjects—from career roadmapping to technical problem solving. How can I help you today?" 
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  // Handle path changes for context awareness
  useEffect(() => {
    if (pathname && pathname.includes("/subjects/")) {
      const subject = pathname.split('/').pop()?.replace(/-/g, ' ');
      setPulse(true);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `I noticed you're exploring **${subject}**. Need a deep dive into the technical requirements or a 2026 roadmap?`
      }]);
    }
  }, [pathname]);

  const handleClearChat = () => {
    setMessages([initialMessage]);
    setAttachments([]);
    if (isTyping) handleStopResponse();
  };

  const handleStopResponse = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsTyping(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachments(prev => [...prev, {
          name: file.name,
          type: file.type,
          base64: event.target?.result as string
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || isTyping) return;
    
    const userMsg = input;
    const currentAttachments = [...attachments];
    setInput("");
    setAttachments([]);
    setPulse(false);
    
    const newMessages: Message[] = [...messages, { 
      role: "user", 
      content: userMsg, 
      attachments: currentAttachments.map(a => ({ name: a.name, type: a.type }))
    }];
    setMessages(newMessages);
    setIsTyping(true);

    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({ 
          messages: newMessages,
          attachments: currentAttachments
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
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content = "I encountered an error. Please try again.";
          return updated;
        });
      }
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  };

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
        {isOpen ? <X size={24} /> : <span className={styles.triggerContent}>💬 AI Mentor</span>}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerTitle}>
              <h3>Learnmora AI</h3>
              <span>Global Agent • Gemini 1.5 Pro</span>
            </div>
            <button className={styles.clearBtn} onClick={handleClearChat} title="Clear Chat">
              <Trash2 size={18} />
            </button>
          </div>
          
          <div className={styles.messages}>
            {messages.map((m, idx) => (
              <div key={idx} className={`${styles.message} ${styles[m.role]}`}>
                {m.attachments && m.attachments.length > 0 && (
                  <div className={styles.msgAttachments}>
                    {m.attachments.map((a, i) => (
                      <span key={i} className={styles.attachmentTag}>📎 {a.name}</span>
                    ))}
                  </div>
                )}
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={atomDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {m.content}
                </ReactMarkdown>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.footerArea}>
            {attachments.length > 0 && (
              <div className={styles.attachmentPreview}>
                {attachments.map((a, i) => (
                  <span key={i} className={styles.previewTag}>
                    {a.name} 
                    <X size={12} onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))} />
                  </span>
                ))}
              </div>
            )}
            <div className={styles.inputArea}>
              <button 
                className={styles.iconBtn} 
                onClick={() => fileInputRef.current?.click()}
                disabled={isTyping}
              >
                <Paperclip size={20} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                multiple 
                onChange={handleFileUpload}
              />
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isTyping}
              />
              {isTyping ? (
                <button className={styles.stopBtn} onClick={handleStopResponse}>
                  <Square size={20} fill="currentColor" />
                </button>
              ) : (
                <button className={styles.sendBtn} onClick={handleSend} disabled={!input.trim() && attachments.length === 0}>
                  <Send size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
