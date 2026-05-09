"use client";
import { useState, useEffect } from "react";
import CourseCard from "@/components/courses/CourseCard";
import { Course } from "@/lib/courses";
import styles from "./CrawlAgentSimulation.module.css";
import { Loader2, Check } from "lucide-react";

export default function CrawlAgentSimulation({ subject }: { subject: string }) {
  const [status, setStatus] = useState("initiating");
  const [mockCourses, setMockCourses] = useState<Course[]>([]);

  useEffect(() => {
    const sequence = async () => {
      setStatus("crawling");
      await new Promise(r => setTimeout(r, 2000));
      setStatus("indexing");
      await new Promise(r => setTimeout(r, 1500));
      
      setMockCourses([
        {
          id: `mock-1-${Date.now()}`,
          title: `Foundations of ${subject}`,
          provider: "HarvardX",
          rating: 4.8,
          duration: "4 Weeks",
          certificate: true,
          language: "English",
          price: "FREE",
          roi: "150%",
          isFree: true,
          category: "Emerging Tech",
          careerPath: [`${subject} Specialist`],
          description: `Comprehensive introduction to ${subject}.`
        },
        {
          id: `mock-2-${Date.now()}`,
          title: `Advanced ${subject} Applications`,
          provider: "MITx",
          rating: 4.9,
          duration: "6 Weeks",
          certificate: true,
          language: "English",
          price: "FREE",
          roi: "185%",
          isFree: true,
          category: "Emerging Tech",
          careerPath: [`${subject} Architect`],
          description: `Deep dive into the architecture of ${subject}.`
        },
        {
          id: `mock-3-${Date.now()}`,
          title: `${subject} for Enterprise Leadership`,
          provider: "Google",
          rating: 4.7,
          duration: "3 Weeks",
          certificate: true,
          language: "English",
          price: "FREE",
          roi: "130%",
          isFree: true,
          category: "Emerging Tech",
          careerPath: [`${subject} Manager`],
          description: `Strategic management of ${subject} teams.`
        }
      ]);
      setStatus("complete");
    };
    
    sequence();
  }, [subject]);

  if (status === "complete") {
    return (
      <div className={styles.container}>
        <div className={styles.successBanner}>
          <Check size={18} style={{ marginRight: '8px' }} /> Learnmora Agent successfully indexed 3 new free certifications for {subject}.
        </div>
        <div className={styles.grid}>
          {mockCourses.map(c => <CourseCard key={c.id} {...c} />)}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.crawlingState}>
      <Loader2 className={styles.spinner} size={32} />
      <h3>Activating Crawl Agent</h3>
      <p>
        {status === "initiating" && "Waking up agent..."}
        {status === "crawling" && `Searching 1,700+ institutions for "${subject}"...`}
        {status === "indexing" && "Analyzing ROI and indexing syllabi..."}
      </p>
    </div>
  );
}
