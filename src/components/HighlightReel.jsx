import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import audioManager from "@/lib/audioManager";

/**
 * HIGHLIGHT REEL — Moments That Shook the Earth
 *
 * Audio is managed globally by audioManager (src/lib/audioManager.js).
 * The music player UI is the floating MusicPlayer component.
 * Set BACKGROUND_VIDEO_URL to a hosted MP4 for the slow-motion reel.
 */
const BACKGROUND_VIDEO_URL = ""; // e.g. "https://your-cdn.com/highlight-reel.mp4"

const highlights = [
  {
    year: "1990s",
    icon: "🔥",
    title: "The Birth of a Movement",
    category: "Founding Moment",
    desc: "Prophet Sam Olu Alo founded C.A.C Grace of Mercy Prayer Mountain — a prayer altar that would birth a global revival movement from the soil of Ekiti.",
  },
  {
    year: "Early 2000s",
    icon: "⛺",
    title: "Babalola Camp Transforms Thousands",
    category: "Historic Crusade",
    desc: "As Coordinator of the C.A.C Babalola Memorial International Camp at Ikeji Arakeji, tens of thousands gathered yearly. Healings. Deliverances. Nations changed.",
  },
  {
    year: "2005",
    icon: "🌍",
    title: "The European Mandate",
    category: "Global Expansion",
    desc: "Prophet Sam carried the fire across the Atlantic — establishing the first C.A.C assembly in Finland, then Dagenham (UK) and Toronto (Canada). Africa evangelised the world.",
  },
  {
    year: "2008",
    icon: "📻",
    title: "Adamimogo FM Goes Live",
    category: "Media Empire",
    desc: "93.1 FM Lagos went live. For the first time, millions heard the prophetic anointing on their radio sets. A media empire was born. The airwaves became an altar.",
  },
  {
    year: "2012",
    icon: "🎓",
    title: "School of Prayer Launched",
    category: "Training Sons & Daughters",
    desc: "The Adamimogo School of Prayer and Prophetic Ministry opened its doors — equipping a generation of prayer warriors, prophets and ministers across Nigeria and beyond.",
  },
  {
    year: "2015",
    icon: "🌾",
    title: "Feeding the Nations",
    category: "Charity & Community",
    desc: "The Adamimogo Farm and outreach ministry extended to the most vulnerable — widows, orphans, the poor and displaced. Over 10,000 families reached in annual outreaches.",
  },
  {
    year: "2018",
    icon: "⚽",
    title: "Adamimogo FC — Football as Revival",
    category: "Community Impact",
    desc: "A football club birthed from a prophetic vision — creating pathways for young men through sports, mentoring hundreds of youth away from crime and hopelessness.",
  },
  {
    year: "2020",
    icon: "🙏",
    title: "Pandemic Prayer Mountain Opens",
    category: "National Intercession",
    desc: "When COVID-19 shut the world, Prophet Sam opened the prayer mountain 24/7. Thousands streamed online. Nigeria prayed. The heavens answered.",
  },
  {
    year: "2024",
    icon: "📡",
    title: "Adamimogo FM Ibadan & Ido-Ekiti",
    category: "Radio Expansion",
    desc: "105.1 FM Ibadan and 107.7 FM Ido-Ekiti launched — deepening the media reach across Yorubaland. The prophet's voice now floods multiple cities simultaneously.",
  },
  {
    year: "2026",
    icon: "👑",
    title: "A Prophet Celebrated by Nations",
    category: "Birthday Tribute",
    desc: "On 25th May 2026, a world that has been touched, healed, delivered and transformed rises as one voice — to honour the man, the calling, and the God behind the fire.",
  },
];

