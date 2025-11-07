import styles from "./LessonDetail.module.css";
import { useLessons } from "../../hooks/useLessons";

export default function LessonDetail({ lessonId }) {
  const { lesson, loading, error } = useLessons(lessonId);

  if (loading) return <p>Loading lesson...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!lesson) return <p>No lesson data found.</p>;

  return (
    <div className={styles.lessonDetail}>
      <h2>{lesson.title}</h2>
      <p>Practice each sign before moving on!</p>
      <div className={styles.signGrid}>
        {lesson.signs.map((s) => (
          <div key={s._id} className={styles.signCard}>
            <img src={s.media.imageUrl} alt={s.display} />
            <h4>{s.display}</h4>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
