"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real scenario, this trigger's Supabase Magic Link
    const { error } = await supabase.auth.signInWithOtp({ email });
    
    if (error) {
      setMessage("Account verification failed. Please check your professional email.");
    } else {
      setMessage("Success! Check your inbox for your professional access link.");
    }
    setLoading(false);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Professional Access</h1>
          <p>Join the 2026 global elite. Track your credentials and build your verified roadmap.</p>
        </div>

        <form className={styles.form} onClick={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className={styles.submitBtn} disabled={loading}>
            {loading ? "Authenticating..." : "Get Magic Access Link"}
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.footer}>
          <p>Secure authentication powered by Supabase Identity.</p>
          <div className={styles.socialAuth}>
             <span>Or enter via</span>
             <button className={styles.linkedinBtn}>LinkedIn Authority</button>
          </div>
        </div>
      </div>
    </div>
  );
}
