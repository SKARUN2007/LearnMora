import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ALL_INSTITUTIONS, getInstitutionBySlug, getLogoUrl } from "@/lib/institutions";
import { GENERATED_COURSES, ExtendedCourse } from "@/lib/generatedCourses";
import { getCoursesByProvider } from "@/lib/courses";
import CourseCard from "@/components/courses/CourseCard";
import LoadMore from "@/components/ui/LoadMore";
import CrawlAgentSimulation from "@/components/courses/CrawlAgentSimulation";
import styles from "../universities.module.css";

interface PageProps {
  params: Promise<{ provider: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { provider } = await params;
  const inst = getInstitutionBySlug(provider);
  const displayName = inst?.name || decodeURIComponent(provider).replace(/-/g, " ");

  return {
    title: `${displayName} Online Courses & Certificates | Learnmora`,
    description: `Explore verified professional certificates and courses from ${displayName}. Compare ROI, pricing, and prestige on Learnmora.`,
  };
}

export async function generateStaticParams() {
  return ALL_INSTITUTIONS.map(inst => ({
    provider: inst.slug,
  }));
}

export default async function ProviderPage({ params }: PageProps) {
  const { provider } = await params;
  const inst = getInstitutionBySlug(provider);

  // Try to find courses from generated data or legacy data
  const generatedCourses = GENERATED_COURSES.filter(c =>
    c.provider.toLowerCase().includes(inst?.name.toLowerCase() || provider.replace(/-/g, " ")) ||
    c.provider.toLowerCase().includes(provider.replace(/-/g, " ")) ||
    c.university?.toLowerCase().includes(inst?.name.toLowerCase() || provider.replace(/-/g, " "))
  );
  const legacyCourses = await getCoursesByProvider(provider.replace(/-/g, " "));
  const allCourses = [...generatedCourses, ...legacyCourses];

  // Use institution data or derive from slug
  const displayName = inst?.name || decodeURIComponent(provider).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const initials = displayName.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
  const typeLabel = inst?.type === "university" ? "University" : inst?.type === "corporate" ? "Corporate Provider" : "Learning Platform";

  // SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": displayName,
    "url": inst ? `https://${inst.domain}` : undefined,
    "description": `Professional courses and certificates from ${displayName} indexed on Learnmora.`,
    "address": inst ? { "@type": "PostalAddress", "addressCountry": inst.country } : undefined,
  };

  return (
    <div className={styles.univPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.providerHero}>
            <div className={styles.providerLogoLarge}>
              {inst ? (
                <Image
                  src={getLogoUrl(inst.domain, inst.slug)}
                  alt={`${displayName} logo`}
                  width={80}
                  height={80}
                  style={{ objectFit: "contain", padding: "10px" }}
                  unoptimized
                />
              ) : (
                <div className={styles.providerLogoFallback}>{initials}</div>
              )}
            </div>
            <div>
              <span className={styles.badge}>VERIFIED INSTITUTION</span>
              <h1>{displayName}</h1>
              {inst && <p>{typeLabel} · {inst.country} · {inst.region}</p>}
            </div>
          </div>
          <div className={styles.providerMeta}>
            <div className={styles.providerStat}>
              <span>Indexed Courses</span>
              <strong>{allCourses.length}</strong>
            </div>
            {inst?.ranking && (
              <div className={styles.providerStat}>
                <span>QS Ranking</span>
                <strong>#{inst.ranking}</strong>
              </div>
            )}
            <div className={styles.providerStat}>
              <span>Type</span>
              <strong>{typeLabel}</strong>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {allCourses.length > 0 ? (
          <>
            <h2 className={styles.sectionTitle}>Available Programs</h2>
            <div className={styles.courseGrid}>
              <LoadMore initialCount={12} increment={12}>
                {allCourses.map(course => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </LoadMore>
            </div>
          </>
        ) : (
          <CrawlAgentSimulation subject={displayName} />
        )}
      </div>
    </div>
  );
}
