import styles from "../legal.module.css";

export default function PrivacyPage() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1>Privacy Policy</h1>
        <p className={styles.lead}>Last updated: April 2026</p>
        <section className={styles.section}>
          <h2>AI & Data Processing Disclosure</h2>
          <p>Learnmora uses AI models (including Gemini API) to analyze resumes. No personal data is stored indefinitely; analysis is performed on-the-fly to generate your career roadmap.</p>
        </section>
        <section className={styles.section}>
          <h2>Cookie Disclosure</h2>
          <p>We use essential cookies to maintain your UserLibrary and track course progress across sessions.</p>
        </section>
      </div>
    </div>
  );
}
