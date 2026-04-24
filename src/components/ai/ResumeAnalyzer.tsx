"use client";

import { useState } from "react";
import styles from "./ResumeAnalyzer.module.css";

export default function ResumeAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate Gemini API processing
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult("Based on your resume, you have strong foundations in Backend Development but lack Cloud Architecture and LLM Engineering skills. We've generated a 6-month roadmap to bridge this gap.");
    }, 2500);
  };

  return (
    <div className={styles.analyzer}>
      {!result ? (
        <div className={styles.dropzone}>
          <div className={styles.icon}>📄</div>
          <h3>Scan Your Resume for Skill Gaps</h3>
          <p>Drag & drop your PDF or upload to see your estimated salary growth with Learnmora certifications.</p>
          <button 
            className={styles.uploadBtn} 
            disabled={isAnalyzing}
            onClick={handleAnalysis}
          >
            {isAnalyzing ? "Analyzing Skill Gaps..." : "Upload Resume (PDF)"}
          </button>
        </div>
      ) : (
        <div className={styles.result}>
          <h3>AI Analysis Complete</h3>
          <p>{result}</p>
          <button className={styles.roadmapBtn}>View Personalized Roadmap</button>
        </div>
      )}
    </div>
  );
}
