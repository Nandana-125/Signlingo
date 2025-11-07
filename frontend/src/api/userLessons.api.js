// frontend/src/api/userLessons.api.js

// fetch progress for a specific user and lesson
export async function fetchUserProgress(userId, lessonId) {
  const res = await fetch(
    `http://localhost:5000/api/user-lessons/progress?userId=${userId}&lessonId=${lessonId}`
  );
  return res.json();
}

// (optional) mark a sign as done — if you want to reuse this separately
export async function markSignDone(userId, lessonId, signId) {
  const res = await fetch(
    `http://localhost:5000/api/user-lessons/${lessonId}/progress`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, signId }),
    }
  );
  return res.json();
}

// (optional) reset lesson progress
export async function resetLesson(userId, lessonId) {
  const res = await fetch(
    `http://localhost:5000/api/user-lessons/${lessonId}/reset`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }
  );
  return res.json();
}
