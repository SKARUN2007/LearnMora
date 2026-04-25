import Hero from "@/components/home/Hero";
import CourseCard from "@/components/courses/CourseCard";
import { GENERATED_COURSES } from "@/lib/generatedCourses";
import { TAXONOMY } from "@/lib/taxonomy";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  // Pick top-rated courses across different pillars for the trending section
  const trendingCourses = [...GENERATED_COURSES]
    .sort((a, b) => b.rating - a.rating)
    .filter((c, i, arr) => arr.findIndex(x => x.subCategory === c.subCategory) === i) // unique subcategories
    .slice(0, 8);

  return (
    <div className={styles.home}>
      <Hero />
      
      <section className={styles.localTrends}>
        <div className={styles.container}>
          <div className={styles.localFlex}>
            <div className={styles.locationTag}>
              <span className={styles.dot}></span>
              Trending Skills in <strong>Bangalore, India</strong>
            </div>
            <div className={styles.skillBubbles}>
              <span>LLM Engineering</span>
              <span>Cloud Security</span>
              <span>FinTech Analytics</span>
              <span>Project Management</span>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Pillar - NEW */}
      <section className={styles.pillarsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Browse by Industry</h2>
            <p className={styles.sectionSubtitle}>Explore 1,050+ programs across 6 professional pillars.</p>
          </div>
          <div className={styles.pillarGrid}>
            {TAXONOMY.map(pillar => {
              const count = GENERATED_COURSES.filter(c =>
                pillar.subCategories.some(s => s.name === c.subCategory)
              ).length;
              return (
                <Link key={pillar.slug} href={`/department/${pillar.slug}`} className={styles.pillarCard}>
                  <h3>{pillar.name}</h3>
                  <span className={styles.pillarStat}>{count} programs</span>
                  <p>{pillar.description}</p>
                  <span className={styles.pillarArrow}>Explore →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.trending}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Top-Rated Across All Pillars</h2>
            <p className={styles.sectionSubtitle}>The highest-reviewed credentials from across our global taxonomy.</p>
          </div>
          
          <div className={styles.courseGrid}>
            {trendingCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
