import { getReviewBySlug } from "@/lib/reviews";
import styles from "./review.module.css";
import { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  return {
    title: review?.title || "Review | Learnmora",
    description: review?.verdict,
  };
}

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  
  if (!review) return <div>Review not found</div>;

  return (
    <div className={styles.reviewPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.badge}>Worth It Score: {review.worthItScore}/10</div>
          <h1>{review.title}</h1>
          <p className={styles.verdict}><strong>Learnmora Verdict:</strong> {review.verdict}</p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span>Market Price</span>
            <strong>{review.price}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Est. Salary Growth</span>
            <strong>{review.roi}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Level of Difficulty</span>
            <strong>High</strong>
          </div>
        </div>

        <div className={styles.proConGrid}>
          <div className={styles.listCard}>
            <h3>The Pros</h3>
            <ul>
              {review.pros.map((p, idx) => <li key={idx}>✅ {p}</li>)}
            </ul>
          </div>
          <div className={styles.listCard}>
            <h3>The Cons</h3>
            <ul>
              {review.cons.map((c, idx) => <li key={idx}>❌ {c}</li>)}
            </ul>
          </div>
        </div>
        
        <div className={styles.adSection}>
            <div className={styles.adLabel}>UNBIASED REVIEW SUPPORTED BY ADS</div>
            <div className={styles.adPlaceholder}>In-Grid Ad Slot</div>
        </div>
      </div>
    </div>
  );
}
