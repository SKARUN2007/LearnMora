"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "@/app/roadmap/roadmap.module.css";
import CareerDeepDive from "./CareerDeepDive";

export default function RoadmapClient({ levels, scanResult }: { levels: { title: string, subset: string[] }[], scanResult?: any }) {
  const [activeCareer, setActiveCareer] = useState<string | null>(null);

  const isDetected = (career: string) => {
    if (!scanResult) return false;
    return scanResult.skills.some((s: string) => career.toLowerCase().includes(s.toLowerCase()));
  };

  const isMissing = (career: string) => {
    if (!scanResult) return false;
    return scanResult.gaps.some((s: string) => career.toLowerCase().includes(s.toLowerCase()));
  };

  return (
    <div className={styles.timeline}>
      {levels.map((level, i) => (
        <div key={i} className={styles.timelineStep}>
          <div className={styles.stepDot}></div>
          <div className={styles.stepContent}>
            <h3>{level.title}</h3>
            <div className={styles.careerGrid}>
              {level.subset.map((career, idx) => (
                <div 
                  key={career}
                  className={`${styles.careerNode} ${isDetected(career) ? styles.detected : ""} ${isMissing(career) ? styles.gap : ""}`}
                  onClick={() => setActiveCareer(career)}
                >
                  <div className={styles.nodeHeader}>
                    <div className={styles.nodeTitle}>{career}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      {activeCareer && (
        <CareerDeepDive 
          career={activeCareer} 
          onClose={() => setActiveCareer(null)} 
        />
      )}
    </div>
  );
}
