import styles from "./report.module.css";

export default function AnnualReport() {
  return (
    <div className={styles.reportPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.label}>2026 INTELLIGENCE DATA</span>
          <h1>Annual Professional Skills & ROI Report</h1>
          <p>The definitive 2026 data analysis of the global professional skilling market, free certificate growth, and institutional salary impact.</p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.statCard}>
            <strong>+240%</strong>
            <span>Growth in Free AI Certificates</span>
          </div>
          <div className={styles.statCard}>
            <strong>$12,400</strong>
            <span>Avg. Salary Bump from Google Certs</span>
          </div>
          <div className={styles.statCard}>
            <strong>42%</strong>
            <span>HR Teams Prefer Verified Credentials</span>
          </div>
        </div>

        <section className={styles.topCourses}>
          <h2>Most Popular Courses (2026)</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Provider</th>
                <th>ROI</th>
                <th>Enrollments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GenAI for Business Leaders</td>
                <td>Harvard</td>
                <td>+35%</td>
                <td>1.2M</td>
              </tr>
              <tr>
                <td>Cloud Security Professional</td>
                <td>Google Cloud</td>
                <td>+42%</td>
                <td>850k</td>
              </tr>
            </tbody>
          </table>
        </section>

        <div className={styles.adSlot}>
            <div className={styles.adLabel}>REPORT FUNDED BY</div>
            <div className={styles.adPlaceholder}>Leaderboard Ad Slot</div>
        </div>
      </div>
    </div>
  );
}
