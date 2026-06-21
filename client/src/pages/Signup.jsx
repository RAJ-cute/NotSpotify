import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/browse");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't sign up. Try a different email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="auth-card__eyebrow">Join in</p>
        <h1 className="auth-card__title">Create account</h1>

        <label className="field">
          <span>Name</span>
          <input value={form.name} onChange={update("name")} required />
        </label>

        <label className="field">
          <span>Email</span>
          <input type="email" value={form.email} onChange={update("email")} required />
        </label>

        <label className="field">
          <span>Password</span>
          <input type="password" value={form.password} onChange={update("password")} required />
        </label>

        <div className="field">
          <span>I am a</span>
          <div className="role-toggle">
            <button
              type="button"
              className={form.role === "user" ? "is-active" : ""}
              onClick={() => setForm({ ...form, role: "user" })}
            >
              Listener
            </button>
            <button
              type="button"
              className={form.role === "artist" ? "is-active" : ""}
              onClick={() => setForm({ ...form, role: "artist" })}
            >
              Artist
            </button>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <button className="btn btn--primary btn--block" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </button>

        <p className="auth-card__switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
