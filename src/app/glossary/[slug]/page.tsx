import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>
}

const TERMS: Record<string, { term: string, desc: string, category: string }> = {
  "quantum-security": { term: "Quantum Security", category: "Cybersecurity", desc: "The field of cybersecurity focused on protecting systems against the computational power of future quantum computers. Professionals in this space work on post-quantum cryptography (PQC) and quantum key distribution (QKD)." },
  "neuro-ethics": { term: "Neuro-Ethics", category: "Healthcare & Life Sciences", desc: "The study of the ethical, legal, and social implications of neuroscience and neurotechnology. As brain-computer interfaces (BCIs) scale, neuro-ethics ensures the protection of mental privacy and cognitive liberty." },
  "llm-ops": { term: "LLM-Ops", category: "Artificial Intelligence", desc: "Operational methodologies for managing the lifecycle of Large Language Models in production environments. It encompasses data curation, fine-tuning, monitoring, and scalable deployment strategies." }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = TERMS[slug];
  if (!item) return { title: "Term Not Found" };
  return {
    title: `${item.term} - 2026 Encyclopedia | Learnmora`,
    description: `Professional definition and certification pathway for ${item.term}. Master the core frameworks of ${item.category}.`,
  };
}

export default async function GlossaryDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = TERMS[slug];
  if (!item) notFound();

  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "800px", margin: "0 auto", minHeight: "100vh" }}>
      <Link href="/glossary" style={{ color: "var(--primary)", fontWeight: 700, textDecoration: "none", display: "inline-block", marginBottom: "3rem" }}>
        ← Back to Encyclopedia
      </Link>

      <div style={{ background: "white", padding: "4rem", borderRadius: "20px", border: "1px solid var(--surface-border)", boxShadow: "var(--shadow-lg)" }}>
         <span style={{ background: "rgba(15, 23, 42, 0.05)", color: "var(--primary)", padding: "0.5rem 1rem", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 800 }}>
            {item.category.toUpperCase()}
         </span>
         <h1 style={{ fontSize: "3.5rem", fontWeight: 800, color: "var(--primary)", marginTop: "1rem", marginBottom: "2rem", letterSpacing: "-2px" }}>
            {item.term}
         </h1>
         <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: "2rem", marginBottom: "3rem" }}>
            <p style={{ fontSize: "1.4rem", color: "var(--text-main)", lineHeight: 1.6, fontStyle: "italic" }}>
               "{item.desc}"
            </p>
         </div>

         <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)", marginBottom: "1.5rem" }}>Recommended Authority Path</h2>
         <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            To master {item.term}, professionals are advised to pursue the following high-authority certifications:
         </p>

         <div style={{ background: "var(--surface)", padding: "2rem", borderRadius: "12px", border: "1px solid var(--surface-border)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Google Professional {item.term} Architect</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
               A 6-month intensive pathway verified by Google Cloud experts.
            </p>
            <Link 
               href={`/subject/${item.category.toLowerCase().replace(/\s+/g, '-')}`}
               style={{ background: "var(--primary)", color: "white", padding: "0.8rem 1.5rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}
            >
               Browse {item.category} Courses
            </Link>
         </div>
      </div>
    </div>
  );
}
