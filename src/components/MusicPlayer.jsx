import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Music, ChevronUp, ChevronDown, VolumeX } from "lucide-react";
import audioManager, { PLAYLIST, subscribe, getState } from "@/lib/audioManager";

// ─── Marquee text for long titles ────────────────────────────────────────────
function Marquee({ text, active }) {
  const ref = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (ref.current) {
      setShouldScroll(ref.current.scrollWidth > ref.current.clientWidth + 4);
    }
  }, [text]);

  return (
    <div className="overflow-hidden relative" style={{ maxWidth: "100%" }}>
      <p
        ref={ref}
        className="text-sm font-semibold whitespace-nowrap"
        style={{
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, 'SF Pro Text', sans-serif",
          animation: active && shouldScroll ? "marquee-scroll 12s linear infinite" : "none",
        }}
      >
        {text}
      </p>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ isPlaying }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const audio = audioManager._audio?.();
      if (audio && audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying]);

  return (
    <div
      className="w-full rounded-full overflow-hidden"
      style={{ height: 3, background: "rgba(217,119,6,0.2)" }}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #d97706, #f59e0b)",
          transition: "none",
        }}
      />
    </div>
  );
}

// ─── iOS-style circular update icon ──────────────────────────────────────────
function IOSMusicIcon({ isPlaying, onClick }) {
  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      <motion.button
        onClick={onClick}
        aria-label="Open music player"
        whileTap={{ scale: 0.88 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: isPlaying
            ? "linear-gradient(145deg, #d97706 0%, #b85c00 100%)"
            : "rgba(30, 2, 2, 0.82)",
          border: isPlaying
            ? "2px solid rgba(245,158,11,0.7)"
            : "1.5px solid rgba(217,119,6,0.45)",
          boxShadow: isPlaying
            ? "0 0 0 4px rgba(217,119,6,0.18), 0 4px 18px rgba(0,0,0,0.55)"
            : "0 2px 14px rgba(0,0,0,0.55), 0 0 0 3px rgba(217,119,6,0.08)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Shine overlay — iOS glass feel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* iOS "Updates" curved arrow SVG icon */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Musical notes — small double note mark */}
          <path
            d="M10.5 18.5V10l9-2v8"
            stroke={isPlaying ? "#1a0000" : "#f59e0b"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="8.5"
            cy="18.5"
            r="2.2"
            stroke={isPlaying ? "#1a0000" : "#f59e0b"}
            strokeWidth="1.8"
            fill="none"
          />
          <circle
            cx="17.5"
            cy="16.5"
            r="2.2"
            stroke={isPlaying ? "#1a0000" : "#f59e0b"}
            strokeWidth="1.8"
            fill="none"
          />
        </svg>

        {/* Playing pulse ring */}
        {isPlaying && (
          <span
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: "50%",
              border: "2px solid rgba(245,158,11,0.45)",
              animation: "ios-pulse-ring 2s ease-out infinite",
              pointerEvents: "none",
            }}
          />
        )}
      </motion.button>

      {/* "Music" label */}
      <span
        style={{
          fontSize: 10,
          fontFamily: "system-ui, -apple-system, 'SF Pro Text', sans-serif",
          fontWeight: 500,
          color: isPlaying ? "#f59e0b" : "rgba(255,200,100,0.65)",
          letterSpacing: "0.05em",
          userSelect: "none",
        }}
      >
        Music
      </span>
    </div>
  );
}

