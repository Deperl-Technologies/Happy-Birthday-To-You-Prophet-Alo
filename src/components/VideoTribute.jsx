import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import audioManager, { MEDIA_PAUSE_EVENT, pauseOtherMedia } from "@/lib/audioManager";

/**
 * TikTok video embed — "A Voice That Shakes the Heavens"
 * Video: https://www.tiktok.com/@cacpower.househq/video/7508159242742861061
 *
 * Uses TikTok's official Player API (https://www.tiktok.com/player/v1/{VIDEO_ID})
 * Music ducks when the video plays and restores when paused/ended.
 */
const TIKTOK_VIDEO_ID = "7508159242742861061";

export default function VideoTribute() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const handleMessage = (e) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.type === "onStateChange" || data?.event === "onStateChange") {
          const state = data?.value ?? data?.info;
          if (state === "playing" || state === 1) {
            pauseOtherMedia("tiktok");
            audioManager.duckMusic();
            setPlaying(true);
          } else if (
            state === "paused" ||
            state === "ended" ||
            state === 2 ||
            state === 0
          ) {
            audioManager.restoreMusic();
          }
        }
      } catch (_) {}
    };

    const handlePauseEvent = (event) => {
      if (event.detail?.source !== "tiktok") {
        setPlaying(false);
      }
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener(MEDIA_PAUSE_EVENT, handlePauseEvent);
    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener(MEDIA_PAUSE_EVENT, handlePauseEvent);
    };
  }, []);

  const handlePlay = () => {
    pauseOtherMedia("tiktok");
    setPlaying(true);
    audioManager.duckMusic();
  };

  const tiktokSrc =
    `https://www.tiktok.com/player/v1/${TIKTOK_VIDEO_ID}` +
    `?music_info=0&description=0&loop=0&controls=1&progress_bar=1&autoplay=1`;

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(217,119,6,0.09) 0%, rgba(139,0,0,0.06) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #d97706, transparent)",
        }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #d97706, transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.p
          className="text-center text-xs tracking-[0.4em] uppercase mb-5 font-medium"
          style={{ color: "#d97706" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          The Prophetic Voice · In His Own Words
        </motion.p>

        <motion.h2
          className="font-serif text-center font-bold mb-3"
          style={{
            color: "#ffffff",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontFamily: "'EB Garamond', Georgia, serif",
            textShadow:
              "0 0 40px rgba(217,119,6,0.4), 0 2px 6px rgba(0,0,0,0.9)",
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          A Voice That Shakes the Heavens
        </motion.h2>

        <motion.div
          className="mx-auto mb-4"
          style={{
            width: 90,
            height: 3,
            background:
              "linear-gradient(90deg, transparent, #d97706, transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2 }}
        />

        <motion.p
          className="font-serif italic text-center text-lg mb-8"
          style={{
            color: "rgba(255,255,255,0.55)",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          The anointing carried in one man's voice — a word that never returns
          void
        </motion.p>

        <motion.div
          className="w-full h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, #d97706, transparent)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />

        {/* Video Frame — portrait 9:16 centered */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
        >
          <div className="w-full" style={{ maxWidth: 380 }}>
            <div
              className="relative rounded-2xl p-1"
              style={{
                background:
                  "linear-gradient(135deg, #d97706, #8b0000, #f59e0b, #6b0000, #d97706)",
                boxShadow:
                  "0 0 40px rgba(217,119,6,0.35), 0 0 80px rgba(217,119,6,0.15), 0 0 6px rgba(245,158,11,0.6)",
                animation: "fire-ring-pulse 3s ease-in-out infinite",
              }}
            >
              <div
                className="relative rounded-xl overflow-hidden"
                style={{ background: "#0d0000" }}
              >
                {/* Corner ornaments */}
                {[
                  {
                    top: 0,
                    left: 0,
                    borderTop: "2px solid #d97706",
                    borderLeft: "2px solid #d97706",
                    borderRadius: "12px 0 0 0",
                  },
                  {
                    top: 0,
                    right: 0,
                    borderTop: "2px solid #d97706",
                    borderRight: "2px solid #d97706",
                    borderRadius: "0 12px 0 0",
                  },
                  {
                    bottom: 0,
                    left: 0,
                    borderBottom: "2px solid #d97706",
                    borderLeft: "2px solid #d97706",
                    borderRadius: "0 0 0 12px",
                  },
                  {
                    bottom: 0,
                    right: 0,
                    borderBottom: "2px solid #d97706",
                    borderRight: "2px solid #d97706",
                    borderRadius: "0 0 12px 0",
                  },
                ].map((style, i) => (
                  <div
                    key={i}
                    className="absolute w-8 h-8 z-20 pointer-events-none"
                    style={style}
                  />
                ))}

                {/* 9:16 portrait aspect ratio */}
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "177.78%" }}
                >
                  {playing ? (
                    <iframe
                      className="absolute top-1/2 left-1/2 block"
                      style={{
                        width: "140%",
                        height: "140%",
                        transform: "translate(-50%, -50%)",
                      }}
                      src={tiktokSrc}
                      title="Prophet Sam Olu Alo — Video Tribute"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, #3d0000 0%, #1a0000 70%, #0d0000 100%)",
                      }}
                      onClick={handlePlay}
                      role="button"
                      aria-label="Play video tribute"
                    >
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse at center, rgba(217,119,6,0.12) 0%, transparent 60%)",
                        }}
                      />
                      <div
                        className="text-4xl mb-5 opacity-60"
                        style={{ filter: "drop-shadow(0 0 12px #d97706)" }}
                      >
                        🔥
                      </div>
                      <div
                        className="relative flex items-center justify-center rounded-full mb-6 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          width: 80,
                          height: 80,
                          background:
                            "linear-gradient(135deg, #d97706, #f59e0b)",
                          boxShadow: "0 0 30px #d9770688, 0 0 60px #d9770633",
                        }}
                      >
                        <Play
                          size={28}
                          style={{ color: "#1a0000", marginLeft: 4 }}
                          fill="#1a0000"
                          strokeWidth={0}
                        />
                      </div>
                      <p
                        className="font-serif italic text-base md:text-lg"
                        style={{
                          color: "rgba(217,119,6,0.8)",
                          fontFamily: "'EB Garamond', Georgia, serif",
                        }}
                      >
                        Press Play — Hear the Prophet's Voice
                      </p>
                      <p
                        className="text-xs tracking-[0.2em] uppercase mt-2"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        Prophet Sam Olu Alo · Video Tribute
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="text-center text-sm mt-7 font-serif italic"
          style={{
            color: "rgba(217,119,6,0.55)",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          "Is not my word like fire," declares the LORD — Jeremiah 23:29
        </motion.p>
      </div>

      <style>{`
        @keyframes fire-ring-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(217,119,6,0.35), 0 0 80px rgba(217,119,6,0.15); }
          50%       { box-shadow: 0 0 60px rgba(245,158,11,0.55), 0 0 110px rgba(217,119,6,0.25); }
        }
      `}</style>
    </section>
  );
}
