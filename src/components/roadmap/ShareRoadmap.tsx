"use client";

import { useState } from "react";
import styles from "./ShareRoadmap.module.css";

export default function ShareRoadmap() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://learnmora.com/verified-roadmap/arun-ai-architect')}`, '_blank');
    }, 1500);
  };

  return (
    <div className={styles.shareContainer}>
      <div className={styles.info}>
        <h3>Verified Roadmap</h3>
        <p>Share your professional progression to LinkedIn to attract elite recruiters.</p>
      </div>
      <button 
        className={styles.shareBtn} 
        onClick={handleShare}
        disabled={isGenerating}
      >
        {isGenerating ? "Verifying..." : "Share to LinkedIn"}
      </button>
      
      <div className={styles.previewNote}>
        ✓ Includes "Learnmora Verified" badge and 2026 Salary Projection.
      </div>
    </div>
  );
}
