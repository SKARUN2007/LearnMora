"use client";

import { useState, useRef } from "react";
import styles from "./ResumeAnalyzer.module.css";
import Link from "next/link";
import { Settings, FileText, Lock, Check, X } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface Props {
  onScanComplete?: (result: any) => void;
}

export default function ResumeAnalyzer({ onScanComplete }: Props) {
  const { user } = useUser();
  const [isDragActive, setIsDragActive] = useState(false);
  const [loadingStage, setLoadingStage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [result, setResult] = useState<{
    summary: string;
    salaryUplift: string;
    have: string[];
    need: string[];
    certs: { title: string, provider: string, link: string }[];
  } | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    else if (e.type === "dragleave") setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setLoadingStage("Extracting Core Fundamentals...");
    
    try {
      // Simulate reading PDF text
      await new Promise(res => setTimeout(res, 1000));
      setLoadingStage("Analyzing Seniority & Titles...");
      
      const response = await fetch("/api/resume/analyze", {
        method: "POST",
        body: JSON.stringify({ text: "Simulated Resume Text for " + file.name }),
        headers: { "Content-Type": "application/json" }
      });
      
      const data = await response.json();
      
      setLoadingStage("Mapping 2026 Skill Gaps...");
      await new Promise(res => setTimeout(res, 800));

      const finalResult = {
        summary: `As a ${data.seniority} ${data.currentRole}, your profile shows strong ${data.skills[0]} foundation.`,
        salaryUplift: "+$45,000/yr",
        have: data.skills.slice(0, 5),
        need: data.gaps,
        certs: [
          { title: "Generative AI for Leaders", provider: "Google", link: "/courses" },
          { title: "Advanced System Architecture", provider: "MIT", link: "/courses" }
        ]
      };

      setResult(finalResult);
      if (onScanComplete) onScanComplete(data);
      setLoadingStage(null);
    } catch (error) {
      console.error("Scan failed", error);
      setLoadingStage(null);
    }
  };

  const scrollToRoadmap = () => {
    document.querySelector('#matrix')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.analyzer}>
      {!result ? (
        <div 
          className={`${styles.dropzone} ${isDragActive ? styles.dragActive : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleChange} 
            accept=".pdf,.doc,.docx" 
            style={{ display: "none" }} 
          />
          
          <div className={styles.icon}>
            {loadingStage ? <Settings size={40} className={styles.spin} /> : <FileText size={40} />}
          </div>
          <h3>{loadingStage ? "Analyzing Profile..." : "Scan Your Resume for Skill Gaps"}</h3>
          
          {loadingStage ? (
            <div className={styles.loadingContainer}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill}></div>
              </div>
              <p className={styles.loadingStage}>{loadingStage}</p>
            </div>
          ) : (
            <>
              <p>Drag & drop your PDF or upload to see your estimated salary growth with Learnmora certifications.</p>
              <button className={styles.uploadBtn}>Upload Resume (PDF)</button>
              
              <div className={styles.secureBadge}>
                <span className={styles.lockIcon}><Lock size={12} /></span> Safe & Encrypted via Supabase
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.result}>
          <h3>AI Analysis Complete</h3>
          <p className={styles.summaryText}>{result.summary}</p>
          
          <div className={styles.salaryBox}>
            <span className={styles.salaryLabel}>Projected Salary Uplift Estimate:</span>
            <span className={styles.salaryValue}>{result.salaryUplift}</span>
          </div>

          <div className={styles.matrixContainer}>
            <div className={styles.matrixColumn}>
              <h4>Current Profile</h4>
              <ul className={styles.haveList}>
                {result.have.map(item => <li key={item}><Check size={14} style={{ color: 'var(--success)', marginRight: '4px' }} /> {item}</li>)}
              </ul>
            </div>
            <div className={styles.matrixColumn}>
              <h4>Target Architecture</h4>
              <ul className={styles.needList}>
                {result.need.map(item => <li key={item}><X size={14} style={{ color: 'var(--error)', marginRight: '4px' }} /> {item}</li>)}
              </ul>
            </div>
          </div>

          <div className={styles.certList}>
            <h4>Top 3 Recommended Certifications to bridge the gap:</h4>
            {result.certs.map(cert => (
              <div key={cert.title} className={styles.certCard}>
                <div className={styles.certInfo}>
                  <strong>{cert.title}</strong>
                  <span>{cert.provider}</span>
                </div>
                <Link href={cert.link} className={styles.enrollBtn}>Enroll Free</Link>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={styles.roadmapBtn} onClick={scrollToRoadmap}>View My Custom Roadmap</button>
            <button className={styles.scanAgainBtn} onClick={() => setResult(null)}>Scan Another</button>
          </div>
          
          {user && (
            <div className={styles.saveNotice}>
              <Check size={14} /> Profile data synced to your Professional Access account.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
