import { getReportBySlug } from "@/lib/reports";
import { getCourseById } from "@/lib/courses";
import CourseCard from "@/components/courses/CourseCard";
import styles from "./report.module.css";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = await getReportBySlug(slug);
  return {
    title: report?.title ? `${report.title} - 2026 Analysis` : "Report Analysis | Learnmora",
    description: report?.excerpt || "Deep dive analysis of professional courses and certificates for 2026.",
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
                  <li>Executive Summary</li>
                  <li>LM VERIFIED Checklist</li>
                  <li>Career Impact</li>
                  <li>The List</li>
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
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({node, ...props}) => {
                    // Auto internalize
                    const href = props.href || "";
                    if(href.startsWith('/')) {
                      return <Link href={href} {...props} />
                    }
                    return <a target="_blank" rel="noopener noreferrer" {...props} />
                  }
                }}
              >
                {report.content.replace(/\b(AI|Cloud|Data Science|Engineering)\b/g, '[$1](/courses)')}
              </ReactMarkdown>
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
