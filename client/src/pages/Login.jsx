import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
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
      await login(form);
      navigate("/browse");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't log in. Check your details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="auth-card__eyebrow">Welcome back</p>
        <h1 className="auth-card__title">Log in</h1>

        <label className="field">
          <span>Email</span>
          <input type="email" value={form.email} onChange={update("email")} required />
        </label>

        <label className="field">
          <span>Password</span>
          <input type="password" value={form.password} onChange={update("password")} required />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button className="btn btn--primary btn--block" disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </button>

        <p className="auth-card__switch">
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
