"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./login.module.css";
import { supabase } from "@/lib/supabase";

function LoginContent() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const [authMode, setAuthMode] = useState<"login" | "signup">(modeParam === "signup" ? "signup" : "login");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (modeParam === "signup") {
      setAuthMode("signup");
    }
  }, [modeParam]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : 'https://learnmora.com/dashboard',
        data: {
          full_name: fullName
        }
      }
    });
    
    if (error) {
      setMessage("Account verification failed. Please check your professional email.");
      setIsSuccess(false);
      window.dispatchEvent(new CustomEvent('auth_failure'));
    } else {
      setMessage("Success! Link sent to your inbox.");
      setIsSuccess(true);
    }
    setLoading(false);
  };

  const handleOAuth = async (provider: 'linkedin_oidc' | 'google' | 'apple') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : 'https://learnmora.com/dashboard',
      }
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.logo}>
        LEARN<span>MORA</span>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${authMode === "login" ? styles.activeTab : ""}`}
          onClick={() => setAuthMode("login")}
          type="button"
        >
          Log In
        </button>
        <button 
          className={`${styles.tab} ${authMode === "signup" ? styles.activeTab : ""}`}
          onClick={() => setAuthMode("signup")}
          type="button"
        >
          Sign Up
        </button>
      </div>

      <div className={styles.header}>
        <h1>{authMode === "login" ? "Welcome back" : "Create your professional account"}</h1>
      </div>

      <div className={styles.socialAuth}>
        <button className={`${styles.socialBtn} ${styles.linkedinBtn}`} onClick={() => handleOAuth('linkedin_oidc')}>
          <span className={styles.icon}>in</span> Continue with LinkedIn
        </button>
        <button className={styles.socialBtn} onClick={() => handleOAuth('google')}>
          <span className={styles.icon}>G</span> Continue with Google
        </button>
        <button className={styles.socialBtn} onClick={() => handleOAuth('apple')}>
          <span className={styles.icon}></span> Continue with Apple
        </button>
      </div>

      <div className={styles.divider}>
        <span>or use your email</span>
      </div>

      <form className={styles.form} onSubmit={handleLogin}>
        {authMode === "signup" && (
          <div className={styles.inputGroup}>
            <input 
              type="text" 
              id="fullName"
              className={styles.floatingInput}
              placeholder=" "
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <label htmlFor="fullName" className={styles.floatingLabel}>Full Name</label>
          </div>
        )}

        <div className={styles.inputGroup}>
          <input 
            type="email" 
            id="email"
            className={styles.floatingInput}
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email" className={styles.floatingLabel}>name@company.com</label>
        </div>

        <button className={styles.submitBtn} disabled={loading}>
          {loading ? "Authenticating..." : (authMode === "login" ? "Log In" : "Sign Up")}
        </button>
      </form>

      {message && (
        <p className={styles.message} style={{ color: isSuccess ? 'var(--success)' : 'var(--error)' }}>
          {isSuccess && "✅ "} {message}
        </p>
      )}

      <div className={styles.footer}>
        {authMode === "login" && (
          <div className={styles.footerLinks}>
            <a href="#">Forgot Password?</a>
          </div>
        )}
        <div className={styles.tos}>
          By continuing, you agree to Learnmora's <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </div>
      </div>

      <div className={styles.partnerLogos}>
        <div>HARVARD</div>
        <div>MIT</div>
        <div>GOOGLE</div>
        <div>STANFORD</div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <Suspense fallback={
        <div className={styles.card}>
          <div className={styles.shimmerBox}></div>
          <div className={styles.shimmerBox}></div>
          <div className={styles.shimmerBox}></div>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </div>
  );
}
