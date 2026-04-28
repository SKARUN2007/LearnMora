"use client";

import { useState, useEffect } from "react";
import styles from "./FollowModal.module.css";

export default function FollowModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem("learnmora_follow_dismissed");
      if (!dismissed) setShow(true);
    }, 10000); // Show after 10 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("learnmora_follow_dismissed", "true");
    setShow(false);
    alert("Authority Locked! You'll receive the next Harvard/MIT free cert alerts.");
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={() => setShow(false)}>✕</button>
        <div className={styles.content}>
          <span className={styles.label}>PRESTIGE ACCESS</span>
          <h2>Don't miss the next Free Certificate</h2>
          <p>Get instant alerts for zero-cost professional certificates from Harvard, MIT, and Google. No spam. Only authority.</p>
          
          <form className={styles.form} onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your professional email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.btn}>Follow All Subjects</button>
          </form>
        </div>
      </div>
    </div>
  );
}
