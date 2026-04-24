import ResumeAnalyzer from "@/components/ai/ResumeAnalyzer";
import { CAREERS } from "@/lib/courses";
import Link from "next/link";
import styles from "./roadmap.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Career Roadmap Generator | Learnmora",
  description: "AI-driven professional development blueprints. Analyze your resume and discover your 2026 certification path.",
};

export default function RoadmapPage() {
  const levels = [
    { title: "Core Fundamentals", subset: CAREERS.slice(0, 10) },
    { title: "Intermediate Authority", subset: CAREERS.slice(10, 30) },
    { title: "Advanced Architecture", subset: CAREERS.slice(30, 80) },
    { title: "Elite Command", subset: CAREERS.slice(80) }
  ];

  return (
    <div className={styles.roadmapPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>PERSONALIZED PROGRESSION</span>
          <h1>AI-Driven Career Blueprint</h1>
          <p>Skip the guesswork. Use our Gemini-powered engine to analyze your current standing and project your future salary growth.</p>
        </div>
      </header>

      <div className={styles.container}>
        <ResumeAnalyzer />

        <section className={styles.timelineSection}>
          <div className={styles.timelineHeader}>
            <h2>The 2026 Skill Matrix</h2>
            <p>Explore the progression path for the highest-paying digital roles of the decade.</p>
          </div>
          
          <div className={styles.timeline}>
            {levels.map((level, i) => (
              <div key={i} className={styles.timelineStep}>
                <div className={styles.stepDot}></div>
                <div className={styles.stepContent}>
                  <h3>{level.title}</h3>
                  <div className={styles.careerGrid}>
                    {level.subset.map(career => (
                      <Link 
                        href={`/career/${career.toLowerCase().replace(/\s+/g, '-')}`} 
                        key={career}
                        className={styles.careerPill}
                      >
                        {career}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
