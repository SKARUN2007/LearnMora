import ResumeAnalyzer from "@/components/ai/ResumeAnalyzer";
import styles from "./roadmap.module.css";

export default function RoadmapPage() {
  return (
    <div className={styles.roadmapPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <h1>AI-Driven Career Blueprint</h1>
          <p>Skip the guesswork. Use our Gemini-powered engine to analyze your current standing and project your future salary growth.</p>
        </div>
      </header>

      <div className={styles.container}>
        <ResumeAnalyzer />

        <section className={styles.benefits}>
          <div className={styles.benefit}>
            <h3>Identify Skill Gaps</h3>
            <p>Our AI analyzes thousands of job descriptions to find exactly what certifications you're missing.</p>
          </div>
          <div className={styles.benefit}>
            <h3>Salary Projection</h3>
            <p>Estimate your market value after completing our top-tier professional credentials.</p>
          </div>
          <div className={styles.benefit}>
            <h3>Direct Course Matches</h3>
            <p>Get a clickable list of Harvard, MIT, and Google certificates that fill your gaps.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
