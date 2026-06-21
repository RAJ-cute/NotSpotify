import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function ArtistDashboard() {
  const { user } = useAuth();

  const [myMusics, setMyMusics] = useState([]);
  const [myAlbums, setMyAlbums] = useState([]);
  const [loadingLibrary, setLoadingLibrary] = useState(true);

  const [trackForm, setTrackForm] = useState({ title: "", uri: "" });
  const [trackStatus, setTrackStatus] = useState("");

  const [albumTitle, setAlbumTitle] = useState("");
  const [selectedMusicIds, setSelectedMusicIds] = useState([]);
  const [albumStatus, setAlbumStatus] = useState("");

  async function refreshLibrary() {
    setLoadingLibrary(true);
    try {
      const [musicsRes, albumsRes] = await Promise.all([
        api.get("/music"),
        api.get("/music/albums"),
      ]);
      setMyMusics(musicsRes.data.musics.filter((m) => m.artist?._id === user.id));
      setMyAlbums(albumsRes.data.albums.filter((a) => a.artist?._id === user.id));
    } catch {
      // silently ignore — the forms below still work even if this list fails to load
    } finally {
      setLoadingLibrary(false);
    }
  }

  useEffect(() => {
    refreshLibrary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAddTrack(e) {
    e.preventDefault();
    setTrackStatus("");
    try {
      await api.post("/music/add", trackForm);
      setTrackForm({ title: "", uri: "" });
      setTrackStatus("Track uploaded.");
      refreshLibrary();
    } catch (err) {
      setTrackStatus(err.response?.data?.message || "Couldn't upload that track.");
    }
  }

  function toggleMusicSelection(id) {
    setSelectedMusicIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function handleCreateAlbum(e) {
    e.preventDefault();
    setAlbumStatus("");
    try {
      await api.post("/music/album", { title: albumTitle, musics: selectedMusicIds });
      setAlbumTitle("");
      setSelectedMusicIds([]);
      setAlbumStatus("Album created.");
      refreshLibrary();
    } catch (err) {
      setAlbumStatus(err.response?.data?.message || "Couldn't create that album.");
    }
  }

  return (
    <div className="page">
      <p className="section-eyebrow">Artist dashboard</p>
      <h1 className="section-title">Add your work</h1>

      <div className="dashboard-grid">
        <form className="panel" onSubmit={handleAddTrack}>
          <h2 className="panel__title">Upload a track</h2>

          <label className="field">
            <span>Title</span>
            <input
              value={trackForm.title}
              onChange={(e) => setTrackForm({ ...trackForm, title: e.target.value })}
              required
            />
          </label>

          <label className="field">
            <span>Audio URL</span>
            <input
              placeholder="https://…"
              value={trackForm.uri}
              onChange={(e) => setTrackForm({ ...trackForm, uri: e.target.value })}
              required
            />
          </label>

          {trackStatus && <p className="form-note">{trackStatus}</p>}

          <button className="btn btn--primary btn--block">Upload track</button>
        </form>

        <form className="panel" onSubmit={handleCreateAlbum}>
          <h2 className="panel__title">Create an album</h2>

          <label className="field">
            <span>Album title</span>
            <input value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} required />
          </label>

          <div className="field">
            <span>Pick tracks from your uploads</span>
            {loadingLibrary ? (
              <p className="empty-note">Loading your tracks…</p>
            ) : myMusics.length === 0 ? (
              <p className="empty-note">Upload a track first, then come back here.</p>
            ) : (
              <div className="checkbox-list">
                {myMusics.map((music) => (
                  <label key={music._id} className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={selectedMusicIds.includes(music._id)}
                      onChange={() => toggleMusicSelection(music._id)}
                    />
                    {music.title}
                  </label>
                ))}
              </div>
            )}
          </div>

          {albumStatus && <p className="form-note">{albumStatus}</p>}

          <button className="btn btn--primary btn--block" disabled={selectedMusicIds.length === 0}>
            Create album
          </button>
        </form>
      </div>

      <section>
        <p className="section-eyebrow">{myAlbums.length} album{myAlbums.length !== 1 ? "s" : ""}</p>
        <h2 className="section-title">Your albums</h2>
        {myAlbums.length === 0 ? (
          <p className="empty-note">Nothing here yet.</p>
        ) : (
          <ul className="plain-list">
            {myAlbums.map((a) => (
              <li key={a._id}>{a.title}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
