import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Radio, Play, Square, Loader } from "lucide-react";
import { MEDIA_PAUSE_EVENT, pauseOtherMedia } from "@/lib/audioManager";

// Animated frequency wave background
function FrequencyWaves() {
  const lines = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((i) => (
        <div
          key={i}
          className="absolute left-0 right-0"
          style={{
            top: `${10 + i * 11}%`,
            height: "1px",
            background: `rgba(245,158,11,${0.06 + (i % 3) * 0.04})`,
            animation: `frequency-wave ${2.5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

const stations = [
  {
    freq: "93.1 FM",
    city: "Lagos",
    streamUrl: "https://stream.zeno.fm/sywy4vua6zhvv",
    comingSoon: false,
  },
  {
    freq: "105.1 FM",
    city: "Ibadan",
    streamUrl: "https://stream.zeno.fm/c8xmldkzb0wuv",
    comingSoon: false,
  },
  {
    freq: "107.7 FM",
    city: "Ido-Ekiti",
    streamUrl: "https://stream.zeno.fm/azkbwck6y98uv",
    comingSoon: false,
  },
  {
    freq: "103.1 FM",
    city: "Abeokuta",
    streamUrl: "https://stream.zeno.fm/jnoqkv2xrryuv",
    comingSoon: false,
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function AdamimogoFM() {
  const [playingStation, setPlayingStation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const handlePauseEvent = (event) => {
      if (event.detail?.source !== "radio" && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        setPlayingStation(null);
        setLoading(false);
      }
    };

    window.addEventListener(MEDIA_PAUSE_EVENT, handlePauseEvent);
    return () => window.removeEventListener(MEDIA_PAUSE_EVENT, handlePauseEvent);
  }, []);

  const handlePlay = (station) => {
    setError(null);
    pauseOtherMedia("radio");

    // Stop if same station clicked
    if (playingStation?.city === station.city) {
      audioRef.current.pause();
      audioRef.current.src = "";
      setPlayingStation(null);
      setLoading(false);
      return;
    }

    // Switch to new station
    setLoading(true);
    setPlayingStation(station);
    audioRef.current.src = station.streamUrl;
    audioRef.current.load();
    audioRef.current
      .play()
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setError(`Could not connect to ${station.city} stream. Try again.`);
        setPlayingStation(null);
      });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#2d0d0d" }}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Frequency waves */}
      <FrequencyWaves />

      {/* Top glow line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #f59e0b, transparent)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section label */}
        <motion.p
          className="text-center text-xs tracking-[0.4em] uppercase mb-5 font-medium"
          style={{ color: "#f59e0b" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          The Voice of the Light
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-serif text-center font-bold mb-3"
          style={{
            color: "#ffffff",
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            fontFamily: "Georgia, serif",
            textShadow:
              "0 0 30px rgba(245,158,11,0.4), 0 0 60px rgba(245,158,11,0.2)",
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Adamimogo FM
        </motion.h2>

        {/* Amber underline */}
        <motion.div
          className="mx-auto mb-4"
          style={{
            width: 80,
            height: 3,
            background:
              "linear-gradient(90deg, transparent, #f59e0b, transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Subtitle */}
        <motion.p
          className="italic text-center text-lg mb-8"
          style={{
            color: "rgba(255,255,255,0.55)",
            fontFamily: "Georgia, serif",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Spreading the Gospel across the airwaves of Nigeria
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-full h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, #f59e0b, transparent)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />

        {/* Now Playing Banner */}
        {playingStation && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 rounded-xl p-4 flex items-center gap-3"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.35)",
            }}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: "#ef4444",
                boxShadow: "0 0 6px #ef4444",
                animation: "pulse 1.5s infinite",
              }}
            />
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#f59e0b" }}
            >
              🎙 LIVE — Adamimogo {playingStation.freq} {playingStation.city}
            </span>
            {loading && (
              <Loader
                size={14}
                className="animate-spin ml-auto flex-shrink-0"
                style={{ color: "#f59e0b" }}
              />
            )}
          </motion.div>
        )}

        {/* Error message */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm mb-6 italic"
            style={{ color: "#f87171" }}
          >
            ⚠️ {error}
          </motion.p>
        )}

        {/* Station Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {stations.map((s, i) => {
            const isPlaying = playingStation?.city === s.city;

            return (
              <motion.div
                key={i}
                className="relative rounded-xl p-8 flex items-center justify-between"
                style={{
                  background: isPlaying
                    ? "rgba(245,158,11,0.18)"
                    : "rgba(107,0,0,0.6)",
                  borderLeft: `4px solid ${isPlaying ? "#f59e0b" : "#5c1a1a"}`,
                  border: isPlaying
                    ? "1px solid rgba(245,158,11,0.5)"
                    : "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  boxShadow: isPlaying
                    ? "0 0 30px rgba(245,158,11,0.25), 0 0 60px rgba(245,158,11,0.1)"
                    : "none",
                }}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 0 28px rgba(245,158,11,0.3), 0 0 56px rgba(245,158,11,0.15)",
                }}
                onClick={() => handlePlay(s)}
              >
                {/* Left — Frequency & City */}
                <div>
                  <div
                    className="font-bold mb-1"
                    style={{
                      color: isPlaying ? "#f59e0b" : "#f59e0b",
                      fontSize: "clamp(2rem, 5vw, 3rem)",
                      fontFamily: "Georgia, serif",
                      lineHeight: 1,
                      textShadow: isPlaying
                        ? "0 0 20px rgba(245,158,11,0.6)"
                        : "none",
                    }}
                  >
                    {s.freq}
                  </div>
                  <p
                    className="font-semibold text-base"
                    style={{
                      color: isPlaying ? "#ffffff" : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {s.city}
                  </p>
                  <div
                    className="mt-2"
                    style={{
                      color: isPlaying
                        ? "rgba(245,158,11,0.7)"
                        : "rgba(245,158,11,0.25)",
                    }}
                  >
                    <Radio size={16} />
                  </div>
                </div>

                {/* Right — Play/Stop Button */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isPlaying ? "#f59e0b" : "rgba(245,158,11,0.15)",
                    border: "1px solid rgba(245,158,11,0.4)",
                    transition: "all 0.3s",
                  }}
                >
                  {loading && isPlaying ? (
                    <Loader
                      size={16}
                      className="animate-spin"
                      style={{ color: isPlaying ? "#1a0a0a" : "#f59e0b" }}
                    />
                  ) : isPlaying ? (
                    <Square
                      size={14}
                      fill="#1a0a0a"
                      style={{ color: "#1a0a0a" }}
                    />
                  ) : (
                    <Play
                      size={14}
                      fill="#f59e0b"
                      style={{ color: "#f59e0b" }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          className="italic text-center text-sm mt-12"
          style={{
            color: "rgba(245,158,11,0.45)",
            fontFamily: "Georgia, serif",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Adamimogo FM — A voice that carries the anointing
        </motion.p>
      </div>
    </section>
  );
}
