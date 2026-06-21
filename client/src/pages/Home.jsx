import { useEffect, useState } from "react";
import api from "../api/axios";
import AlbumCard from "../components/AlbumCard";
import TrackRow from "../components/TrackRow";

export default function Home() {
  const [albums, setAlbums] = useState([]);
  const [musics, setMusics] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [albumsRes, musicsRes] = await Promise.all([
          api.get("/music/albums"),
          api.get("/music"),
        ]);
        setAlbums(albumsRes.data.albums);
        setMusics(musicsRes.data.musics);
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load the library. Are you logged in?");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="page-state">Loading the library…</div>;
  if (error) return <div className="page-state page-state--error">{error}</div>;

  return (
    <div className="page">
      <section>
        <p className="section-eyebrow">{albums.length} album{albums.length !== 1 ? "s" : ""}</p>
        <h1 className="section-title">Albums</h1>

        {albums.length === 0 ? (
          <p className="empty-note">No albums yet. Artists can add one from their dashboard.</p>
        ) : (
          <div className="album-grid">
            {albums.map((album) => (
              <AlbumCard
                key={album._id}
                id={album._id}
                title={album.title}
                artistName={album.artist?.name}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <p className="section-eyebrow">{musics.length} track{musics.length !== 1 ? "s" : ""}</p>
        <h1 className="section-title">All tracks</h1>

        {musics.length === 0 ? (
          <p className="empty-note">No tracks uploaded yet.</p>
        ) : (
          <div className="tracklist">
            {musics.map((music, i) => (
              <TrackRow
                key={music._id}
                index={i + 1}
                title={music.title}
                artistName={music.artist?.name}
                uri={music.uri}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
