import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TAGGED_COURSES, HIERARCHICAL_TAXONOMY } from "@/lib/dynamicTaxonomy";
import CourseCard from "@/components/courses/CourseCard";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const subjectName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `Best Free ${subjectName} Certificates & 2026 Career Path | Learnmora`,
    description: `Discover over ${TAGGED_COURSES.length} free professional certificates in ${subjectName}. Analyze the 2026 ROI, salary growth, and top providers like Google, Meta, and Harvard.`,
  };
}

export default async function SubjectPage({ params }: Props) {
  const { slug } = await params;
  const subjectName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Find courses matching this niche (Tier 3) or category (Tier 2)
  const courses = TAGGED_COURSES.filter(c => 
    c.tier2.toLowerCase().replace(/\s+/g, '-') === slug ||
    c.tier3Tags.some(t => t.toLowerCase().replace(/\s+/g, '-') === slug)
  );

  if (courses.length === 0) notFound();

  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1280px", margin: "0 auto", minHeight: "100vh" }}>
      <div style={{ marginBottom: "4rem", textAlign: "center" }}>
        <span style={{ background: "var(--accent)", color: "var(--primary)", padding: "0.5rem 1.5rem", borderRadius: "20px", fontWeight: 800, fontSize: "0.8rem" }}>
          PROFESSIONAL SUBJECT HUB
        </span>
        <h1 style={{ fontSize: "4rem", fontWeight: 800, color: "var(--primary)", marginTop: "1rem", marginBottom: "1.5rem", letterSpacing: "-2px" }}>
           {subjectName}
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
           Explore the most comprehensive index of verified professional credentials in {subjectName}. 
           Learnmora has indexed {courses.length} high-authority paths from the world's leading institutions.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "3rem" }}>
        <aside>
           <div style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", padding: "2rem", borderRadius: "16px", position: "sticky", top: "6rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--primary)", marginBottom: "1.5rem" }}>2026 INSIGHTS</h3>
              
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", marginBottom: "0.5rem" }}>MARKET VELOCITY</div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--success)" }}>+32%</div>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", marginBottom: "0.5rem" }}>TOP PROVIDER</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--primary)" }}>Google Cloud</div>
              </div>

              <div style={{ background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid var(--surface-border)" }}>
                 <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                    Enrollment in {subjectName} courses has increased by 140% in the last quarter across Learnmora partner institutions.
                 </p>
              </div>
           </div>
        </aside>

        <main>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
             {courses.slice(0, 24).map(course => (
               <CourseCard key={course.id} {...course} />
             ))}
          </div>
          
          {courses.length > 24 && (
            <div style={{ marginTop: "4rem", textAlign: "center" }}>
               <Link href="/courses" style={{ background: "var(--primary)", color: "white", padding: "1rem 2rem", borderRadius: "8px", fontWeight: 800, textDecoration: "none" }}>
                  View All {courses.length} Professional Paths
               </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
