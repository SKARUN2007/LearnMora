import styles from "./compare.module.css";
import { getCourseById, calculateValueScore } from "@/lib/courses";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entities = slug.split("-vs-").map(s => s.charAt(0).toUpperCase() + s.slice(1));
  return {
    title: `${entities[0]} vs ${entities[1]}: ROI & Prestige Comparison 2026 | Learnmora`,
    description: `Professional side-by-side audit of ${entities[0]} and ${entities[1]} credentials. Compare salary impact and value scores.`,
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const ids = slug.split("-vs-");
  
  if (ids.length !== 2) return notFound();

  const course1 = await getCourseById(ids[0]);
  const course2 = await getCourseById(ids[1]);

  // Fallback for generic entities if not specifically in our database yet
  if (!course1 || !course2) {
    const [e1, e2] = slug.split("-vs-").map(s => s.charAt(0).toUpperCase() + s.slice(1));
    return (
      <div className={styles.comparePage}>
        <header className={styles.hero}>
          <div className={styles.container}>
            <span className={styles.badge}>Institutional Showdown</span>
            <h1>{e1} vs {e2}</h1>
            <p>The definitive 2026 authority guide on ROI, pricing, and prestige.</p>
          </div>
        </header>
        <div className={styles.container}>
            <div className={styles.table}>
                <div className={styles.row + " " + styles.headerRow}>
                    <div className={styles.cell}>Feature</div>
                    <div className={styles.cell}>{e1}</div>
                    <div className={styles.cell}>{e2}</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.cell}>Global Recognition</div>
                    <div className={styles.cell}>Elite / Verified</div>
                    <div className={styles.cell}>High / Industry Standard</div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  const score1 = calculateValueScore(course1);
  const score2 = calculateValueScore(course2);

  return (
    <div className={styles.comparePage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>PRESTIGE COMPARISON</span>
          <h1>{course1.title} <span className={styles.vs}>vs</span> {course2.title}</h1>
          <p>Analyzing ROI and Certificate Authority for {course1.provider} vs {course2.provider}.</p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.table}>
          <div className={styles.row + " " + styles.headerRow}>
            <div className={styles.cell}>Metric</div>
            <div className={styles.cell}>{course1.provider}</div>
            <div className={styles.cell}>{course2.provider}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.cell}>Learnmora Value Score</div>
            <div className={styles.cell}><strong className={styles.score}>{score1}/100</strong></div>
            <div className={styles.cell}><strong className={styles.score}>{score2}/100</strong></div>
          </div>
          <div className={styles.row}>
            <div className={styles.cell}>Market ROI</div>
            <div className={styles.cell}>+{course1.roi}</div>
            <div className={styles.cell}>+{course2.roi}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.cell}>Price</div>
            <div className={styles.cell}>{course1.price}</div>
            <div className={styles.cell}>{course2.price}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.cell}>Duration</div>
            <div className={styles.cell}>{course1.duration}</div>
            <div className={styles.cell}>{course2.duration}</div>
          </div>
        </div>

        <section className={styles.verdict}>
          <h2>Prestige Audit Verdict</h2>
          <p>Numerical data suggests that <strong>{score1 > score2 ? course1.provider : course2.provider}</strong> offers a slightly higher Value Score for your 2026 career roadmap based on total ROI trajectory.</p>
        </section>

        <div className={styles.adSlot}>
          <div className={styles.adLabel}>FUNDED BY PROFESSIONAL PARTNERS</div>
          <div className={styles.adPlaceholder}>In-Content Native Ad Container</div>
        </div>
      </div>
    </div>
  );
}
