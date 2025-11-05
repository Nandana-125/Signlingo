import React from "react";
import styles from "./LeaderboardPage.module.css";

const top3 = [
  {
    id: 1,
    name: "AlexR_21",
    points: 1520,
    streak: 15,
    courses: 12,
    avatarBg: "#FCEFEA",
    rankBadge: "1",
  },
  {
    id: 2,
    name: "LearnWithMira",
    points: 1340,
    streak: 18,
    courses: 9,
    avatarBg: "#EAF3FF",
    rankBadge: "2",
  },
  {
    id: 3,
    name: "CodeJunkie",
    points: 1120,
    streak: 15,
    courses: 10,
    avatarBg: "#F6EAFE",
    rankBadge: "3",
  },
];

const rows = [
  { id: 4, user: "DesignGuru", courses: 8, streak: 8, points: 980 },
  { id: 5, user: "MathMaster", courses: 7, streak: 7, points: 890 },
  { id: 6, user: "GrowthHacker", courses: 6, streak: 7, points: 832 },
  { id: 7, user: "DevWizard", courses: 5, streak: 7, points: 791 },
  { id: 8, user: "You", courses: 4, streak: 4, points: 790, isYou: true },
  { id: 9, user: "UIUXExplorer", courses: 4, streak: 6, points: 788 },
];

function TopCard({ item }) {
  return (
    <div className={styles.topCard}>
      <div className={styles.tcHeader}>
        <div className={styles.avatar} style={{ background: item.avatarBg }}>
          <span className={styles.avatarEmoji}>🙂</span>
          <span className={styles.rankDot}>{item.rankBadge}</span>
        </div>
        <div className={styles.tcInfo}>
          <div className={styles.nameRow}>
            <h3 className={styles.userName}>{item.name}</h3>
            <div className={styles.points}>
              <span className={styles.pointDot}>🔹</span>
              {item.points.toLocaleString()}
            </div>
          </div>
          <div className={styles.meta}>
            <span>{item.courses} courses completed</span>
            <span className={styles.dot}>•</span>
            <span>{item.streak}-day streak</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ r }) {
  return (
    <div className={`${styles.row} ${r.isYou ? styles.youRow : ""}`}>
      <div className={styles.cRank}>{r.id}</div>
      <div className={styles.cUser}>
        <div className={styles.rowAvatar}>🧑‍💻</div>
        <span className={styles.rowName}>{r.user}</span>
      </div>
      <div className={styles.cCourses}>{r.courses} courses</div>
      <div className={styles.cStreak}>{r.streak} days</div>
      <div className={styles.cPoints}>
        <span className={styles.pointDot}>🔹</span>
        {r.points}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Leaderboard</h1>

      <div className={styles.topGrid}>
        {top3.map((t) => (
          <TopCard key={t.id} item={t} />
        ))}
      </div>

      <div className={styles.table}>
        <div className={styles.tHead}>
          <div className={styles.hRank}>Rank</div>
          <div className={styles.hUser}>User</div>
          <div className={styles.hCourses}>Courses Completed</div>
          <div className={styles.hStreak}>Streak</div>
          <div className={styles.hPoints}>Points</div>
        </div>

        <div className={styles.tBody}>
          {rows.map((r) => (
            <Row key={r.id} r={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
