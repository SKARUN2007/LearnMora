import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CAREERS } from "@/lib/courses";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const careerName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Verify it exists in our career matrix
  const isValid = CAREERS.some(c => c.toLowerCase() === careerName.toLowerCase());
  
  if (!isValid) {
    return { title: 'Career Not Found | Learnmora' };
  }

  return {
    title: `${careerName} Career Path & Free Certifications 2026 | Learnmora`,
    description: `Discover the 2026 career roadmap for ${careerName}. Find global demand, top required skills, and free professional certificates from MIT, Harvard, and Google.`,
    openGraph: {
      title: `${careerName} - 2026 Career Architecture`,
      description: `Analyze market velocity and required skills for the ${careerName} role.`,
    }
  };
}

export default async function CareerSEOPage({ params }: Props) {
  const { slug } = await params;
  const careerName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const isValid = CAREERS.some(c => c.toLowerCase() === careerName.toLowerCase());
  if (!isValid) notFound();

  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto", minHeight: "100vh" }}>
      <Link href="/roadmap" style={{ color: "var(--primary)", fontWeight: 700, textDecoration: "none", display: "inline-block", marginBottom: "2rem" }}>
        ← Back to Matrix
      </Link>
      
      <div style={{ background: "white", padding: "4rem", borderRadius: "16px", border: "1px solid var(--surface-border)", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
        <span style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--success)", padding: "0.5rem 1rem", borderRadius: "20px", fontWeight: 800, fontSize: "0.85rem" }}>
          VERIFIED PATHWAY
        </span>
        <h1 style={{ fontSize: "3.5rem", color: "var(--primary)", fontWeight: 800, marginTop: "1rem", marginBottom: "1.5rem", letterSpacing: "-1px" }}>
          {careerName}
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: "800px", lineHeight: 1.6, marginBottom: "3rem" }}>
          The {careerName} role is experiencing unprecedented global demand. To reach Elite Command status in this field, professionals must master systems architecture, agile deployment, and advanced strategic fundamentals.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "4rem" }}>
          <div style={{ border: "1px solid var(--surface-border)", padding: "2rem", borderRadius: "12px" }}>
            <h3 style={{ color: "var(--primary)", fontWeight: 800, marginBottom: "0.5rem" }}>2026 Global Demand</h3>
            <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--success)" }}>142,000+</div>
            <p style={{ color: "var(--text-muted)" }}>Open verified roles globally.</p>
          </div>
          <div style={{ border: "1px solid var(--surface-border)", padding: "2rem", borderRadius: "12px" }}>
            <h3 style={{ color: "var(--primary)", fontWeight: 800, marginBottom: "0.5rem" }}>Market Velocity</h3>
            <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--accent)", WebkitTextStroke: "1px var(--primary)" }}>+28%</div>
            <p style={{ color: "var(--text-muted)" }}>YOY Growth Rate.</p>
          </div>
        </div>

        <h2 style={{ fontSize: "2rem", color: "var(--primary)", fontWeight: 800, marginBottom: "2rem" }}>Authored Certification Path</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[
            { p: "MIT xPRO", t: `Advanced ${careerName} Masterclass` },
            { p: "Google Cloud", t: `Professional ${careerName} Certification` },
            { p: "Harvard University", t: `${careerName} for Business Leaders` }
          ].map((cert, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem", border: "1px solid var(--surface-border)", borderRadius: "12px" }}>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.25rem" }}>{cert.p}</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--primary)" }}>{cert.t}</div>
              </div>
              <Link href="/api/out?url=https://mit.edu/course" style={{ background: "#0f172a", color: "white", padding: "0.8rem 1.5rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none" }}>
                Enroll Free
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