// ─── Full expanded player panel ───────────────────────────────────────────────
function PlayerPanel({ state, onClose, pulseIn }) {
  const { isPlaying, isDucked, currentIndex, track } = state;
  const [showPlaylist, setShowPlaylist] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{
        opacity: pulseIn ? [0, 1, 0.82, 1] : 1,
        y: 0,
        scale: 1,
      }}
      exit={{ opacity: 0, y: 14, scale: 0.93 }}
      transition={{
        duration: pulseIn ? 2.2 : 0.35,
        ease: pulseIn ? [0.22, 1, 0.36, 1] : "easeOut",
        opacity: pulseIn
          ? { duration: 2.5, times: [0, 0.3, 0.65, 1] }
          : { duration: 0.3 },
      }}
      style={{
        position: "absolute",
        bottom: "100%",
        left: 0,
        marginBottom: 10,
        width: 264,
        borderRadius: 20,
        overflow: "hidden",
        background: "rgba(22, 2, 2, 0.92)",
        border: "1px solid rgba(217,119,6,0.38)",
        boxShadow:
          "0 0 0 1px rgba(217,119,6,0.08), 0 20px 50px rgba(0,0,0,0.75), 0 0 32px rgba(217,119,6,0.12)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        fontFamily: "system-ui, -apple-system, 'SF Pro Text', sans-serif",
      }}
    >
      {/* ── Playlist drawer ── */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden", borderBottom: "1px solid rgba(217,119,6,0.12)" }}
          >
            <div
              className="px-4 py-2.5 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(217,119,6,0.1)" }}
            >
              <div className="flex items-center gap-2">
                <Music size={11} style={{ color: "#d97706" }} />
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(217,119,6,0.75)", fontWeight: 600 }}>
                  Playlist
                </p>
              </div>
              <p style={{ fontSize: 11, color: "rgba(217,119,6,0.35)" }}>{PLAYLIST.length} tracks</p>
            </div>

            <div style={{ maxHeight: 180, overflowY: "auto", scrollbarWidth: "none" }}>
              {PLAYLIST.map((t, i) => (
                <button
                  key={i}
                  onClick={() => audioManager.setTrack(i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "9px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: i === currentIndex ? "rgba(217,119,6,0.1)" : "transparent",
                    border: "none",
                    borderLeft: `3px solid ${i === currentIndex ? "#d97706" : "transparent"}`,
                    cursor: "pointer",
                  }}
                >
                  <div style={{ width: 18, flexShrink: 0 }}>
                    {i === currentIndex && isPlaying ? (
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 14 }}>
                        {[0, 1, 2].map((b) => (
                          <div key={b} style={{
                            width: 3, borderRadius: 2, background: "#d97706",
                            animation: `eq-bar ${0.6 + b * 0.2}s ease-in-out infinite alternate`,
                            height: `${50 + b * 25}%`,
                          }} />
                        ))}
                      </div>
                    ) : (
                      <span style={{ fontSize: 11, color: i === currentIndex ? "#d97706" : "rgba(255,255,255,0.2)" }}>
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                    )}
                  </div>
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <p style={{ fontSize: 12, fontWeight: 500, color: i === currentIndex ? "#fff" : "rgba(255,255,255,0.55)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {t.title}
                    </p>
                    <p style={{ fontSize: 11, color: "rgba(217,119,6,0.45)", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {t.artist}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top bar: playlist toggle + close ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: "1px solid rgba(217,119,6,0.1)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <button
          onClick={() => setShowPlaylist((p) => !p)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}
        >
          <Music size={12} style={{ color: "#d97706" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(217,119,6,0.7)", fontWeight: 600 }}>
            Sacred Playlist
          </span>
          {showPlaylist
            ? <ChevronDown size={12} style={{ color: "rgba(217,119,6,0.45)" }} />
            : <ChevronUp size={12} style={{ color: "rgba(217,119,6,0.45)" }} />
          }
        </button>

        {/* iOS-style close pill */}
        <button
          onClick={onClose}
          aria-label="Collapse player"
          style={{
            width: 28,
            height: 18,
            borderRadius: 9,
            background: "rgba(255,255,255,0.1)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChevronDown size={12} style={{ color: "rgba(255,255,255,0.5)" }} />
        </button>
      </div>

      {/* ── Track info ── */}
      <div style={{ padding: "12px 14px 8px" }}>
        {isDucked && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <VolumeX size={11} style={{ color: "rgba(217,119,6,0.5)" }} />
            <span style={{ fontSize: 11, fontStyle: "italic", color: "rgba(217,119,6,0.5)" }}>
              Ducked — video playing
            </span>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: isPlaying ? "#f59e0b" : "rgba(217,119,6,0.3)",
            boxShadow: isPlaying ? "0 0 7px #f59e0b" : "none",
            animation: isPlaying ? "player-dot-pulse 1.8s ease-in-out infinite" : "none",
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(217,119,6,0.5)" }}>
            {isPlaying ? (isDucked ? "Soft" : "Now Playing") : "Paused"}
          </span>
        </div>

        <Marquee text={track?.title ?? "—"} active={isPlaying} />
        <p style={{ fontSize: 11, marginTop: 2, color: "rgba(217,119,6,0.52)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {track?.artist ?? ""}
        </p>
      </div>

      {/* Progress */}
      <div style={{ padding: "0 14px 8px" }}>
        <ProgressBar isPlaying={isPlaying} />
      </div>

      {/* ── Controls ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 14px 14px" }}>
        {/* Prev */}
        <button
          onClick={() => audioManager.prev()}
          aria-label="Previous track"
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.2)",
            color: "#d97706", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <SkipBack size={14} fill="currentColor" strokeWidth={0} />
        </button>

        {/* Play/Pause */}
        <motion.button
          onClick={() => audioManager.toggle()}
          whileTap={{ scale: 0.88 }}
          aria-label={isPlaying ? "Pause" : "Play"}
          style={{
            width: 50, height: 50, borderRadius: "50%",
            background: isPlaying
              ? "linear-gradient(145deg, #d97706, #f59e0b)"
              : "linear-gradient(145deg, #6b0000, #8b0000)",
            border: "none", cursor: "pointer",
            boxShadow: isPlaying ? "0 0 20px rgba(217,119,6,0.5)" : "none",
            color: isPlaying ? "#1a0000" : "#d97706",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {isPlaying
            ? <Pause size={18} fill="currentColor" strokeWidth={0} />
            : <Play size={18} fill="currentColor" strokeWidth={0} style={{ marginLeft: 2 }} />
          }
        </motion.button>

        {/* Next */}
        <button
          onClick={() => audioManager.next()}
          aria-label="Next track"
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.2)",
            color: "#d97706", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <SkipForward size={14} fill="currentColor" strokeWidth={0} />
        </button>
      </div>

      {/* Track counter */}
      <div style={{ textAlign: "center", padding: "8px 0 10px", borderTop: "1px solid rgba(217,119,6,0.1)" }}>
        <span style={{ fontSize: 11, color: "rgba(217,119,6,0.35)" }}>
          {currentIndex + 1} / {PLAYLIST.length} · 🔥 Adamimogo
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main floating music controller ──────────────────────────────────────────
export default function MusicPlayer() {
  const [state, setState] = useState(getState());
  const [expanded, setExpanded] = useState(false);
  const [pulseIn, setPulseIn] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const unsub = subscribe((s) => setState(s));
    return unsub;
  }, []);

  // Delay appearance so it doesn't clash with page load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!expanded) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [expanded]);

  const handleOpen = () => {
    setExpanded(true);
    setPulseIn(true);
    // Reset pulseIn flag after animation completes
    setTimeout(() => setPulseIn(false), 2800);
  };

  if (!visible) return null;

  const { isPlaying } = state;

  return (
    <>
      <motion.div
        ref={containerRef}
        className="fixed z-40"
        style={{ bottom: 24, left: 24, position: "fixed" }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Expanded panel */}
        <AnimatePresence>
          {expanded && (
            <PlayerPanel
              state={state}
              onClose={() => setExpanded(false)}
              pulseIn={pulseIn}
            />
          )}
        </AnimatePresence>

        {/* Collapsed iOS icon */}
        <AnimatePresence>
          {!expanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.25 }}
            >
              <IOSMusicIcon isPlaying={isPlaying} onClick={handleOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(0); }
          80%  { transform: translateX(calc(-100% + 200px)); }
          100% { transform: translateX(calc(-100% + 200px)); }
        }
        @keyframes player-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }
        @keyframes eq-bar {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
        @keyframes ios-pulse-ring {
          0%   { transform: scale(1); opacity: 0.7; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </>
  );
}
