import styles from "../legal.module.css";

export default function AboutPage() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1>About Learnmora</h1>
        <p className={styles.lead}>
          Learnmora is the premier 2026 global ecosystem for professional authority. We bridge the gap between high-prestige institutions and ambitious global learners.
        </p>
        
        <section className={styles.section}>
          <h2>Our Mission</h2>
          <p>
            To provide 100% transparent access to the world's most valuable credentials. We specialize in indexing "FREE Professional Certificates" that carry the same weight as premium degrees.
          </p>
        </section>

        <section className={styles.section}>
          <h2>The Omni-Platform</h2>
          <p>
            Operating as a high-authority aggregator, Learnmora indices over 10,000 professional paths from providers including Coursera, Udemy, edX, and the Ivy League.
          </p>
        </section>
      </div>
    </div>
  );
}
