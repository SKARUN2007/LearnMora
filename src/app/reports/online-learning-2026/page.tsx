import styles from "./GlobalReport.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Online Learning 2026: Trends, ROI & Market Leaders | Learnmora",
  description: "The 2026 definitive report on professional skilling. Analyze the impact of free certificates on global salary benchmarks.",
};

export default function GlobalReport() {
  return (
    <div className={styles.reportPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.premiumBadge}>2026 EXECUTIVE SUMMARY</span>
          <h1>Global Online Learning Authority Report</h1>
          <p>Analyzing the 100M+ data points across Harvard, Google, and MIT indexed certificates to redefine professional ROI.</p>
          <div className={styles.actions}>
            <button className={styles.shareBtn}>Share to LinkedIn Authority</button>
            <button className={styles.downloadBtn}>Download PDF (Verified)</button>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <section className={styles.grid}>
          <div className={styles.card}>
            <h3>AI Market Share</h3>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{ width: "78%" }}></div>
              <span>78% Demand Growth</span>
            </div>
          </div>
          <div className={styles.card}>
            <h3>Salary Impact</h3>
            <div className={styles.stat}>+$14,200</div>
            <p>Avg. increase for verified cert holders in 2026.</p>
          </div>
          <div className={styles.card}>
            <h3>Top Institutions</h3>
            <ol className={styles.list}>
              <li>Google Cloud</li>
              <li>Harvard University</li>
              <li>MIT Sloan</li>
            </ol>
          </div>
        </section>

        <section className={styles.deepDive}>
          <h2>The 2026 Credential Landscape</h2>
          <p>As traditional degrees face increasing ROI scrutiny, verified professional certificates have emerged as the primary 'Proof of Work' in technical and leadership domains. Learnmora data indicates a significant shift towards modular, stackable credentials that align directly with 2026's hyper-niche career paths.</p>
        </section>

        <div className={styles.adSlot}>
          <div className={styles.adLabel}>SPONSORED BY LEADERSHIP PARTNERS</div>
          <div className={styles.adPlaceholder}>Interactive Leaderboard Ad</div>
        </div>
      </div>
    </div>
  );
}
