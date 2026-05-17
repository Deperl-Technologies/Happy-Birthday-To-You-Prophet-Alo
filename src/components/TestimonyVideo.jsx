import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Video } from "lucide-react";
import audioManager from "@/lib/audioManager";

/**
 * Replace each videoId with the real YouTube video ID.
 * e.g. "dQw4w9WgXcQ" from https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *
 * NOTE: ?enablejsapi=1 is appended so YouTube sends postMessage state events.
 * The global audioManager ducks background music while any video is playing.
 */
const videos = [
  {
    videoId: "YOUR_VIDEO_ID_1",
    title: "A Cancer Healed",
    location: "Lagos, Nigeria",
    desc: "Sister Blessing testifies of miraculous healing after prayers at the Prayer Mountain.",
  },
  {
    videoId: "YOUR_VIDEO_ID_2",
    title: "From Prison to Purpose",
    location: "Ibadan, Nigeria",
    desc: "Brother Emmanuel recounts how the prophet's word changed the trajectory of his life.",
  },
  {
    videoId: "YOUR_VIDEO_ID_3",
    title: "My Business Restored",
    location: "Dagenham, London",
    desc: "Sister Adeola shares how God turned around her failing business after a prophetic encounter.",
  },
  {
    videoId: "YOUR_VIDEO_ID_4",
    title: "A Barren Womb Opened",
    location: "Toronto, Canada",
    desc: "After 12 years, God answered through the prophet's intercession — twins now fill their home.",
  },
  {
    videoId: "YOUR_VIDEO_ID_5",
    title: "Finland's First Miracle",
    location: "Finland",
    desc: "The first convert in Finland tells the story of encountering the fire of God for the first time.",
  },
  {
    videoId: "YOUR_VIDEO_ID_6",
    title: "A Family Reunited",
    location: "Abeokuta, Nigeria",
    desc: "A family torn apart for 8 years walked back through the same doors — united by one prayer.",
  },
];

// YouTube IFrame postMessage state values
const YT_PLAYING = 1;
const YT_PAUSED = 2;
const YT_ENDED = 0;

function VideoCard({ v, index, iframeId }) {
  const [playing, setPlaying] = useState(false);
  const isDuckedRef = useRef(false);

  // When this card starts playing, duck music. When removed from DOM, restore.
  const handlePlay = () => {
    setPlaying(true);
    audioManager.duckMusic();
    isDuckedRef.current = true;
  };

  // If the card unmounts while playing, restore
  useEffect(() => {
    return () => {
      if (isDuckedRef.current) {
        audioManager.restoreMusic();
        isDuckedRef.current = false;
      }
    };
  }, []);

  return (
    <motion.div
      className="rounded-xl overflow-hidden group cursor-pointer"
      style={{ background: "#3d0000", border: "1px solid rgba(217,119,6,0.25)" }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 0 28px rgba(217,119,6,0.3), 0 0 56px rgba(217,119,6,0.12)" }}
    >
      {/* Video area 16:9 */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {playing ? (
          <iframe
            id={iframeId}
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
            title={v.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
            style={{ background: "radial-gradient(ellipse at center, #4a0000 0%, #1a0000 80%)" }}
            onClick={handlePlay}
            role="button"
            aria-label={`Play testimony: ${v.title}`}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "radial-gradient(ellipse at center, rgba(217,119,6,0.1) 0%, transparent 70%)" }}
            />
            <div
              className="flex items-center justify-center rounded-full mb-3 transition-transform duration-300 group-hover:scale-110"
              style={{
                width: 52,
                height: 52,
                background: "linear-gradient(135deg, #d97706, #f59e0b)",
                boxShadow: "0 0 20px rgba(217,119,6,0.5)",
              }}
            >
              <Play size={20} fill="#1a0000" strokeWidth={0} style={{ marginLeft: 3 }} />
            </div>
            <div className="text-lg mb-1 opacity-50" style={{ filter: "drop-shadow(0 0 6px #d97706)" }}>
              🔥
            </div>
            <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(217,119,6,0.6)" }}>
              Testimony Video
            </p>
          </div>
        )}
      </div>

      {/* Card info */}
      <div className="p-4">
        <p className="text-xs tracking-[0.2em] uppercase mb-1 font-medium" style={{ color: "#d97706" }}>
          📍 {v.location}
        </p>
        <h3
          className="font-serif font-bold mb-2"
          style={{
            color: "#ffffff",
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: "clamp(1rem, 3vw, 1.15rem)",
          }}
        >
          {v.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
          {v.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function TestimonyVideo() {
  const sectionRef = useRef(null);

  // Listen for YouTube postMessage events to duck/restore music precisely
  useEffect(() => {
    const handleMessage = (e) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.event === "onStateChange") {
          if (data.info === 1 /* playing */) {
            audioManager.duckMusic();
          } else if (data.info === 2 || data.info === 0 /* paused or ended */) {
            audioManager.restoreMusic();
          }
        }
      } catch (_) {}
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // When section scrolls fully out of view, force-restore music
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            audioManager.forceRestoreMusic();
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#1a0000" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, rgba(217,119,6,0.07) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #d97706, transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.p
          className="text-center text-xs tracking-[0.4em] uppercase mb-5 font-medium"
          style={{ color: "#d97706" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          The Fire Spread · Lives Forever Changed
        </motion.p>

        <motion.h2
          className="font-serif text-center font-bold mb-3"
          style={{
            color: "#ffffff",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontFamily: "'EB Garamond', Georgia, serif",
            textShadow: "0 0 40px rgba(217,119,6,0.35)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Testimonies of Impact
        </motion.h2>

        <motion.div
          className="mx-auto mb-4"
          style={{ width: 90, height: 3, background: "linear-gradient(90deg, transparent, #d97706, transparent)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2 }}
        />

        <motion.p
          className="font-serif italic text-center text-lg mb-8"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'EB Garamond', Georgia, serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Across nations, one anointing — one prophet — one transforming fire
        </motion.p>

        <motion.div
          className="w-full h-px mb-12"
          style={{ background: "linear-gradient(90deg, transparent, #d97706, transparent)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((v, i) => (
            <VideoCard key={i} v={v} index={i} iframeId={`testimony-yt-${i}`} />
          ))}
        </div>

        <motion.div
          className="flex items-center justify-center gap-2 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Video size={14} style={{ color: "rgba(217,119,6,0.45)" }} />
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "rgba(217,119,6,0.45)" }}>
            Replace YOUR_VIDEO_ID_* in TestimonyVideo.jsx with real YouTube video IDs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
