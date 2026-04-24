import { getCourses } from "@/lib/courses";
import CourseCard from "@/components/courses/CourseCard";
import styles from "./profile.module.css";

interface PageProps {
  params: { username: string };
}

export default async function UserProfile({ params }: PageProps) {
  const { username } = await params;
  const allCourses = await getCourses();
  
  // Simulated completed courses for the profile
  const completedCourses = allCourses.slice(0, 2);

  return (
    <div className={styles.profilePage}>
      <header className={styles.profileHeader}>
        <div className={styles.container}>
          <div className={styles.avatar}>
            {username.substring(0, 2).toUpperCase()}
          </div>
          <h1>{username}'s Professional Transcript</h1>
          <p className={styles.subtitle}>Verified Professional Authority on Learnmora</p>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <strong>2</strong>
              <span>Verified Certs</span>
            </div>
            <div className={styles.stat}>
              <strong>4.8/5</strong>
              <span>Skill Rating</span>
            </div>
            <div className={styles.stat}>
              <strong>12</strong>
              <span>Day Streak</span>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <section className={styles.section}>
          <h2>Verified Credentials</h2>
          <div className={styles.courseGrid}>
            {completedCourses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Earned Skill Badges</h2>
          <div className={styles.badgeGrid}>
            <div className={styles.badge}>
              <span className={styles.icon}>🎯</span>
              <span>AI Architect</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.icon}>⚡</span>
              <span>Fast Learner</span>
            </div>
          </div>
        </section>

        <div className={styles.cta}>
          <button className={styles.shareBtn}>Share to LinkedIn</button>
        </div>
      </div>
    </div>
  );
}
