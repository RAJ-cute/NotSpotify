import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isArtist } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="nav">
      <Link to="/browse" className="nav__brand">
        <span className="eq" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
        NOTSPOTIFY
      </Link>

      <nav className="nav__links">
        <Link to="/browse">Browse</Link>
        {isArtist && <Link to="/dashboard">Dashboard</Link>}
      </nav>

      <div className="nav__auth">
        {user ? (
          <>
            <span className="nav__user">{user.name}</span>
            <button className="btn btn--ghost" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn--ghost" to="/login">
              Log in
            </Link>
            <Link className="btn btn--primary" to="/signup">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
