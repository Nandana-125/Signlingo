import React from "react";
import styles from "./Lessons.module.css";

export default function LessonCard({ lesson, onClick }) {
  return (
    <div
      className={styles.card}
      style={{ backgroundColor: lesson.color, color: "#fff" }}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <h3 className={styles.cardTitle}>{lesson.title}</h3>
      <p className={styles.cardMeta}>
      {(lesson.signCount || lesson.signs?.length || 0)} Signs · {lesson.estimatedMinutes || lesson.time}
      </p>
      <span className={styles.status}>Start</span>
    </div>
  );
}
