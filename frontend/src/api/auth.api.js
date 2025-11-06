// frontend/src/api/auth.api.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthAPI = {
  async signup(data) {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // important: allows cookie-based sessions
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Signup failed");
    return json;
  },

  async login(data) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Login failed");
    return json;
  },

  async logout() {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    return res.json();
  },

  async check() {
    const res = await fetch(`${API_URL}/auth/check`, {
      credentials: "include",
    });
    return res.json();
  },
};
