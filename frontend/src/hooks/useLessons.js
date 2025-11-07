import { useEffect, useState } from "react";
import { fetchLessons, fetchLessonById } from "../api/lessons.api";

/**
 * Custom React Hook to manage lessons data.
 * Handles both list and individual lesson fetching.
 */
export function useLessons(selectedLessonId = null) {
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch all lessons
  useEffect(() => {
    if (!selectedLessonId) {
      setLoading(true);
      fetchLessons()
        .then((data) => {
          if (data.success) setLessons(data.lessons);
          else setError("Failed to load lessons");
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [selectedLessonId]);

  // fetch single lesson
  useEffect(() => {
    if (selectedLessonId) {
      setLoading(true);
      fetchLessonById(selectedLessonId)
        .then((data) => {
          if (data.success) setLesson(data.lesson);
          else setError("Lesson not found");
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [selectedLessonId]);

  return { lessons, lesson, loading, error };
}
