import { getProviders, getCoursesByProvider, calculateValueScore } from "@/lib/courses";
import Link from "next/link";
import styles from "./rankings.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top University Rankings for Online Certificates 2026",
  description: "Global rankings of universities and tech companies based on course ROI, student outcomes, and prestige.",
};

export default async function RankingsPage() {
  const providers = await getProviders();
  
  // Calculate average Value Score for each provider
  const rankings = await Promise.all(providers.map(async (p) => {
    const courses = await getCoursesByProvider(p);
    const avgScore = courses.reduce((acc, c) => acc + calculateValueScore(c), 0) / courses.length;
    return {
      name: p,
      score: Math.round(avgScore),
      courseCount: courses.length
    };
  }));

  // Sort by highest score
  rankings.sort((a, b) => b.score - a.score);

  return (
    <div className={styles.rankingsPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>LEARNMORA ACADEMIC INDEX</span>
          <h1>Global Provider Rankings</h1>
          <p>The definitive 2026 leaderboard of Universities and Tech Providers, ranked by verified career ROI.</p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Institution</th>
                <th>Verified Courses</th>
                <th>ROI Utility Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((rank, index) => {
                const initials = rank.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
                return (
                  <tr key={rank.name}>
                    <td className={styles.rankCol}>
                      {index === 0 ? "🥇 1" : index === 1 ? "🥈 2" : index === 2 ? "🥉 3" : index + 1}
                    </td>
                    <td className={styles.providerCol}>
                      <div className={styles.logo}>{initials}</div>
                      <strong>{rank.name}</strong>
                    </td>
                    <td>{rank.courseCount}</td>
                    <td>
                      <div className={styles.scoreBarWrapper}>
                        <div className={styles.scoreBar} style={{ width: `${rank.score}%` }}></div>
                        <span>{rank.score}/100</span>
                      </div>
                    </td>
                    <td>
                      <Link 
                        href={`/universities/${encodeURIComponent(rank.name.toLowerCase().replace(/\s+/g, '-'))}`}
                        className={styles.viewBtn}
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
