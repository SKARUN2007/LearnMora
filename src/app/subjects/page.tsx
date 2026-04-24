import { getSubjectCounts } from "@/lib/courses";
import Link from "next/link";
import styles from "./subjects.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Course Subjects | Learnmora",
  description: "Explore thousands of professional courses and verified certificates across Technology, Business, Healthcare, and more.",
};

export default async function SubjectsPage() {
  const subjects = await getSubjectCounts();

  return (
    <div className={styles.subjectsPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>LEARNMORA ACADEMIC INDEX</span>
          <h1>Professional Subjects</h1>
          <p>Explore high-authority credentials segmented by industry demand.</p>
        </div>
      </header>
      
      <div className={styles.container}>
        <div className={styles.grid}>
          {subjects.map(sub => (
            <Link key={sub.name} href={`/courses/${sub.name.toLowerCase().replace(/\s+/g, '-')}`} className={styles.card}>
              <div className={styles.cardInfo}>
                <h2>{sub.name}</h2>
                <div className={styles.count}>{sub.count} Verified Courses</div>
              </div>
              <div className={styles.arrow}>→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
