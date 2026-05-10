"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user, signOut } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Handle scroll state for "MNC" sticky effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <nav className={`${styles.navbar} ${isOpen ? styles.navOpen : ""} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <motion.div
              initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))",
              }}
              whileTap={{ scale: 0.95 }}
              className={styles.logoWrapper}
            >
              <Image 
                src="/logo.png" 
                alt="LearnMora Ai Logo" 
                width={180} 
                height={45} 
                style={{ mixBlendMode: 'darken', height: '45px', width: 'auto', display: 'block' }}
                unoptimized
              />
            </motion.div>
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
            <Link 
              href="/roi-calculator" 
              onClick={() => setIsOpen(false)}
              className={pathname.startsWith("/roi-calculator") ? styles.activeLink : ""}
            >
              ROI Engine
            </Link>

            {/* Mobile-only Auth Links */}
            <div className={styles.mobileAuth}>
              {user ? (
                <>
                  <button className={styles.loginBtn} onClick={signOut}>Sign Out</button>
                  <Link href="/u/skarunamuthan" className={styles.ctaBtn} onClick={() => setIsOpen(false)}>Verified Profile</Link>
                </>
              ) : (
                <>
                  <Link href="/login" className={styles.loginBtn} onClick={() => setIsOpen(false)}>Log In</Link>
                  <Link href="/login?mode=signup" className={styles.ctaBtn} onClick={() => setIsOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {user ? (
            <div className={styles.userSection}>
              <div className={styles.userDashboardMenu}>
                <span className={styles.trackBadge}>{user.user_metadata?.track || "Elite Command"}</span>
                <div className={styles.profileCircle} title={user.email}>
                  {user.email?.[0].toUpperCase()}
                </div>
              </div>
              <div className={styles.userDropdown}>
                <Link href="/dashboard" className={styles.dropdownItem}>Admin Dashboard</Link>
                <Link href="/u/skarunamuthan" className={styles.dropdownItem}>My Profile</Link>
                <Link href="/roadmap" className={styles.dropdownItem}>Career Roadmap</Link>
                <button className={styles.signOutBtn} onClick={signOut}>Sign Out</button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>Log In</Link>
              <Link href="/login?mode=signup" className={styles.ctaBtn}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
      {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
}
