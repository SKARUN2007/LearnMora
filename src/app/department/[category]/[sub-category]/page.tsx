import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDepartmentBySlug, TAXONOMY } from "@/lib/taxonomy";
import { GENERATED_COURSES } from "@/lib/generatedCourses";
import CourseCard from "@/components/courses/CourseCard";
import LoadMore from "@/components/ui/LoadMore";
import styles from "./department.module.css";
import Link from "next/link";

interface PageProps {
  params: Promise<{ category: string; "sub-category": string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "sub-category": subCategory } = await params;
  const dept = getDepartmentBySlug(subCategory);

  if (!dept) {
    return { title: "Department Not Found" };
  }

  return {
    title: `${dept.name} Professional Courses & Certificates | Learnmora`,
    description: dept.outlook.substring(0, 160) + "...",
  };
}

export default async function DepartmentPage({ params }: PageProps) {
  const { category, "sub-category": subCategorySlug } = await params;
  
  const pillar = TAXONOMY.find(p => p.slug === category);
  const dept = getDepartmentBySlug(subCategorySlug);

  if (!pillar || !dept) {
    notFound();
  }

  // Find all courses generated for this subcategory
  const courses = GENERATED_COURSES.filter(c => c.subCategory === dept.name);

  // SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${dept.name} Courses`,
    "description": dept.outlook,
    "provider": {
      "@type": "Organization",
      "name": "Learnmora Global Index"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": courses.slice(0, 10).map((course, idx) => ({
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
    }
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/subjects">Subjects</Link>
            <span> / </span>
            <Link href={`/department/${pillar.slug}`}>{pillar.name}</Link>
            <span> / </span>
            {dept.name}
          </div>
          <span className={styles.badge}>LEARNMORA ACADEMIC INDEX</span>
          <h1>{dept.name}</h1>
          <p className={styles.outlook}>{dept.outlook}</p>
        </div>
      </header>

      <div className={styles.container}>
        <h2>Verified Curriculum ({courses.length} Programs)</h2>
        {courses.length > 0 ? (
          <div className={styles.courseGrid}>
            <LoadMore initialCount={12} increment={12}>
              {courses.map(course => (
                <CourseCard key={course.id} {...course} />
              ))}
            </LoadMore>
          </div>
        ) : (
          <div className={styles.emptyState}>
            No courses indexed yet for {dept.name}. Check back soon.
          </div>
        )}
      </div>
    </div>
  );
}
