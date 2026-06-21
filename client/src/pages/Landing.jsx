import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Squiggle({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="none">
      <path
        d="M4 8C30 4 28 28 54 24C80 20 76 50 110 40"
        stroke="var(--lime)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M96 30L112 38L100 50" stroke="var(--lime)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function SpinBadge() {
  return (
    <svg className="spin-badge" viewBox="0 0 130 130">
      <circle cx="65" cy="65" r="62" fill="var(--lime)" />
      <g className="spin-badge__ring">
        <path id="badge-circle" d="M65,65 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" fill="none" />
        <text fill="var(--lime-ink)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" letterSpacing="1.5">
          <textPath href="#badge-circle" startOffset="0%">
            GET STARTED FREE • GET STARTED FREE •
          </textPath>
        </text>
      </g>
      <path d="M50 58l16 10-16 10z" fill="var(--lime-ink)" transform="translate(0,-12)" />
    </svg>
  );
}

export default function Landing() {
  const { user } = useAuth();

  return (
    <div>
      <header className="landing-hero">
        <nav className="landing-nav">
          <span className="landing-nav__brand">
            <span className="eq" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            NOTSPOTIFY
          </span>
          <div className="landing-nav__links">
            <a href="#how">How it works</a>
            <a href="#for-artists">For artists</a>
          </div>
          {user ? (
            <Link to="/browse" className="landing-nav__cta">
              Go to library
            </Link>
          ) : (
            <Link to="/signup" className="landing-nav__cta">
              Get started
            </Link>
          )}
        </nav>

        <div className="landing-hero__inner">
          <p className="landing-hero__tag">Built by independent artists</p>
          <h1 className="landing-hero__title">
            <span className="hash">#</span>REAL
            <br />
            MUSIC
            <br />
            REAL ARTISTS
          </h1>
          <p className="landing-hero__sub">
            Upload your tracks, build albums, and get heard — no label, no
            middleman. Listeners get a library straight from the people
            making it.
          </p>
          <div className="landing-hero__actions">
            {user ? (
              <Link to="/browse" className="btn btn--primary">
                Go to library
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn--primary">
                  Get started free
                </Link>
                <Link to="/login" className="btn btn--ghost">
                  Log in
                </Link>
              </>
            )}
          </div>

          <div className="landing-hero__art" aria-hidden="true">
            <Squiggle className="squiggle squiggle--one" />
            <Squiggle className="squiggle squiggle--two" />

            <div className="track-sticker track-sticker--one">
              <div className="track-sticker__cover">M</div>
              <div className="track-sticker__title">Midnight Drive</div>
              <div className="track-sticker__meta">12 402 streams</div>
            </div>

            <div className="track-sticker track-sticker--two">
              <div className="track-sticker__cover">A</div>
              <div className="track-sticker__title">Aurora EP</div>
              <div className="track-sticker__meta">3 tracks · live</div>
            </div>

            <SpinBadge />
          </div>
        </div>
      </header>

      <section className="landing-features" id="how">
        <div>
          <p className="landing-feature__index">01</p>
          <h3 className="landing-feature__title">Upload your tracks</h3>
          <p className="landing-feature__body">
            Artists drop a title and an audio link — it's live on the
            platform instantly, no approval queue.
          </p>
        </div>
        <div id="for-artists">
          <p className="landing-feature__index">02</p>
          <h3 className="landing-feature__title">Build an album</h3>
          <p className="landing-feature__body">
            Group your tracks into a release. Listeners browse by album or
            dig through every track on the platform.
          </p>
        </div>
        <div>
          <p className="landing-feature__index">03</p>
          <h3 className="landing-feature__title">Get heard</h3>
          <p className="landing-feature__body">
            Every listener who signs up sees your catalog on the home page —
            no algorithm gatekeeping your reach.
          </p>
        </div>
      </section>

      <section className="landing-cta">
        <h2 className="landing-cta__title">Drop your first track today</h2>
        <Link to="/signup" className="btn btn--primary">
          Create your account
        </Link>
      </section>
    </div>
  );
}
