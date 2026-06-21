import { Link } from "react-router-dom";

export default function AlbumCard({ id, title, artistName }) {
  const initial = title?.[0]?.toUpperCase() || "?";

  return (
    <Link to={`/albums/${id}`} className="album-card">
      <div className="album-card__cover" aria-hidden="true">
        <span>{initial}</span>
      </div>
      <div className="album-card__title">{title}</div>
      <div className="album-card__artist">{artistName || "Unknown artist"}</div>
    </Link>
  );
}
