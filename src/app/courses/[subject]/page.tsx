import { GENERATED_COURSES } from "@/lib/generatedCourses";
import CourseCard from "@/components/courses/CourseCard";
import LoadMore from "@/components/ui/LoadMore";
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

export default async function SubjectPage({ params }: PageProps) {
  const { subject } = await params;
  const readableName = subject.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  // Try to match against subCategory or niche
  const subjectCourses = GENERATED_COURSES.filter(c =>
    (c.subCategory && c.subCategory.toLowerCase().includes(readableName.toLowerCase())) ||
    (c.niche && c.niche.toLowerCase().includes(readableName.toLowerCase())) ||
    c.title.toLowerCase().includes(subject.toLowerCase()) ||
    c.provider.toLowerCase().includes(subject.toLowerCase())
  );

  // Check if there's a matching department for cross-linking
  const dept = getDepartmentBySlug(subject);

  return (
    <div className={styles.subjectPage}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>Best {readableName} Certificates</h1>
          <p>The 2026 definitive index of professional authority in {readableName}.</p>
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
          <div className={styles.empty}>
            <p>Our indexing engine is currently aggregating {readableName} data. Check back in 24 hours.</p>
          </div>
        )}
      </div>
    </div>
  );
}
