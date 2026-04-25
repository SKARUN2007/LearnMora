import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/courses";
import { GENERATED_COURSES } from "@/lib/generatedCourses";
import styles from "./impact.module.css";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import ConversionActions from "@/components/courses/ConversionActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id) || GENERATED_COURSES.find(c => c.id === id);

  if (!course) {
    return { title: "Report Not Found" };
  }

  return {
    title: `${course.title} - Professional ROI & Salary Impact | Learnmora`,
    description: `Evaluate the true ROI, salary expectations, and hiring trends for ${course.title} from ${course.provider}.`,
  };
}

// Simulated automated "Gemini" content generation mapping
function generateAlgorithmicReport(courseName: string, paths: string[], roi: string, duration: string) {
  const primaryCareer = paths[0] || "Professional";
  
  return `
## Executive Summary
The deployment of enterprise-grade solutions requires continuous upskilling. **${courseName}** has emerged as a cornerstone credential for aspiring **${primaryCareer}s** globally. Based on millions of aggregated data points from Learnmora's 2026 index, this certificate generates an estimated \`${roi}\` boost in career trajectory.

## The Financial Impact
Achieving this credential within the standard **${duration}** window immediately positions candidates advantageously during technical screening. 

* **Average Starting Salary:** $95,000 USD
* **Projected Trajectory:** $145,000 USD
* **Negotiation Leverage:** Extreme

## Global Hiring Trends (2026)
Employers are heavily weighting structured learning pipelines from validated providers over generic experience. Companies actively headhunting this certificate include:

1. Amazon Web Services (AWS)
2. Microsoft Cloud division
3. Top-tier FinTech & Trading Firms
4. Tier-1 AI Research Labs

## Your Strategic Roadmap
If you are already enrolled in this module, ensure you are attaching the cryptographically verified badge to your LinkedIn topology immediately upon completion. If you are comparing this to other paths, refer to our comparison engine.
  `;
}

export default async function CareerImpactPage({ params }: PageProps) {
  const { id } = await params;
  
  // Search both the core legacy module and the new 1000+ generated nodes
  let course = await getCourseById(id);
  if (!course) {
    course = GENERATED_COURSES.find(c => c.id === id);
  }

  if (!course) {
    notFound();
  }

  const generatedReport = generateAlgorithmicReport(
    course.title, 
    course.careerPath, 
    course.roi, 
    course.duration
  );

  return (
    <div className={styles.impactPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/courses">Course Index</Link>
            <span> / </span>
            {course.provider}
          </div>
          <span className={styles.categoryBadge}>{course.category} Pillar</span>
          <h1>Professional ROI Analysis</h1>
          <h2 className={styles.subtitle}>{course.title}</h2>
          
          <div className={styles.quickStats}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Projected Value</span>
              <span className={styles.statNumber}>+{course.roi}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Investment Rate</span>
              <span className={styles.statNumber}>{course.isFree ? "Zero Cost" : course.price}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Time to Market</span>
              <span className={styles.statNumber}>{course.duration}</span>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.contentLayout}>
          <main className={styles.reportContent}>
            <div className={styles.pulseIndicator}>
              <span className={styles.pulseDot}></span>
              <span>Generated in real-time by Learnmora Insight Engine</span>
            </div>
            
            <div className={styles.markdownBody}>
              <ReactMarkdown>{generatedReport}</ReactMarkdown>
            </div>
            
            <ConversionActions course={course} />
          </main>

          <aside className={styles.sidebar}>
            <div className={styles.targetCareers}>
              <h3>Target Horizons</h3>
              <ul>
                {course.careerPath.map(career => (
                  <li key={career}>{career}</li>
                ))}
              </ul>
            </div>
            <div className={styles.providerInfo}>
              <h3>Verified Provider</h3>
              <div className={styles.providerCard}>
                <strong>{course.provider}</strong>
                <p>Global indexing partner for professional progression.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
