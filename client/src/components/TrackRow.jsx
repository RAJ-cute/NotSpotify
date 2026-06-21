import { useRef, useState } from "react";

export default function TrackRow({ index, title, artistName, uri }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function toggle() {
    if (!uri) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }

  return (
    <div
      className={`track-row ${uri ? "track-row--playable" : ""} ${isPlaying ? "track-row--playing" : ""}`}
      onClick={toggle}
      role={uri ? "button" : undefined}
      tabIndex={uri ? 0 : undefined}
    >
      <span className="track-row__index">
        <span className="track-row__number">{String(index).padStart(2, "0")}</span>
        <span className="eq eq--mini" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </span>

      <span className="track-row__title">{title}</span>
      <span className="track-row__artist">{artistName || "Unknown artist"}</span>

      {uri && <audio ref={audioRef} src={uri} onEnded={() => setIsPlaying(false)} />}
    </div>
  );
}
