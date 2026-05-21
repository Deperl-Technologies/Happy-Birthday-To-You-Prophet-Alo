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
  {
    name: "Sister Joy Adebayo",
    branch: "Adamimogo Grace Assembly, Abeokuta",
    location: "Abeokuta, Nigeria",
    text: "My marriage was collapsing and my home had become a battlefield. During a Sunday service, the prophet prayed and declared peace over our family. Within weeks, the bitterness broke, my husband returned, and our home became calm again. Today we serve together in church. God restored what looked impossible.",
  },
  {
    name: "Brother Michael Afolabi",
    branch: "CAC Grace of Mercy, Lagos",
    location: "Surulere, Nigeria",
    text: "For years I struggled with unemployment and shame. I attended one of Prophet Sam's revival nights and received a simple word: 'Prepare, doors are opening.' The very next week, the interview call came. Today I work in a role I once prayed for. I know that word came from God.",
  },
  {
    name: "Deaconess Esther Nwosu",
    branch: "CAC Grace of Mercy, Ibadan",
    location: "Ibadan, Nigeria",
    text: "I used to battle recurring nightmares and fear every night. After prayers from the man of God, the torment stopped completely. I sleep in peace now. My children also began to experience peace in the house. What prayer could not fix, God fixed through His servant.",
  },
  {
    name: "Brother Daniel Akinyemi",
    branch: "Adamimogo Worldwide Youth",
    location: "Lagos, Nigeria",
    text: "I was full of anger and heading down the wrong path. Prophet Sam's counsel and fatherly correction saved me. He did not condemn me; he pointed me back to destiny. That one encounter changed my direction, and today I'm in school, serving God, and mentoring others.",
  },
  {
    name: "Sister Deborah Mensah",
    branch: "CAC Grace of Mercy, Toronto",
    location: "Toronto, Canada",
    text: "I came to Canada with a childlike prayer and no clear future. The prophet spoke over my life and said I would build and not beg. That word kept me going through hard seasons. Today I own a small business and support other women in our congregation. God truly establishes His word.",
  },
  {
    name: "Pastor Joshua Ige",
    branch: "Adamimogo School of Prayer",
    location: "Lagos, Nigeria",
    text: "The fire of prayer I carry today was born under Prophet Sam's teaching. He taught us to tarry, to listen, and to obey the Spirit. Many people can preach about prayer, but he models it. My life and ministry now have a depth they never had before.",
  },
  {
    name: "Sister Nneka Udo",
    branch: "CAC Grace of Mercy, Finland",
    location: "Helsinki, Finland",
    text: "When I first joined the Finnish fellowship, I was lonely and far from home. Prophet Sam's word and pastoral care made me feel seen. I found family, faith, and purpose again. That small church in a cold land became the place where my heart was healed.",
  },
  {
    name: "Brother Taiwo Oladipo",
    branch: "Adamimogo FM Listener",
    location: "Abeokuta, Nigeria",
    text: "I was not even attending church regularly when I started listening to Adamimogo FM in my car. The songs, prayers, and messages softened my heart. Eventually I returned fully to God. It was like the radio became an altar for me.",
  },
  {
    name: "Sister Bimpe Afolayan",
    branch: "CAC Grace of Mercy, Port Harcourt",
    location: "Port Harcourt, Nigeria",
    text: "I had lived with chronic fear after losing my first child, and I could barely sleep through the night. During prayer, Prophet Sam spoke peace over me and prayed with such tenderness that I knew God had heard. The panic left gradually, and for the first time in years I began sleeping without medication.",
  },
  {
    name: "Brother Kelechi Nwankwo",
    branch: "Adamimogo Grace Assembly, Enugu",
    location: "Enugu, Nigeria",
    text: "I came into the service carrying a small business that was collapsing under debt. After prayers and counsel, I started making decisions with clarity instead of fear. Within months, the business stabilized and I was able to pay workers again. That season taught me not to despise spiritual direction.",
  },
  {
    name: "Deaconess Titilayo Ogunleye",
    branch: "CAC Grace of Mercy, Akure",
    location: "Akure, Nigeria",
    text: "My husband and I had been separated for almost a year, and our children were asking questions I could not answer. Prophet Sam's message on restoration convicted both of us deeply. We reconciled quietly, and by the next Sunday we were back in church together. Our home is peaceful again.",
  },
  {
    name: "Brother Samuel Anjorin",
    branch: "Adamimogo Worldwide Youth",
    location: "Ibadan, Nigeria",
    text: "I was struggling with school and carrying a lot of bitterness. One altar call changed something in me. The prophet spoke to me like a father, not like a stranger, and I went home determined to do better. My grades improved, and more importantly, my heart changed.",
  },
  {
    name: "Sister Folasade Adekunle",
    branch: "CAC Grace of Mercy, Manchester",
    location: "Manchester, United Kingdom",
    text: "I joined the fellowship in Manchester after moving abroad and feeling completely out of place. The church family welcomed me, but it was the consistent prophetic words and prayers that steadied me. I found community, direction, and a renewed desire to serve God where I was planted.",
  },
  {
    name: "Pastor Emmanuel Ojo",
    branch: "Adamimogo School of Prayer",
    location: "Lagos, Nigeria",
    text: "I came to the School of Prayer as someone who knew how to preach but not how to wait on God. Under Prophet Sam's teaching, my devotional life deepened in a way I had never experienced before. My ministry became quieter, stronger, and more fruitful.",
  },
  {
    name: "Sister Morenike Adejumo",
    branch: "CAC Grace of Mercy, Ido-Ekiti",
    location: "Ido-Ekiti, Nigeria",
    text: "My son had been battling repeated sickness and we had spent so much money on treatments. After a prayer meeting at the branch, the family began to experience remarkable peace and the attacks stopped. We returned with thanksgiving because God truly visited us.",
  },
  {
    name: "Brother Kingsley Eze",
    branch: "Adamimogo FM Listener",
    location: "Lagos, Nigeria",
    text: "I first heard the messages while driving late at night, and I could not ignore how direct they were. The preaching challenged me to stop living carelessly and return to God with sincerity. Today I still listen, and the broadcasts continue to strengthen me week by week.",
  },
  {
    name: "Deaconess Rita Williams",
    branch: "CAC Grace of Mercy, Toronto",
    location: "Toronto, Canada",
    text: "When I relocated to Canada, I had to rebuild my life from the ground up. The ministry gave me a spiritual home, but Prophet Sam's words gave me courage. I found work, made friends, and learned that God can establish a person even far from familiar soil.",
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
      style={{ background: "transparent" }}
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
          className="font-serif text-center font-bold mb-3 hero-text-glow"
          style={{
            color: "#f5f0eb",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontFamily: "'EB Garamond', Georgia, serif",
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
