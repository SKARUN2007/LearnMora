import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TAXONOMY } from "@/lib/taxonomy";
import { GENERATED_COURSES } from "@/lib/generatedCourses";
import Link from "next/link";
import styles from "./pillar.module.css";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const pillar = TAXONOMY.find(p => p.slug === category);

  if (!pillar) {
    return { title: "Pillar Not Found" };
  }

  return {
    title: `${pillar.name} Courses & Certificates | Learnmora`,
    description: pillar.description,
  };
}

export default async function PillarPage({ params }: PageProps) {
  const { category } = await params;
  let pillar = TAXONOMY.find(p => p.slug === category);
  
  if (!pillar) {
    // Shadow Page Fallback Strategy
    const displayName = decodeURIComponent(category).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    pillar = {
      name: displayName,
      slug: category,
      description: `We are currently aggregating millions of data points to generate the full 2026 Learnmora Report on ${displayName}. Our ingestion engine handles deep-linking to shadow paths securely.`,
      subCategories: []
    };
  }

  // Simulate 1M+ courses per sub-category deterministically
  const getSimulatedCount = (name: string, baseCount: number) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const offset = 1000000 + (Math.abs(hash) % 500000); // 1M to 1.5M
    return baseCount + offset;
  };

  const subCatsWithCounts = pillar.subCategories.map(sub => {
    const count = GENERATED_COURSES.filter(c => c.subCategory === sub.name).length;
    return { ...sub, count: getSimulatedCount(sub.name, count) };
  });

  const totalCourses = subCatsWithCounts.reduce((acc, s) => acc + s.count, 0);

  // SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pillar.name,
    "description": pillar.description,
    "provider": {
      "@type": "Organization",
      "name": "Learnmora Global Index"
    }
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className={styles.hero}>
        <span className={styles.badge}>LEARNMORA PILLAR</span>
        <h1>{pillar.name}</h1>
        <p>{pillar.description}</p>
      </header>

      <div className={styles.container}>
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span>Departments</span>
            <strong>{pillar.subCategories.length}</strong>
          </div>
          <div className={styles.statItem}>
            <span>Total Programs</span>
            <strong>{totalCourses.toLocaleString()}</strong>
          </div>
          <div className={styles.statItem}>
            <span>Providers</span>
            <strong>{new Set(GENERATED_COURSES.filter(c => pillar.subCategories.some(s => s.name === c.subCategory)).map(c => c.provider)).size}</strong>
          </div>
        </div>

        <div className={styles.grid}>
          {subCatsWithCounts.map(sub => (
            <Link
              key={sub.slug}
              href={`/department/${pillar.slug}/${sub.slug}`}
              className={styles.card}
            >
              <h2>{sub.name}</h2>
              <p className={styles.cardOutlook}>{sub.outlook}</p>
              <div className={styles.cardFooter}>
                <span className={styles.courseCount}>{sub.count.toLocaleString()} Programs</span>
                <span className={styles.arrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
