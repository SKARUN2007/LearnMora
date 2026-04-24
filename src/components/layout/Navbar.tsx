"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user, signOut } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${styles.navbar} ${isOpen ? styles.navOpen : ""}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            LEARN<span>MORA</span>
          </Link>
          
          <button 
            className={styles.hamburger} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </button>

          <div className={`${styles.links} ${isOpen ? styles.linksVisible : ""}`}>
            <div className={styles.hasDropdown}>
              <span>Subjects</span>
              <div className={styles.dropdown}>
                <div className={styles.tier}>
                  <h4>Technology</h4>
                  <Link href="/courses/ai" onClick={() => setIsOpen(false)}>AI & ML</Link>
                  <Link href="/courses/llm" onClick={() => setIsOpen(false)}>LLM Engineering</Link>
                  <Link href="/courses/cloud" onClick={() => setIsOpen(false)}>Cloud Architecture</Link>
                </div>
                <div className={styles.tier}>
                  <h4>Business</h4>
                  <Link href="/courses/fintech" onClick={() => setIsOpen(false)}>FinTech</Link>
                  <Link href="/courses/management" onClick={() => setIsOpen(false)}>Management</Link>
                </div>
              </div>
            </div>
            <Link href="/universities" onClick={() => setIsOpen(false)}>Universities</Link>
            <Link href="/roadmap" onClick={() => setIsOpen(false)}>Career Roadmap</Link>
          </div>
        </div>
        <div className={styles.right}>
          {user ? (
            <>
              <button className={styles.loginBtn} onClick={signOut}>Sign Out</button>
              <Link href="/u/skarunamuthan" className={styles.ctaBtn}>Verified Profile</Link>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>Sign In</Link>
              <Link href="/login" className={styles.ctaBtn}>Get Access</Link>
            </>
          )}
        </div>
      </div>
      {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
}
