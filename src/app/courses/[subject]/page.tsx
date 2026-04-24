import { getCourses } from "@/lib/courses";
import CourseCard from "@/components/courses/CourseCard";
import styles from "./subject.module.css";
import { Metadata } from "next";

interface PageProps {
  params: { subject: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject } = await params;
  const name = subject.toUpperCase();
  return {
    title: `Best ${name} Certificates for 2026 | Learnmora`,
    description: `The top-tier indexed professional certificates for ${name} from Harvard, MIT, Google, and more.`,
  };
}

export default async function SubjectPage({ params }: PageProps) {
  const { subject } = await params;
  const allCourses = await getCourses();
  
  // Simple filter for the demo/build
  const subjectCourses = allCourses.filter(c => 
    c.title.toLowerCase().includes(subject.toLowerCase()) || 
    c.provider.toLowerCase().includes(subject.toLowerCase())
  );

  return (
    <div className={styles.subjectPage}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>Best {subject.toUpperCase()} Certificates</h1>
          <p>The 2026 definitive index of professional authority in {subject}.</p>
        </div>
      </header>
      
      <div className={styles.container}>
        <div className={styles.grid}>
          {subjectCourses.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
        
        {subjectCourses.length === 0 && (
          <div className={styles.empty}>
            <p>Our indexing engine is currently aggregating {subject} data. Check back in 24 hours.</p>
          </div>
        )}
      </div>
    </div>
  );
}
