import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const Ctx = createContext();

const DEFAULT_STATS = {
  xp: 500,
  streak: 5,
  level: 3,
  dailyGoal: 10,
  dailyProgress: 0,
};

export function StatsProvider({ children }) {
  const [stats, setStats] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("signlingo.stats")) ?? DEFAULT_STATS
      );
    } catch {
      return DEFAULT_STATS;
    }
  });

  useEffect(() => {
    localStorage.setItem("signlingo.stats", JSON.stringify(stats));
  }, [stats]);

  const addXP = (n) =>
    setStats((s) => {
      const dailyProgress = Math.min(s.dailyGoal, s.dailyProgress + n);
      const levelUp = Math.floor((s.xp + n) / 1000) > Math.floor(s.xp / 1000);
      return {
        ...s,
        xp: s.xp + n,
        dailyProgress,
        level: levelUp ? s.level + 1 : s.level,
      };
    });

  const bumpStreak = () => setStats((s) => ({ ...s, streak: s.streak + 1 }));

  return (
    <Ctx.Provider value={{ stats, setStats, addXP, bumpStreak }}>
      {children}
    </Ctx.Provider>
  );
}

export const useUserStats = () => useContext(Ctx);

StatsProvider.propTypes = {
  /** React children rendered inside the provider */
  children: PropTypes.node.isRequired,
};