function CinematicAtmosphere() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: "15%",
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, rgba(217,119,6,0.08), rgba(217,119,6,0.15), rgba(217,119,6,0.08), transparent)",
          animation: "beam-flicker 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-0 bottom-0"
        style={{
          right: "15%",
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, rgba(217,119,6,0.06), rgba(217,119,6,0.12), rgba(217,119,6,0.06), transparent)",
          animation: "beam-flicker 5s ease-in-out infinite reverse",
        }}
      />
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            background: i % 2 === 0 ? "#f59e0b" : "#d97706",
            left: `${8 + ((i * 7.5) % 85)}%`,
            bottom: `${5 + ((i * 9) % 40)}%`,
            opacity: 0.35,
            animation: `ember-rise ${5 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

export default function HighlightReel() {
  const sectionRef = useRef(null);

  // Auto-start music softly when this section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            audioManager.tryAutoPlay();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {BACKGROUND_VIDEO_URL && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={BACKGROUND_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          style={{ opacity: 0.18, filter: "saturate(0.6) sepia(0.4)" }}
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: BACKGROUND_VIDEO_URL
            ? "linear-gradient(to bottom, rgba(13,0,0,0.85) 0%, rgba(13,0,0,0.65) 50%, rgba(13,0,0,0.9) 100%)"
            : "radial-gradient(ellipse at 50% 30%, rgba(61,0,0,0.6) 0%, rgba(13,0,0,0.9) 70%)",
        }}
      />

      <CinematicAtmosphere />

      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }}
      />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.p
          className="text-center text-xs tracking-[0.4em] uppercase mb-5 font-medium"
          style={{ color: "#c9a84c" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Major Events · Programs · Outreaches · Milestones
        </motion.p>

        <motion.h2
          className="font-serif text-center font-bold mb-3 hero-text-glow"
          style={{
            color: "#f5f0eb",
            fontSize: "clamp(2.2rem, 6.5vw, 4.5rem)",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          Moments That Shook the Earth
        </motion.h2>

        <motion.div
          className="mx-auto mb-4"
          style={{
            width: 100,
            height: 3,
            background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />

        <motion.p
          className="font-serif italic text-center text-lg mb-8"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'EB Garamond', Georgia, serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          A cinematic journey through decades of divine purpose
        </motion.p>

        <motion.div
          className="w-full h-px mb-16"
          style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />

        {/* Timeline */}
        <div className="relative">
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #c9a84c55, #d9770644, #c9a84c55, transparent)",
            }}
          />

          <div className="flex flex-col gap-8 md:gap-12">
            {highlights.map((h, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className="relative flex items-center gap-0"
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: 0.05 * i, ease: "easeOut" }}
                >
                  {/* Desktop */}
                  <div
                    className={`hidden md:flex w-full items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div
                      className="w-5/12 rounded-2xl group transition-all duration-400"
                      style={{
                        background: "linear-gradient(160deg, #2a0000 0%, #1a0000 100%)",
                        border: "1px solid rgba(201,168,76,0.25)",
                        padding: "1.5rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 0 32px rgba(201,168,76,0.2), 0 0 64px rgba(217,119,6,0.1)";
                        e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
                      }}
                    >
                      <span
                        className="inline-block text-xs px-2 py-0.5 rounded-full mb-3 tracking-widest uppercase font-medium"
                        style={{
                          background: "rgba(217,119,6,0.15)",
                          color: "#d97706",
                          border: "1px solid rgba(217,119,6,0.3)",
                        }}
                      >
                        {h.category}
                      </span>
                      <h3
                        className="font-serif font-bold text-lg md:text-xl mb-2"
                        style={{ color: "#ffffff", fontFamily: "'EB Garamond', Georgia, serif" }}
                      >
                        {h.icon} {h.title}
                      </h3>
                      <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {h.desc}
                      </p>
                    </div>

                    <div className="w-2/12 flex flex-col items-center gap-1">
                      <div
                        className="rounded-full flex-shrink-0"
                        style={{
                          width: 16,
                          height: 16,
                          background: "#c9a84c",
                          border: "3px solid #f59e0b",
                          boxShadow: "0 0 16px rgba(201,168,76,0.7)",
                        }}
                      />
                      <span
                        className="text-xs font-bold tracking-wider"
                        style={{ color: "#c9a84c", whiteSpace: "nowrap" }}
                      >
                        {h.year}
                      </span>
                    </div>

                    <div className="w-5/12" />
                  </div>

                  {/* Mobile */}
                  <div
                    className="md:hidden w-full rounded-2xl"
                    style={{
                      background: "linear-gradient(160deg, #2a0000 0%, #1a0000 100%)",
                      border: "1px solid rgba(201,168,76,0.25)",
                      borderLeft: "4px solid #c9a84c",
                      padding: "1.25rem",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(201,168,76,0.15)",
                          color: "#c9a84c",
                          border: "1px solid rgba(201,168,76,0.3)",
                        }}
                      >
                        {h.year}
                      </span>
                      <span
                        className="text-xs tracking-widest uppercase"
                        style={{ color: "rgba(217,119,6,0.6)" }}
                      >
                        {h.category}
                      </span>
                    </div>
                    <h3
                      className="font-serif font-bold text-lg mb-2"
                      style={{ color: "#ffffff", fontFamily: "'EB Garamond', Georgia, serif" }}
                    >
                      {h.icon} {h.title}
                    </h3>
                    <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {h.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing scripture */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="text-4xl mb-4" style={{ filter: "drop-shadow(0 0 16px #c9a84c)" }}>
            ✨
          </div>
          <p
            className="font-serif italic text-lg md:text-xl"
            style={{ color: "#c9a84c", fontFamily: "'EB Garamond', Georgia, serif" }}
          >
            "The path of the righteous is like the morning sun, shining ever brighter till the full light of day."
          </p>
          <p
            className="text-xs mt-3 tracking-widest uppercase"
            style={{ color: "rgba(201,168,76,0.45)" }}
          >
            — Proverbs 4:18
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes beam-flicker {
          0%, 100% { opacity: 1; }
          45% { opacity: 0.5; }
          55% { opacity: 0.85; }
        }
        @keyframes ember-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.35; }
          50% { transform: translateY(-60px) scale(1.3); opacity: 0.55; }
          100% { transform: translateY(-120px) scale(0.8); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
