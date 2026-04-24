import { getReportBySlug } from "@/lib/reports";
import { getCourseById } from "@/lib/courses";
import CourseCard from "@/components/courses/CourseCard";
import styles from "./report.module.css";
import { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = await getReportBySlug(slug);
  return {
    title: report?.title || "Report | Learnmora",
    description: report?.excerpt,
  };
}

export default async function ReportPage({ params }: PageProps) {
  const { slug } = await params;
  const report = await getReportBySlug(slug);
  
  if (!report) return <div>Report not found</div>;

  const courses = await Promise.all(
    report.recommendedCourses.map(id => getCourseById(id))
  );

  return (
    <article className={styles.reportPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.meta}>
            <span>{report.category}</span> • <span>{report.date}</span>
          </div>
          <h1>{report.title}</h1>
          <div className={styles.author}>
            <div className={styles.authorImg}>LM</div>
            <div className={styles.authorName}>By {report.author}</div>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.grid}>
          <aside className={styles.sidebar}>
            <div className={styles.toc}>
              <h3>Table of Contents</h3>
              <nav>
                <ul>
                  <li>Introduction</li>
                  <li>The Methodology</li>
                  <li>Top Institutions</li>
                  <li>ROI Analysis</li>
                </ul>
              </nav>
            </div>
            
            <div className={styles.sidebarAd}>
              <div className={styles.adLabel}>SPONSORED</div>
              <div className={styles.adPlaceholderSidebar}>Sticky Sidebar Ad Slot</div>
            </div>
          </aside>

          <main className={styles.content}>
            <p className={styles.lead}>{report.excerpt}</p>
            <div className={styles.body}>
              <h2>Why these certificates matter in 2026</h2>
              <p>As the global job market shifts towards skills-based hiring, institutional authority remains the primary filter for elite recruiters. These free credentials allow you to bypass traditional gatekeepers while maintaining high-prestige status.</p>
              
              <h2>The Methodology</h2>
              <p>Learnmora analyzes real-world LinkedIn credential data and salary growth metrics to rank these programs. Our ROI badge (+% growth) is the primary driver for these selections.</p>
            </div>

            <section className={styles.recommended}>
              <h3>Verified Credentials for this Path</h3>
              <div className={styles.courseList}>
                {courses.map((c, idx) => c && <CourseCard key={idx} {...c} />)}
              </div>
            </section>
          </main>
        </div>
      </div>
    </article>
  );
}
