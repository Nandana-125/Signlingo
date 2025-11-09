import styles from "./LessonList.module.css";
import { useLessons } from "../../hooks/useLessons";
import PropTypes from "prop-types";

export default function LessonList({ onSelectLesson }) {
  const { lessons, loading, error } = useLessons();

  if (loading) return <p>Loading lessons...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      {lessons.map((lesson) => (
        <div key={lesson._id} className={styles.card}>
          <h3>{lesson.title}</h3>
          <p>Category: {lesson.category}</p>
          <button onClick={() => onSelectLesson(lesson._id)}>
            Start Lesson
          </button>
        </div>
      ))}
    </div>
  );
}

LessonList.propTypes = {
  onSelectLesson: PropTypes.func.isRequired,
};
