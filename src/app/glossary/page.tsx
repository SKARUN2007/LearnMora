"use client";

import Link from "next/link";

const GLOSSARY_TERMS = [
  { term: "Quantum Security", desc: "The field of cybersecurity focused on protecting systems against the computational power of future quantum computers.", slug: "quantum-security" },
  { term: "Neuro-Ethics", desc: "The study of the ethical, legal, and social implications of neuroscience and neurotechnology.", slug: "neuro-ethics" },
  { term: "LLM-Ops", desc: "Operational methodologies for managing the lifecycle of Large Language Models in production environments.", slug: "llm-ops" },
  { term: "Digital Sovereignty", desc: "The authority of a professional or entity to maintain control over their digital assets and career trajectory.", slug: "digital-sovereignty" },
  { term: "Meta-Leadership", desc: "High-level leadership frameworks designed for decentralized and rapidly evolving digital organizations.", slug: "meta-leadership" },
  { term: "Precision Medicine", desc: "An emerging approach for disease treatment and prevention that takes into account individual variability in genes, environment, and lifestyle.", slug: "precision-medicine" }
];

export default function GlossaryPage() {
  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto", minHeight: "100vh" }}>
      <header style={{ marginBottom: "5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: 800, color: "var(--primary)", marginBottom: "1rem", letterSpacing: "-1.5px" }}>
           Authority Encyclopedia
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: "700px", margin: "0 auto" }}>
           Master the 2026 lexicon. Each term is cross-linked to verified professional certification pathways.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
         {GLOSSARY_TERMS.map(item => (
           <Link 
             key={item.slug} 
             href={`/glossary/${item.slug}`}
             style={{ display: "block", background: "white", border: "1px solid var(--surface-border)", padding: "2.5rem", borderRadius: "16px", textDecoration: "none", transition: "all 0.2s" }}
             className="glossaryCard"
           >
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)", marginBottom: "1rem" }}>{item.term}</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              <div style={{ marginTop: "1.5rem", color: "var(--primary)", fontWeight: 700, fontSize: "0.9rem" }}>
                 VIEW PATHWAY →
              </div>
           </Link>
         ))}
      </div>

      <style jsx>{`
        .glossaryCard:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
}
