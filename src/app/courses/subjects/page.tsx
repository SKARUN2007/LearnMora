import { TAXONOMY } from "@/lib/taxonomy";
import { GENERATED_COURSES } from "@/lib/generatedCourses";
import Link from "next/link";
import styles from "./subjects.module.css";
import { Metadata } from "next";
import SubjectSearch from "@/components/search/SubjectSearch";

export const metadata: Metadata = {
  title: "Professional Course Subjects | Learnmora",
  description: "Explore the global taxonomy of professional courses across 100+ high-demand departments.",
};

export default function SubjectsPage() {
  return (
    <div className={styles.subjectsPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>LEARNMORA GLOBAL TAXONOMY</span>
          <h1>Professional Subjects &amp; Departments</h1>
          <p>Navigate our 100+ verified sub-categories spanning the 6 core industry pillars.</p>
          <div style={{ marginTop: '3rem' }}>
            <SubjectSearch />
          </div>
        </div>
      </header>
      
      <div className={styles.container}>
        <div className={styles.megaGridWrapper}>
          {TAXONOMY.map(pillar => {
            const pillarCourseCount = GENERATED_COURSES.filter(c =>
              pillar.subCategories.some(s => s.name === c.subCategory)
            ).length;

            return (
              <section key={pillar.slug} className={styles.pillarBlock}>
                <Link href={`/department/${pillar.slug}`} className={styles.pillarHeader}>
                  <div>
                    <h2>{pillar.name}</h2>
                    <p>{pillar.description}</p>
                  </div>
                  <span className={styles.pillarCount}>{pillarCourseCount} Courses</span>
                </Link>
                <div className={styles.departmentGrid}>
                  {pillar.subCategories.map(sub => {
                    const subCount = GENERATED_COURSES.filter(c => c.subCategory === sub.name).length;
                    return (
                      <Link 
                        key={sub.slug} 
                        href={`/department/${pillar.slug}/${sub.slug}`}
                        className={styles.deptCard}
                      >
                        <h3>{sub.name}</h3>
                        <div className={styles.deptMeta}>
                          <span className={styles.deptCount}>{subCount} programs</span>
                          <span className={styles.deptArrow}>→</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
