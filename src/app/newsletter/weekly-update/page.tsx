import { getCourses } from "@/lib/courses";
import CourseCard from "@/components/courses/CourseCard";
import styles from "./newsletter.module.css";

export default async function WeeklyUpdate() {
  const allCourses = await getCourses();
  const topCerts = allCourses.slice(0, 5); // Simulated 'Top 5' logic

  return (
    <div className={styles.newsletterPage}>
      <header className={styles.header}>
        <div className={styles.container}>
          <span className={styles.badge}>WEEKLY AUTHORITY UPDATE</span>
          <h1>Top 5 Free Certificates (April 24, 2026)</h1>
          <p>Hand-picked zero-cost credentials from Harvard, MIT, and Google to accelerate your professional authority this week.</p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.grid}>
          {topCerts.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        <div className={styles.cta}>
          <h3>Get these alerts in your inbox every Monday.</h3>
          <p>Join 85,000+ professionals building verified roadmaps.</p>
          <button className={styles.followBtn}>Follow Global Alerts</button>
        </div>
        
        <div className={styles.adSlot}>
          <div className={styles.adLabel}>NEWSLETTER FUNDED BY</div>
          <div className={styles.adPlaceholder}>Leaderboard Ad Slot</div>
        </div>
      </div>
    </div>
  );
}
