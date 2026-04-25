"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user, signOut } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
            <Link 
              href="/courses" 
              onClick={() => setIsOpen(false)}
              className={pathname.startsWith("/courses") ? styles.activeLink : ""}
            >
              Courses
            </Link>
            <Link 
              href="/universities" 
              onClick={() => setIsOpen(false)}
              className={pathname.startsWith("/universities") ? styles.activeLink : ""}
            >
              Universities
            </Link>
            <Link 
              href="/roadmap" 
              onClick={() => setIsOpen(false)}
              className={pathname.startsWith("/roadmap") ? styles.activeLink : ""}
            >
              Career Roadmap
            </Link>
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
              <Link href="/login" className={styles.loginBtn}>Log In</Link>
              <Link href="/login" className={styles.ctaBtn}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
      {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
}
