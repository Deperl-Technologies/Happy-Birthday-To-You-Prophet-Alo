import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Hardcoded seed testimonies ───────────────────────────────────────────────
// Replace or supplement with real Firebase data when ready
const SEED_TESTIMONIES = [
  {
    name: "Sister Adaeze Okafor",
    branch: "CAC Grace of Mercy HQ, Lagos",
    location: "Lagos, Nigeria",
    text: "I came to this prayer mountain as a broken woman — barren for 11 years, rejected by my husband's family, and on the edge of giving up. Prophet Sam Olu Alo called me out in a congregation of thousands, prayed over me, and declared: 'Your season of shame is over.' Today I am mother to three children. My God is faithful.",
  },
  {
    name: "Brother Kolade Adeyemi",
    branch: "Adamimogo Grace Assembly, Ibadan",
    location: "Ibadan, Nigeria",
    text: "I was a drug addict for 17 years. I came to the crusade ground not believing anything could change. The man of God looked straight at me from the pulpit and said 'The chains are broken tonight.' I felt something leave my body. I have been free for 6 years. Not one relapse. The anointing on this man is real.",
  },
  {
    name: "Deaconess Funke Alade",
    branch: "CAC Grace of Mercy, Dagenham",
    location: "London, United Kingdom",
    text: "We relocated to London with nothing — no job, no status, no hope. Our church branch in Dagenham became our family. Prophet Sam's prophetic word over our lives was specific: 'You will not beg bread in this land.' Within 60 days my husband had a job and our papers were approved. We never looked back.",
  },
  {
    name: "Pastor Tunde Badmus",
    branch: "CAC Grace of Mercy, Toronto",
    location: "Toronto, Canada",
    text: "I was sent out as a minister from this ministry with nothing but a word and a prayer. Prophet Sam laid hands on me in 2014 and said 'The God that sent me will provide for you.' Today I pastor a growing congregation in Toronto. Everything he declared has come to pass. He is a true father.",
  },
  {
    name: "Sister Maryam Adewale",
    branch: "CAC Grace of Mercy, Finland",
    location: "Helsinki, Finland",
    text: "When Prophet Sam first came to Finland, there was no CAC church here. He planted a seed in the cold of Scandinavia — a fire in a frozen land. I was one of the first converts. Fifteen years later, there is a generation of believers here who trace their faith back to one man who was bold enough to come.",
  },
  {
    name: "Brother Segun Olawale",
    branch: "Adamimogo School of Prayer",
    location: "Lagos, Nigeria",
    text: "The Adamimogo School of Prayer changed everything about how I understood intercession. For the first time in my life, I sat under a teacher who prayed like he was standing in God's very presence. Prophet Sam does not perform prayer — he enters it. That school turned me into a man of God.",
  },
  {
    name: "Elder Mrs. Grace Taiwo",
    branch: "CAC Babalola Memorial International Camp",
    location: "Ikeji Arakeji, Nigeria",
    text: "I attended the Babalola Memorial Camp for years before I truly encountered God. It was under Prophet Sam's coordination that the fire came down in a way I had never seen. I fell and could not rise for hours. When I stood, years of sickness had left my body. I am 74 years old and stronger than I was at 40.",
  },
  {
    name: "Pastor Emmanuel Obasi",
    branch: "Adamimogo Radio Ministry",
    location: "Ido-Ekiti, Nigeria",
    text: "Adamimogo FM 107.7 reached my village when I had no access to a church. I sat under Prophet Sam's radio broadcasts for two years before I ever met him. His voice carried something — an anointing that comes through frequencies. I gave my life to God listening to that radio. Now I lead others to do the same.",
  },
];

