import React from "react";
import { useUserStats } from "../../context/UserStatsContext.jsx";
import styles from "./RightStats.module.css";
import PropTypes from "prop-types";

function StatPill({ icon, value, label }) {
  return (
    <div className={styles.pill}>
      <span className={styles.icon} aria-hidden>
        {icon}
      </span>
      <div className={styles.pillText}>
        <div className={styles.value}>{value}</div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
}

export default function RightStats() {
  const { stats } = useUserStats();
  const pct = Math.min(
    100,
    Math.round((stats.dailyProgress / stats.dailyGoal) * 100)
  );

  return (
    <aside className={styles.rail} aria-label="User stats">
      {/* Top stat pills */}
      <div className={styles.pillsRow}>
        <StatPill
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M12 2l3 6 6 .9-4.5 4.3 1 6-5.5-3-5.5 3 1-6L3 8.9 9 8l3-6z" />
            </svg>
          }
          value={stats.level}
          label="Level"
        />
        <StatPill
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M12 2C8 6 6 9 6 12a6 6 0 0012 0c0-3-2-6-6-10z" />
            </svg>
          }
          value={stats.streak}
          label="Streak"
        />
        <StatPill
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M12 2l6 6-6 14-6-14 6-6z" />
            </svg>
          }
          value={stats.xp}
          label="XP"
        />
      </div>

      {/* Daily XP card (optional, remove if you don't want it) */}
      <section className={styles.card}>
        <header className={styles.cardHeader}>
          <div className={styles.cardTitle}>Daily Quests</div>
          <button className={styles.viewAllBtn} type="button">
            VIEW ALL
          </button>
        </header>
        <div className={styles.questRow}>
          <div className={styles.questLabel}>Earn {stats.dailyGoal} XP</div>
          <div className={styles.progress}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <div className={styles.progressText}>
            {stats.dailyProgress} / {stats.dailyGoal}
          </div>
        </div>
      </section>

      {/* “Unlock Leaderboards” style card (optional) */}
      <section className={styles.card}>
        <div className={styles.cardTitle}>Unlock Leaderboards!</div>
        <p className={styles.cardSub}>
          Complete 10 more lessons to start competing
        </p>
      </section>
    </aside>
  );
}

StatPill.propTypes = {
  icon: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string.isRequired,
};
