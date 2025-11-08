// Build base URL from Vite env (works for any port/host you set in .env)
const HOST = import.meta.env.VITE_BACKEND_HOST ?? "localhost";
const PORT = import.meta.env.VITE_BACKEND_PORT ?? "5000";
const PREFIX = import.meta.env.VITE_API_PREFIX ?? "/api";
const API_BASE =
  import.meta.env.VITE_API_URL ?? `http://${HOST}:${PORT}${PREFIX}`;

const BASE = `${API_BASE}/user-lessons`;

async function jfetch(url, opts = {}) {
  const res = await fetch(url, { credentials: "include", ...opts });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.success === false) {
    throw new Error(
      json?.message || json?.error || `Request failed: ${res.status}`
    );
  }
  return json;
}

// No userId anywhere — session cookie does the auth

/** Creates/starts a user lesson (idempotent) */
export function startLesson(lessonId) {
  return jfetch(`${BASE}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId }),
  });
}

/** Fetch progress for one lesson */
export function fetchUserProgress(lessonId) {
  const u = new URL(`${BASE}/progress`);
  u.searchParams.set("lessonId", lessonId);
  return jfetch(u.toString());
}

/** Mark a sign as done */
export function markSignDone(lessonId, signId) {
  return jfetch(`${BASE}/${lessonId}/progress`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ signId }),
  });
}

/** Reset a lesson */
export function resetLesson(lessonId) {
  return jfetch(`${BASE}/${lessonId}/reset`, { method: "DELETE" });
}
