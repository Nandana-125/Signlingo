import { useState } from "react";
import LessonCard from "./LessonCard";
import LessonDetailsPanel from "./LessonDetailsPanel";
import { useLessons } from "../../hooks/useLessons";
import styles from "./Lessons.module.css";

export default function LessonGrid() {
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const { lessons, lesson, loading, error } = useLessons(selectedLessonId);

  if (loading) return <p>Loading lessons...</p>;
  if (error) return <p>Error: {error}</p>;

  // toggle a CSS class when the panel is open
  const layoutClass = selectedLessonId
    ? `${styles.layout} ${styles.panelOpen}`
    : styles.layout;

  return (
    <div className={layoutClass}>
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {lessons.map((l, i) => (
            <LessonCard
              key={l._id}
              lesson={{
                ...l,
                color: ["#216869", "#49a078", "#9cc5a1", "#5b8a72"][i % 4],
              }}
              onClick={() => setSelectedLessonId(l._id)}
            />
          ))}
        </div>
      </div>

      {selectedLessonId && lesson && (
        <LessonDetailsPanel
          lesson={lesson}
          onClose={() => setSelectedLessonId(null)}
        />
      )}
    </div>
  );
}
