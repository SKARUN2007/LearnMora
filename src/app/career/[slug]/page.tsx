import { Metadata } from "next";
import { getCoursesByCareer } from "@/lib/courses";
import CourseCard from "@/components/courses/CourseCard";
import ReviewSystem from "@/components/courses/ReviewSystem";
import styles from "./career.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const careerName = slug.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  return {
    title: `${careerName} Master Roadmap | Learnmora`,
    description: `Complete learning path to become a ${careerName}. Explore verified certifications from Harvard, MIT, Google, and more.`,
  };
}

export default async function CareerPathPage({ params }: PageProps) {
  const { slug } = await params;
  const careerName = slug.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const relatedCourses = await getCoursesByCareer(careerName);

  // Schema.org Course List Injection
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": relatedCourses.map((course, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Course",
        "name": course.title,
        "description": course.description,
        "provider": {
          "@type": "Organization",
          "name": course.provider
        }
      }
    }))
  };

  return (
    <div className={styles.careerPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>Career Roadmap / {careerName}</div>
          <h1>How to become a <br /><span>{careerName}</span> in 2026</h1>
          <p className={styles.subtitle}>
            A curated professional path verified by market ROI and institutional authority.
          </p>
        </div>
      </header>

      <section className={styles.pathContent}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.main}>
              <h2>The Verified Roadmap</h2>
              {relatedCourses.length > 0 ? (
                <div className={styles.roadmapGrid}>
                  {relatedCourses.map((course, idx) => (
                    <div key={course.id} className={styles.roadmapItem}>
                      <div className={styles.stepNumber}>{idx + 1}</div>
                      <CourseCard {...course} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noCourses}>
                  <p>Our indexing engine is currently analyzing the best paths for this career. Check back soon for the 2026 update.</p>
                </div>
              )}

              <div className={styles.faqSection}>
                <h2>Frequently Asked Questions</h2>
                <div className={styles.faq}>
                  <h3>Is a degree required for {careerName}?</h3>
                  <p>While a degree provides a strong foundation, many professional certifications from organizations like Google and Microsoft are now globally recognized as valid credentials for {careerName} roles.</p>
                </div>
              </div>
              
              <div className={styles.reviewsSection} style={{ marginTop: '4rem' }}>
                <h2>Alumni Success & Verification</h2>
                <ReviewSystem courseId={slug} />
              </div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.salaryCard}>
                <h3>5-Year Salary Matrix</h3>
                <div className={styles.chartMock}>
                  <div className={styles.chartBar} style={{ height: '40%' }}><span>Yr 1</span></div>
                  <div className={styles.chartBar} style={{ height: '60%' }}><span>Yr 2</span></div>
                  <div className={styles.chartBar} style={{ height: '75%' }}><span>Yr 3</span></div>
                  <div className={styles.chartBar} style={{ height: '90%' }}><span>Yr 4</span></div>
                  <div className={styles.chartBar} style={{ height: '100%', background: 'var(--accent)' }}><span>Yr 5</span></div>
                </div>
                <div className={styles.statGroup}>
                  <div className={styles.stat}>
                    <span>Entry Trajectory</span>
                    <strong>$85k - $110k</strong>
                  </div>
                  <div className={styles.stat}>
                    <span>Senior Projection</span>
                    <strong style={{ color: 'var(--primary)' }}>$165k+</strong>
                  </div>
                </div>
              </div>
              
              <div className={styles.salaryCard} style={{ marginTop: '2rem' }}>
                <h3>Market ROI</h3>
                <div className={styles.stat}>
                  <span>Avg. Salary Growth</span>
                  <strong style={{ color: '#2ecc71' }}>+25.4%</strong>
                </div>
                <div className={styles.stat}>
                  <span>Demand Index</span>
                  <strong>94/100</strong>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
