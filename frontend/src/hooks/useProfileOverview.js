import { useEffect, useRef, useState } from "react";
import {
  getProfileOverview,
  updateProfile as apiUpdateProfile,
  deleteProfile as apiDeleteProfile,
} from "../api/profile.api";

/**
 * Loads profile overview (user, lessons, quizzes) and exposes helpers.
 * Optional: auto-refresh when tab regains focus (default true).
 */
export default function useProfileOverview({ refetchOnFocus = true } = {}) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [quizStats, setQuizStats] = useState({
    totalScore: 0,
    levelsUnlocked: 1,
    levelsCompleted: 0,
  });

  const mounted = useRef(true);

  async function refresh() {
    setErr("");
    setLoading(true);
    try {
      const json = await getProfileOverview();
      const { user, lessons, quizzes } = json.data;
      if (!mounted.current) return;
      setUser(user);
      setLessons(lessons);
      setQuizStats(quizzes);
    } catch (e) {
      if (!mounted.current) return;
      setErr("Failed to load profile");
    } finally {
      if (mounted.current) setLoading(false);
    }
  }

  async function updateProfile(payload) {
    await apiUpdateProfile(payload);
    await refresh();
  }

  async function deleteProfile() {
    await apiDeleteProfile();
  }

  useEffect(() => {
    mounted.current = true;
    refresh();
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // optional: auto refresh when tab is re-focused
  useEffect(() => {
    if (!refetchOnFocus) return;
    const onFocus = () => refresh();
    const onVis = () => {
      if (document.visibilityState === "visible") refresh();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchOnFocus]);

  return {
    loading,
    err,
    user,
    lessons,
    quizStats,
    refresh,
    updateProfile,
    deleteProfile,
  };
}
