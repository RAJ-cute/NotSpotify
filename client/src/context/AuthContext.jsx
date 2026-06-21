import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

// The backend's JWT lives in an httpOnly-ish cookie set by the server, so we
// never touch the token directly. We just keep a copy of the *user object*
// in localStorage so the UI (nav links, dashboard access) survives a page
// refresh without flickering. The real gatekeeping always happens server-side
// via the cookie on every request.
function loadStoredUser() {
  try {
    const raw = localStorage.getItem("notspotify_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser);

  function persist(nextUser) {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem("notspotify_user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("notspotify_user");
    }
  }

  async function register({ name, email, password, role }) {
    const res = await api.post("/auth/register", { name, email, password, role });
    persist(res.data.user);
    return res.data.user;
  }

  async function login({ name, email, password }) {
    const res = await api.post("/auth/login", { name, email, password });
    persist(res.data.user);
    return res.data.user;
  }

  async function logout() {
    await api.post("/auth/logout");
    persist(null);
  }

  const value = { user, register, login, logout, isArtist: user?.role === "artist" };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
