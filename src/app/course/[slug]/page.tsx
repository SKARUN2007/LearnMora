import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TAGGED_COURSES } from "@/lib/dynamicTaxonomy";
import CourseCard from "@/components/courses/CourseCard";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = TAGGED_COURSES.find(c => c.id === slug || c.title.toLowerCase().replace(/\s+/g, '-') === slug);
  
  if (!course) return { title: "Course Not Found | Learnmora" };

  return {
    title: `${course.title} - ${course.provider} | Learnmora Professional Index`,
    description: `Enroll in ${course.title} provided by ${course.provider}. ROI: ${course.roi}. Duration: ${course.duration}. ${course.description?.substring(0, 150)}...`,
    openGraph: {
      title: `${course.title} Certificate`,
      description: `Professional certification from ${course.provider} listed on Learnmora.`,
    }
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = TAGGED_COURSES.find(c => c.id === slug || c.title.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!course) notFound();

  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto", minHeight: "100vh" }}>
      <Link href="/courses" style={{ color: "var(--primary)", fontWeight: 700, textDecoration: "none", marginBottom: "2rem", display: "inline-block" }}>
        ← Back to Index
      </Link>

      <div style={{ background: "white", borderRadius: "16px", border: "1px solid var(--surface-border)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ padding: "3rem", background: "var(--surface)", borderBottom: "1px solid var(--surface-border)" }}>
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                 {course.provider} • {course.category}
              </div>
              {course.isFree && (
                <span style={{ background: "var(--success)", color: "white", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 800 }}>
                  FREE CERTIFICATE
                </span>
              )}
           </div>
           
           <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "var(--primary)", marginBottom: "1.5rem", lineHeight: 1.1 }}>
              {course.title}
           </h1>

           <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)" }}>RATING</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>⭐ {course.rating.toFixed(1)}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)" }}>DURATION</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>⏱️ {course.duration}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)" }}>ROI IMPACT</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--success)" }}>+{course.roi}</div>
              </div>
           </div>
        </div>

        <div style={{ padding: "3rem" }}>
           <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)", marginBottom: "1.5rem" }}>Course Description</h2>
           <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1.1rem", marginBottom: "3rem" }}>
              {course.description || "This professional certification program is designed to provide high-authority training in industry-standard methodologies. Master the core frameworks and practical tools required to excel in modern enterprise environments. Verified outcomes include hands-on project completion and industry-standard credentialing."}
           </p>

           <div style={{ display: "flex", gap: "1.5rem" }}>
              <a 
                href={course.enroll_url || "/api/out"} 
                style={{ background: "var(--primary)", color: "white", padding: "1.2rem 2.5rem", borderRadius: "12px", fontWeight: 800, textDecoration: "none", fontSize: "1.1rem" }}
              >
                Enroll Now (Free Access)
              </a>
              <button style={{ background: "white", border: "1px solid var(--surface-border)", padding: "1.2rem 2rem", borderRadius: "12px", fontWeight: 700 }}>
                Compare Course
              </button>
           </div>
        </div>
      </div>

      <div style={{ marginTop: "6rem" }}>
         <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)", marginBottom: "2rem" }}>Similar Certifications</h2>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
            {TAGGED_COURSES.filter(c => c.tier2 === course.tier2 && c.id !== course.id).slice(0, 3).map(c => (
              <CourseCard key={c.id} {...c} />
            ))}
         </div>
      </div>
    </div>
  );
}
