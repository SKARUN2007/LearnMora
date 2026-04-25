import { TAGGED_COURSES } from "@/lib/dynamicTaxonomy";
import CourseCard from "@/components/courses/CourseCard";
import LoadMore from "@/components/ui/LoadMore";
import CrawlAgentSimulation from "@/components/courses/CrawlAgentSimulation";
import styles from "./subject.module.css";
import { Metadata } from "next";
import Link from "next/link";
import { getDepartmentBySlug } from "@/lib/taxonomy";

interface PageProps {
  params: Promise<{ subject: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject } = await params;
  const name = subject.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `Best ${name} Certificates for 2026 | Learnmora`,
    description: `The top-tier indexed professional certificates for ${name} from Harvard, MIT, Google, and more.`,
  };
}

function generateCareerBrief(subject: string) {
  return `In the rapidly evolving 2026 digital economy, expertise in ${subject} has emerged as a critical differentiator. As organizations pivot toward hyper-automation and decentralized infrastructure, professionals equipped with validated credentials in ${subject} are commanding significant salary premiums. This index aggregates the highest-ROI learning paths to ensure absolute career leverage.`;
}

export default async function SubjectPage({ params }: PageProps) {
  const { subject } = await params;
  const readableName = subject.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  // Match against dynamic taxonomy
  const subjectCourses = TAGGED_COURSES.filter(c =>
    c.tier1.toLowerCase().includes(readableName.toLowerCase()) ||
    c.tier2.toLowerCase().includes(readableName.toLowerCase()) ||
    c.tier3Tags.some(tag => tag.toLowerCase().includes(readableName.toLowerCase())) ||
    c.title.toLowerCase().includes(readableName.toLowerCase()) ||
    c.provider.toLowerCase().includes(readableName.toLowerCase())
  );

  // Check if there's a matching department for cross-linking
  const dept = getDepartmentBySlug(subject);

  return (
    <div className={styles.subjectPage}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>Best {readableName} Certificates</h1>
          <p>{generateCareerBrief(readableName)}</p>
          
          <div className={styles.seoMetaBlocks}>
            <div className={styles.metaBlock}>
              <h3>Top 3 Skills Acquired</h3>
              <ul>
                <li>Applied {readableName} Architecture</li>
                <li>{readableName} Lifecycle Management</li>
                <li>Strategic Implementation of {readableName}</li>
              </ul>
            </div>
            
            <div className={styles.metaBlock}>
              <h3>Suggested Roadmap</h3>
              <p>
                After completing these certifications, professionals typically advance to <strong>Enterprise {readableName} Leadership</strong> or specialize in <strong>Advanced {readableName} Systems</strong>.
              </p>
            </div>
          </div>

          {dept && (
            <Link href={`/department/${dept.pillarSlug}/${dept.slug}`} className={styles.deptLink}>
              View Full {dept.name} Department →
            </Link>
          )}
        </div>
      </header>
      
      <div className={styles.container}>
        {subjectCourses.length > 0 ? (
          <div className={styles.grid}>
            <LoadMore initialCount={12} increment={12}>
              {subjectCourses.map(course => (
                <CourseCard key={course.id} {...course} />
              ))}
            </LoadMore>
          </div>
        ) : (
          <CrawlAgentSimulation subject={readableName} />
        )}
      </div>
    </div>
  );
}
