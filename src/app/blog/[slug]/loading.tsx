import styles from "./report.module.css";

export default function Loading() {
  return (
    <article className={styles.reportPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={`${styles.meta} ${styles.shimmerBox}`} style={{ width: "150px", height: "20px", marginBottom: "1rem" }} />
          <div className={styles.shimmerBox} style={{ width: "80%", height: "60px", marginBottom: "2rem" }} />
          <div className={styles.author}>
            <div className={`${styles.authorImg} ${styles.shimmerBox}`} />
            <div className={styles.shimmerBox} style={{ width: "200px", height: "20px", marginLeft: "1rem" }} />
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.grid}>
          <aside className={styles.sidebar}>
            <div className={styles.shimmerBox} style={{ width: "100%", height: "200px" }} />
          </aside>
          
          <main className={styles.content}>
            <div className={styles.shimmerBox} style={{ width: "100%", height: "20px", marginBottom: "1rem" }} />
            <div className={styles.shimmerBox} style={{ width: "100%", height: "20px", marginBottom: "1rem" }} />
            <div className={styles.shimmerBox} style={{ width: "90%", height: "20px", marginBottom: "3rem" }} />
            
            <div className={styles.shimmerBox} style={{ width: "40%", height: "40px", marginBottom: "2rem" }} />
            <div className={styles.shimmerBox} style={{ width: "100%", height: "200px" }} />
          </main>
        </div>
      </div>
    </article>
  );
}
