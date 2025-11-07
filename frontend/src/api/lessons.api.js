export async function fetchLessons() {
  const res = await fetch("http://localhost:5000/api/lessons");
  return res.json();
}

export async function fetchLessonById(id) {
  const res = await fetch(`http://localhost:5000/api/lessons/${id}`);
  return res.json();
}