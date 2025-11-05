import React, { useState } from "react";
import LessonCard from "./LessonCard.jsx";
import LessonDetailsPanel from "./LessonDetailsPanel.jsx";
import styles from "./Lessons.module.css";

const lessons = [
  { id: 1, title: "Alphabets", color: "#216869", signs: 26, time: "3 min", desc: "Learn hand signs for A–Z letters." },
  { id: 2, title: "Greetings", color: "#49a078", signs: 15, time: "2 min", desc: "Common greetings and polite expressions." },
  { id: 3, title: "Numbers", color: "#9cc5a1", signs: 20, time: "4 min", desc: "Count from 0–100 using sign language." },
  { id: 4, title: "Food & Drinks", color: "#5b8a72", signs: 18, time: "3 min", desc: "Vocabulary for meals and drinks." },
];

export default function LessonGrid() {
  const [selected, setSelected] = useState(null);

  return (
    <div className={styles.layout}>
      <div className={styles.grid}>
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onClick={() => setSelected(lesson)}
          />
        ))}
      </div>

      {selected && (
        <LessonDetailsPanel
          lesson={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
