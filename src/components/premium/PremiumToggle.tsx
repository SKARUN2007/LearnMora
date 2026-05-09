"use client";

import { useState } from "react";
import { Search, Shield, Check } from "lucide-react";
import styles from "./PremiumToggle.module.css";

export default function PremiumToggle() {
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className={styles.premiumBox}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.badge}>PRO TIER</span>
          <h3>Learnmora Premium</h3>
        </div>
        <button 
          className={`${styles.toggle} ${isPremium ? styles.active : ""}`}
          onClick={() => setIsPremium(!isPremium)}
        >
          <div className={styles.handle}></div>
        </button>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.icon}><Search size={20} /></span>
          <div>
            <strong>AI Resume Deep-Scan</strong>
            <p>Unlimited high-fidelity parsing & gap analysis.</p>
          </div>
        </div>
        <div className={styles.feature}>
          <span className={styles.icon}><Shield size={20} /></span>
          <div>
            <strong>Salary Shield</strong>
            <p>Real-time alerts on your market value shifts.</p>
          </div>
        </div>
      </div>

      {isPremium ? (
        <div className={styles.statusActive}><Check size={16} /> Premium Features Activated</div>
      ) : (
        <button className={styles.upgradeBtn}>Upgrade for $12/mo</button>
      )}
    </div>
  );
}
