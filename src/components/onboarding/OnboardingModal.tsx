"use client";

import { useState } from "react";
import styles from "./OnboardingModal.module.css";
import { useUser } from "@/context/UserContext";

const TOP_SUBJECTS = [
  "Artificial Intelligence",
  "Cloud Computing",
  "Financial Markets",
  "Data Science",
  "Cybersecurity",
  "Digital Marketing",
  "Software Engineering",
  "Machine Learning",
  "Blockchain & Web3",
  "Project Management",
  "UX/UI Design",
  "Business Strategy"
];

export default function OnboardingModal({ onComplete }: { onComplete: () => void }) {
  const { user } = useUser();
  const [selected, setSelected] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const toggleSubject = (subject: string) => {
    setSelected(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleComplete = async () => {
    if (selected.length < 3) return;
    
    setIsSaving(true);
    // In a full implementation, you would save this to Supabase `profiles` table
    // For now, save to local storage to prevent it from showing again
    localStorage.setItem(`onboarding_complete_${user?.id || 'guest'}`, 'true');
    localStorage.setItem(`user_subjects_${user?.id || 'guest'}`, JSON.stringify(selected));
    
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Discovery Quiz</h2>
          <p>What do you want to learn? Select at least 3 career tracks to build your curriculum.</p>
        </div>

        <div className={styles.grid}>
          {TOP_SUBJECTS.map(subject => (
            <div 
              key={subject}
              className={`${styles.subjectCard} ${selected.includes(subject) ? styles.selected : ""}`}
              onClick={() => toggleSubject(subject)}
            >
              {subject}
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.counter}>
            {selected.length}/3 Selected
          </span>
          <button 
            className={styles.continueBtn}
            disabled={selected.length < 3 || isSaving}
            onClick={handleComplete}
          >
            {isSaving ? "Saving..." : "Start Learning"}
          </button>
        </div>
      </div>
    </div>
  );
}
