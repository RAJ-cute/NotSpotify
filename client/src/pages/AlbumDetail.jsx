import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import TrackRow from "../components/TrackRow";

export default function AlbumDetail() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/music/albums/${albumId}`);
        setAlbum(res.data.album);
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load this album.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [albumId]);

  if (loading) return <div className="page-state">Loading album…</div>;
  if (error) return <div className="page-state page-state--error">{error}</div>;
  if (!album) return null;

  return (
    <div className="page">
      <Link to="/browse" className="back-link">
        ← Back to browse
      </Link>

      <p className="section-eyebrow">Album</p>
      <h1 className="section-title section-title--huge">{album.title}</h1>
      <p className="album-detail__artist">{album.artist?.name || "Unknown artist"}</p>

      {!album.musics || album.musics.length === 0 ? (
        <p className="empty-note">No tracks in this album yet.</p>
      ) : (
        <div className="tracklist">
          {album.musics.map((music, i) => (
            <TrackRow key={music._id} index={i + 1} title={music.title} uri={music.uri} />
          ))}
        </div>
      )}
    </div>
  );
}
