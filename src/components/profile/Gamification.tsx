import styles from "./Gamification.module.css";

export default function Gamification() {
  const leaderboards = [
    { name: "Skarunamuthan", score: 450, rank: 1 },
    { name: "GlobalArchitect", score: 420, rank: 2 },
    { name: "CodeProphet", score: 380, rank: 3 }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.streakCard}>
        <div className={styles.streakIcon}>🔥</div>
        <div className={styles.streakInfo}>
          <h3>12 Day Streak</h3>
          <p>Complete one lesson today to keep your streak alive!</p>
        </div>
      </div>

      <div className={styles.leaderboard}>
        <h3>Global Skill Leaderboard</h3>
        <div className={styles.list}>
          {leaderboards.map((user, idx) => (
            <div key={idx} className={styles.userRow}>
              <span className={styles.rank}>#{user.rank}</span>
              <span className={styles.name}>{user.name}</span>
              <span className={styles.score}>{user.score} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
