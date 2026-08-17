import { apiRequest } from "./api";

const TOKEN_KEY = "stepup_admin_token";
const SESSION_KEY = "stepup_admin_session";

export const authService = {
  login: (email, password) => apiRequest("/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }),
  updateAccount: (account) => apiRequest("/auth/me", { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` }, body: JSON.stringify(account) }),
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getUser: () => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null")?.user || null; }
    catch { return null; }
  },
  saveSession: (session) => {
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ token: session.token, user: session.user }));
  },
  signOut: () => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(SESSION_KEY); },
};
