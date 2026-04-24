import { REPORT_TITLES } from "@/lib/reports";
import Link from "next/link";
import styles from "./blog.module.css";

export default function BlogIndex() {
  return (
    <div className={styles.blogPage}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>High-Authority Certificate Reports</h1>
          <p>Deep-dive research into the world's most valuable free professional credentials for 2026.</p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.grid}>
          {REPORT_TITLES.map((title, idx) => {
            const slug = title.toLowerCase().replace(/ /g, "-").replace(/[:()]/g, "");
            return (
              <Link key={idx} href={`/blog/${slug}`} className={styles.card}>
                <div className={styles.category}>The 2026 Report</div>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.footer}>
                  <span>Read Report →</span>
                  <span className={styles.verify}>LM VERIFIED</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
