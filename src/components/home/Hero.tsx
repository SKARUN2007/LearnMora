import OmniSearch from "./OmniSearch";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.badge}>
          <span>NEW</span> 100% Free Professional Certificates for 2026
        </div>
        <h1 className={styles.title}>
          Master Your Career with <br /> <span>Global Authority</span>
        </h1>
        <p className={styles.subtitle}>
          The world's premier index for Ivy League degrees, professional certifications, and AI-driven career blueprints. 
          Stop searching. Start sovereign learning.
        </p>
        <OmniSearch />
        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>10,000+</strong>
            <span>Verified Courses</span>
          </div>
          <div className={styles.statLine}></div>
          <div className={styles.stat}>
            <strong>200+</strong>
            <span>Global Partners</span>
          </div>
          <div className={styles.statLine}></div>
          <div className={styles.stat}>
            <strong>1M+</strong>
            <span>Professional Blueprints</span>
          </div>
        </div>
      </div>
    </section>
  );
}
