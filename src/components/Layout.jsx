import { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { BG_FILE, MUSIC_FILE } from "../config.js";

function Background() {
  if (BG_FILE) {
    const src = import.meta.env.BASE_URL + BG_FILE;
    const isVideo = /\.(mp4|webm)$/i.test(BG_FILE);
    return (
      <div className="bg">
        {isVideo ? (
          <video className="bg-media" src={src} autoPlay loop muted playsInline />
        ) : (
          <img className="bg-media" src={src} alt="" />
        )}
      </div>
    );
  }
  return (
    <div className="bg">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className="blob b4" />
    </div>
  );
}

// S24 §2: layout bersama + <Outlet /> untuk halaman yang cocok.
export default function Layout() {
  const [hidden, setHidden] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  // Browser memblokir suara otomatis, jadi musik mulai di klik pertama pengunjung.
  useEffect(() => {
    if (!MUSIC_FILE) return;
    async function startOnFirstClick() {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        /* diabaikan: pengunjung bisa menekan tombol musik */
      }
    }
    window.addEventListener("pointerdown", startOnFirstClick, { once: true });
    return () => window.removeEventListener("pointerdown", startOnFirstClick);
  }, []);

  return (
    <>
      <Background />
      {MUSIC_FILE && (
        <>
          <audio ref={audioRef} src={import.meta.env.BASE_URL + MUSIC_FILE} loop />
          <button className="toggle music" onClick={togglePlay}>
            {playing ? "♪ Music: On" : "♪ Music: Off"}
          </button>
        </>
      )}
      <button className="toggle" onClick={() => setHidden((h) => !h)}>
        {hidden ? "Show Pokédex" : "Hide Pokédex"}
      </button>
      <div className={"app" + (hidden ? " hidden" : "")}>
        <header>
          <Link to="/">
            <h1>PokéDex Mini</h1>
          </Link>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
