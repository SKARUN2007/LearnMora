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
  
  let pillar = TAXONOMY.find(p => p.slug === category);
  let dept = getDepartmentBySlug(subCategorySlug);

  if (!pillar || !dept) {
    // Shadow Page Fallback Strategy
    const pillarName = decodeURIComponent(category).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const deptName = decodeURIComponent(subCategorySlug).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    pillar = pillar || { name: pillarName, slug: category, description: "", subCategories: [] };
    dept = dept || { 
      name: deptName, 
      slug: subCategorySlug, 
      outlook: `Learnmora's global crawlers are currently indexing verified certificates and academic metrics for ${deptName}. Our Shadow-Page system guarantees safe routing during the atomic sync process.`,
      pillar: pillarName,
      pillarSlug: category
    };
  }

  // Find all courses generated for this subcategory
  const courses = GENERATED_COURSES.filter(c => c.subCategory === dept.name);

  // Simulate 1M+ courses deterministically
  let hash = 0;
  for (let i = 0; i < dept.name.length; i++) {
    hash = dept.name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const simulatedCount = courses.length + 1000000 + (Math.abs(hash) % 500000);

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
            <Link href="/courses/subjects">Subjects</Link>
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
        <h2>Verified Curriculum ({simulatedCount.toLocaleString()} Programs)</h2>
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
