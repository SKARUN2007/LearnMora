"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./AuthOverlay.module.css";

export default function AuthOverlay({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <div className={styles.iconWrapper}>🔒</div>
        <h2>Progress Saved Locally!</h2>
        <p>
          We've temporarily saved your track selection to this device. 
          To sync your Learnmora trajectory globally and receive career insights, 
          please create a free account.
        </p>
        <div className={styles.actions}>
          <Link href="/login" className={styles.primaryBtn} onClick={onClose}>
            Sign up to track progress
          </Link>
          <button className={styles.textBtn} onClick={onClose}>
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
