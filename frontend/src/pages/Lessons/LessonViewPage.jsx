import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchLessonById } from "../../api/lessons.api";
import styles from "../../components/Lessons/Lessons.module.css";

export default function LessonViewPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  // TODO: replace with real user ID from session/auth
  const currentUserId = "672c9b8f11a1e1d9b2efabc3";

  const [lesson, setLesson] = useState(null);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    async function loadLesson() {
      try {
        setLoading(true);
        const data = await fetchLessonById(lessonId);
        if (data.success) {
          setLesson(data.lesson);
          setError(null);
        } else {
          setError("Lesson not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    }
    loadLesson();
  }, [lessonId]);

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (error) return <div style={{ padding: "2rem" }}>{error}</div>;
  if (!lesson || !lesson.signs?.length)
    return <div style={{ padding: "2rem" }}>No signs found for this lesson.</div>;

  const currentSign = lesson.signs[index];
  const hasNext = index < lesson.signs.length - 1;
  const progressPercent = ((index + 1) / lesson.signs.length) * 100;

  const handleMarkDone = async () => {
    try {
      setDone(true);
      const res = await fetch(`http://localhost:5000/api/user-lessons/${lesson._id}/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUserId,
          signId: currentSign._id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setXpEarned(data.xpEarned);
      }
    } catch (err) {
      console.error("Mark as done failed", err);
    }
  };

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      if (hasNext) {
        setIndex(index + 1);
        setDone(false); // reset mark state for next sign
      }
    }, 300);
  };

  const handleResetProgress = async () => {
    if (!window.confirm("This will delete your progress. Continue?")) return;
    try {
      await fetch(`http://localhost:5000/api/user-lessons/${lesson._id}/reset`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      });
      alert("Progress has been reset.");
      navigate("/app/lessons");
    } catch (err) {
      console.error("Reset failed:", err);
    }
  };

  return (
    <div className={styles.lessonView}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <h1 className={styles.lessonTitle}>{lesson.title}</h1>
        <button className={styles.resetBtn} onClick={handleResetProgress}>
          Reset Progress
        </button>
      </div>

      {/* progress indicator */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className={styles.progressText}>
        Sign {index + 1} of {lesson.signs.length}
      </p>

      {/* sign card */}
      <div
        key={currentSign._id}
        className={`${styles.signCard} ${animate ? styles.fadeOut : styles.fadeIn}`}
      >
        <img
          src={currentSign.media?.imageUrl}
          alt={currentSign.display}
          className={styles.signImage}
        />
        <h2 className={styles.signLabel}>{currentSign.display}</h2>
        <p className={styles.signDesc}>{currentSign.description}</p>
        <p className={styles.practiceNote}>
          Practice this sign a few times before moving to the next or test it in
          Live Practice.
        </p>

        <div className={styles.lessonButtons}>
          {/* Mark as Done */}
          <button
            className={styles.practiceBtn}
            onClick={handleMarkDone}
            disabled={done}
          >
            {done ? "✅ Marked as Done" : "Mark as Done"}
          </button>

          {/* Next only appears after marking done */}
          {done && hasNext && (
            <button className={styles.nextBtn} onClick={handleNext}>
              Next →
            </button>
          )}

          {/* optional Live Practice */}
          <button
            className={styles.practiceBtn}
            onClick={() => navigate("/app/live")}
          >
            Live Practice
          </button>
        </div>

        {xpEarned > 0 && (
          <p className={styles.practiceNote}>
            🌟 XP Earned: {xpEarned}
          </p>
        )}
      </div>
    </div>
  );
}
