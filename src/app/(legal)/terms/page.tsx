import styles from "../legal.module.css";

export default function TermsPage() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1>Terms of Service</h1>
        <p className={styles.lead}>Last updated: April 2026</p>
        <section className={styles.section}>
          <h2>1. Platform Use</h2>
          <p>LearnMora Ai provides a global index for professional courses and AI-driven career roadmaps. Users are responsible for verifying the accreditation of third-party courses.</p>
        </section>
        <section className={styles.section}>
          <h2>2. User Privacy</h2>
          <p>Use of the platform is subject to our Privacy Policy. We do not store your uploaded resumes; they are processed temporarily for analysis.</p>
        </section>
        <section className={styles.section}>
          <h2>3. Affiliate Disclosure</h2>
          <p>LearnMora Ai may earn a commission from third-party course providers when you enroll through our links. This does not affect our rankings or recommendations.</p>
        </section>
      </div>
    </div>
  );
}