// Animated quote card
function TestimonyCard({ t }) {
  return (
    <motion.div
      key={t.name}
      className="relative rounded-2xl px-6 py-8 md:px-10 md:py-10 max-w-2xl mx-auto"
      style={{
        background: "linear-gradient(160deg, #3d0000 0%, #2a0000 100%)",
        border: "1px solid rgba(217,119,6,0.3)",
        boxShadow: "0 0 40px rgba(217,119,6,0.08)",
      }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      {/* Amber quote icon */}
      <div
        className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full"
        style={{
          width: 44,
          height: 44,
          background: "linear-gradient(135deg, #d97706, #f59e0b)",
          boxShadow: "0 0 20px rgba(217,119,6,0.5)",
        }}
      >
        <Quote size={18} fill="#1a0000" strokeWidth={0} style={{ color: "#1a0000" }} />
      </div>

      {/* Amber left border accent */}
      <div
        className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full"
        style={{ background: "linear-gradient(to bottom, #d97706, #8b0000)" }}
      />

      {/* Testimony text */}
      <p
        className="font-serif italic text-base md:text-lg leading-8 mb-6 mt-4 text-center"
        style={{
          color: "rgba(255,255,255,0.82)",
          fontFamily: "'EB Garamond', Georgia, serif",
          lineHeight: 1.85,
        }}
      >
        "{t.text}"
      </p>

      {/* Thin amber divider */}
      <div
        className="mx-auto mb-5"
        style={{
          width: 60,
          height: 1,
          background: "linear-gradient(90deg, transparent, #d97706, transparent)",
        }}
      />

      {/* Name, branch, location */}
      <div className="text-center">
        <p
          className="font-serif font-bold text-lg"
          style={{ color: "#ffffff", fontFamily: "'EB Garamond', Georgia, serif" }}
        >
          {t.name}
        </p>
        {t.branch && (
          <p className="text-xs font-medium mt-1" style={{ color: "#d97706" }}>
            {t.branch}
          </p>
        )}
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
          📍 {t.location}
        </p>
      </div>
    </motion.div>
  );
}

// Dot indicator
function DotNav({ total, current, onChange }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? 24 : 8,
            height: 8,
            background: i === current ? "#d97706" : "rgba(217,119,6,0.3)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label={`Testimony ${i + 1}`}
        />
      ))}
    </div>
  );
}

export default function WordTestimonies() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const total = SEED_TESTIMONIES.length;

  // Autoplay carousel
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(id);
  }, [autoplay, total]);

  const prev = () => {
    setAutoplay(false);
    setActive((p) => (p - 1 + total) % total);
  };
  const next = () => {
    setAutoplay(false);
    setActive((p) => (p + 1) % total);
  };

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#3d0000" }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(217,119,6,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Top amber line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #d97706, transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section label */}
        <motion.p
          className="text-center text-xs tracking-[0.4em] uppercase mb-5 font-medium"
          style={{ color: "#d97706" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          They Speak · Words From His Children
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-serif text-center font-bold mb-3"
          style={{
            color: "#ffffff",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontFamily: "'EB Garamond', Georgia, serif",
            textShadow: "0 0 30px rgba(217,119,6,0.3)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Encounters With the Man of God
        </motion.h2>

        {/* Amber underline */}
        <motion.div
          className="mx-auto mb-4"
          style={{
            width: 90,
            height: 3,
            background: "linear-gradient(90deg, transparent, #d97706, transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2 }}
        />

        {/* Subtitle */}
        <motion.p
          className="font-serif italic text-center text-lg mb-8"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          From every nation — hearts that were never the same again
        </motion.p>

        {/* Amber divider */}
        <motion.div
          className="w-full h-px mb-16"
          style={{ background: "linear-gradient(90deg, transparent, #d97706, transparent)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          {/* Card area */}
          <div className="relative pt-6">
            <AnimatePresence mode="wait">
              <TestimonyCard key={active} t={SEED_TESTIMONIES[active]} />
            </AnimatePresence>
          </div>

          {/* Nav buttons + dots */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: 44,
                height: 44,
                background: "rgba(217,119,6,0.12)",
                border: "1px solid rgba(217,119,6,0.3)",
                color: "#d97706",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(217,119,6,0.22)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(217,119,6,0.12)"}
              aria-label="Previous testimony"
            >
              <ChevronLeft size={20} />
            </button>

            <DotNav total={total} current={active} onChange={(i) => { setAutoplay(false); setActive(i); }} />

            <button
              onClick={next}
              className="flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: 44,
                height: 44,
                background: "rgba(217,119,6,0.12)",
                border: "1px solid rgba(217,119,6,0.3)",
                color: "#d97706",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(217,119,6,0.22)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(217,119,6,0.12)"}
              aria-label="Next testimony"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Counter */}
          <p className="text-center text-xs mt-5 tracking-widest uppercase" style={{ color: "rgba(217,119,6,0.4)" }}>
            {active + 1} of {total} testimonies
          </p>
        </motion.div>

        {/* Scripture */}
        <motion.p
          className="font-serif italic text-center text-base md:text-lg mt-16"
          style={{
            color: "rgba(217,119,6,0.65)",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          "They shall come and declare His righteousness" — Psalm 22:31
        </motion.p>
      </div>
    </section>
  );
}
