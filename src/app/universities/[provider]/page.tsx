import { getCoursesByProvider, getProviders } from "@/lib/courses";
import CourseCard from "@/components/courses/CourseCard";
import styles from "../universities.module.css";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ provider: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { provider } = await params;
  const decodedProvider = decodeURIComponent(provider).replace(/-/g, " ");
  
  return {
    title: `${decodedProvider} Online Courses & Certificates | Learnmora`,
    description: `Explore verified professional certificates and courses from ${decodedProvider}. Compare ROI, pricing, and prestige.`,
  };
}

export async function generateStaticParams() {
  const providers = await getProviders();
  return providers.map(p => ({
    provider: encodeURIComponent(p.toLowerCase().replace(/\s+/g, '-'))
  }));
}

export default async function ProviderPage({ params }: PageProps) {
  const { provider } = await params;
  const decodedProvider = decodeURIComponent(provider).replace(/-/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
  
  const courses = await getCoursesByProvider(decodedProvider);

  if (courses.length === 0) return notFound();

  const initials = decodedProvider.split(" ").map((w: string) => w[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className={styles.univPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.providerLogo} style={{ margin: "0 auto 2rem" }}>{initials}</div>
          <span className={styles.badge}>VERIFIED INSTITUTION</span>
          <h1>{decodedProvider}</h1>
          <p>Official Professional Certifications and Course Roadmaps.</p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.grid}>
          {courses.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}
