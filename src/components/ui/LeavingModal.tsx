"use client";

import { useEffect, useState } from "react";
import styles from "./LeavingModal.module.css";

interface LeavingModalProps {
  provider: string;
  courseTitle: string;
}

export default function LeavingModal({ provider, courseTitle }: LeavingModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.spinner}></div>
        <h2>Redirecting you to {provider}...</h2>
        <p>Opening the <strong>{courseTitle}</strong> enrollment page securely in a new window.</p>
        <div className={styles.shimmerBox}>
          Your progress on Learnmora has been automatically saved.
        </div>
      </div>
    </div>
  );
}
