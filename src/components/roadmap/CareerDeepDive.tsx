"use client";

import { useEffect } from "react";
import styles from "./CareerDeepDive.module.css";
import Link from "next/link";

interface CareerDeepDiveProps {
  career: string;
  onClose: () => void;
}

export default function CareerDeepDive({ career, onClose }: CareerDeepDiveProps) {
  // Lock body scroll when panel is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Generate deterministic mock data based on career name
  const isElite = career.includes("Security") || career.includes("AI") || career.includes("Data");
  const velocity = isElite ? "+28%" : "+14%";
  const demand = isElite ? "142,000" : "85,000";
  
  const skills = [
    "Systems Architecture",
    career.split(" ")[0] + " Fundamentals",
    "Agile Deployment",
    "Data Integrity",
    "Stakeholder Management"
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
          <span className={styles.velocityBadge}>Market Velocity: {velocity}</span>
          <h2 className={styles.title}>{career}</h2>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3>Global Demand 2026</h3>
            <div className={styles.demandStat}>{demand}</div>
            <div className={styles.demandDesc}>Open verified roles globally.</div>
          </div>

          <div className={styles.section}>
            <h3>Top 5 Required Skills</h3>
            <div className={styles.skillTags}>
              {skills.map(s => (
                <span key={s} className={styles.skillTag}>{s}</span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3>Verified Authored Pathways</h3>
            <div className={styles.courseList}>
              <div className={styles.courseCard}>
                <div className={styles.courseProvider}>MIT xPRO</div>
                <div className={styles.courseTitle}>Advanced {career} Masterclass</div>
                <Link href="/api/out?url=https://mit.edu/course" className={styles.courseBtn}>Enroll Free</Link>
              </div>
              <div className={styles.courseCard}>
                <div className={styles.courseProvider}>Google Cloud</div>
                <div className={styles.courseTitle}>Professional {career} Certification</div>
                <Link href="/api/out?url=https://google.com/course" className={styles.courseBtn}>Enroll Free</Link>
              </div>
              <div className={styles.courseCard}>
                <div className={styles.courseProvider}>Harvard University</div>
                <div className={styles.courseTitle}>{career} for Business Leaders</div>
                <Link href="/api/out?url=https://harvard.edu/course" className={styles.courseBtn}>Enroll Free</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
