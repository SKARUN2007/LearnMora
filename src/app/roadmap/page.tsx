"use client";

import { useState } from "react";
import ResumeAnalyzer from "@/components/ai/ResumeAnalyzer";
import { CAREERS } from "@/lib/courses";
import styles from "./roadmap.module.css";
import RoadmapClient from "@/components/roadmap/RoadmapClient";

export default function RoadmapPage() {
  const [scanResult, setScanResult] = useState<any>(null);
  
  const levels = [
    { title: "Core Fundamentals", subset: CAREERS.slice(0, 10) },
    { title: "Intermediate Authority", subset: CAREERS.slice(10, 30) },
    { title: "Advanced Architecture", subset: CAREERS.slice(30, 80) },
    { title: "Elite Command", subset: CAREERS.slice(80) }
  ];

  return (
    <div className={styles.roadmapPage}>
      {/* ... */}
      <div className={styles.container}>
        <ResumeAnalyzer onScanComplete={setScanResult} />

        {scanResult && (
          <div className={styles.salaryProjection}>
            <div className={styles.projectionValue}>
              <span>Projected Salary Growth:</span>
              <strong>{scanResult.marketValue} → $245,000+</strong>
            </div>
          </div>
        )}

        <section className={styles.timelineSection}>
          <div className={styles.timelineHeader}>
            <h2>The 2026 Skill Matrix</h2>
            <p>Explore the progression path for the highest-paying digital roles of the decade.</p>
          </div>
          
          <RoadmapClient levels={levels} scanResult={scanResult} />
        </section>
      </div>
    </div>
  );
}
