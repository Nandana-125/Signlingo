import React from "react";
import styles from "./Lessons.module.css";

export default function LessonDetailsPanel({ lesson, onClose }) {
  return (
    <aside className={styles.panel}>
      <button className={styles.closeBtn} onClick={onClose}>×</button>
      <div className={styles.panelHeader} style={{ backgroundColor: lesson.color }}>
        <h2>{lesson.title}</h2>
      </div>
      <div className={styles.panelBody}>
        <p>{lesson.desc}</p>
        <ul>
          <li>{lesson.signs} signs</li>
          <li>Approx. {lesson.time}</li>
        </ul>
        <button className={styles.startBtn}>Start Lesson</button>
      </div>
    </aside>
  );
}
