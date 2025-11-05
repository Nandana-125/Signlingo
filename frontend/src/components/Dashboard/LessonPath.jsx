import styles from "./LessonPath.module.css";
import LessonNode from "./LessonNode";

const LessonPath = () => {
  const lessons = [
    { id: 1, title: "Alphabets", status: "completed" },
    { id: 2, title: "Greetings", status: "active" },
    { id: 3, title: "Numbers", status: "locked" },
  ];

  return (
    <div className={styles.pathContainer}>
      {lessons.map((lesson, index) => (
        <div
          key={lesson.id}
          className={`${styles.lessonWrapper} ${
            lesson.status === "completed" ? styles.completed : ""
          }`}
        >
          <LessonNode lesson={lesson} />
        </div>
      ))}
    </div>
  );
};

export default LessonPath;
