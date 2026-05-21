import { motion } from "framer-motion";

const locations = [
  {
    flag: "🇳🇬",
    city: "Lagos",
    country: "NIGERIA",
    desc: "International Headquarters — Ogombo, Ikotun, Adamimogo Jesus City, Ikorodu",
  },
  {
    flag: "🇳🇬",
    city: "Ibadan",
    country: "Nigeria",
    desc: "Adamimogo Grace Assembly — A blazing light in the ancient city",
  },
  {
    flag: "🇳🇬",
    city: "Ido-Ekiti",
    country: "Nigeria",
    desc: "The Root & Home — Where the prophet's destiny began",
  },
  {
    flag: "🇳🇬",
    city: "Akure",
    country: "NIGERIA",
    desc: "After Orange FM, Shagari Village, Irese Road — the anointing lights up Ondo State.",
  },
  {
    flag: "🇳🇬",
    city: "Ado Ekiti",
    country: "NIGERIA",
    desc: "Iworoko Road — a return to roots, carrying fire back to Ekiti soil.",
  },
  {
    flag: "🇳🇬",
    city: "Abeokuta",
    country: "Nigeria",
    desc: "Growing Assembly — The fire spreads to the capital of Ogun",
  },
  {
    flag: "🇬🇧",
    city: "Dagenham, London",
    country: "United Kingdom",
    desc: "C.A.C Grace of Mercy UK — The anointing reaches Great Britain",
  },
  {
    flag: "🇨🇦",
    city: "Toronto",
    country: "Canada",
    desc: "C.A.C Grace of Mercy Canada — Fire from Africa burns in the North",
  },
  {
    flag: "🇫🇮",
    city: "Finland",
    country: "Scandinavia",
    desc: "First C.A.C ever planted in Finland — A historic breakthrough",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.09, ease: "easeOut" },
  }),
};

export default function TheEmpire() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #d97706, transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4">
        <motion.p
          className="text-center text-xs tracking-[0.4em] uppercase mb-5 font-medium"
          style={{ color: "#d97706" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Global Reach · Adamimogo Worldwide
        </motion.p>

        <motion.h2
          className="font-serif text-center font-bold mb-3 hero-text-glow"
          style={{
            color: "#f5f0eb",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          The Adamimogo Empire
        </motion.h2>

        <motion.div
          className="mx-auto mb-4"
          style={{
            width: 100,
            height: 3,
            background:
              "linear-gradient(90deg, transparent, #d97706, transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
          From Ido-Ekiti to the ends of the earth
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              className="rounded-xl transition-all duration-300 cursor-default group"
              style={{
                background: "#3d0000",
                borderTop: "4px solid #d97706",
                padding: "clamp(1rem, 4vw, 1.5rem)",
              }}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -4,
                boxShadow: "0 0 24px #d9770666, 0 0 48px #d9770633",
                borderColor: "#f59e0b",
              }}
            >
              <div className="text-3xl md:text-4xl mb-3 text-center">
                {loc.flag}
              </div>

              <h3
                className="font-serif font-bold text-center mb-1"
                style={{
                  color: "#ffffff",
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
                }}
              >
                {loc.city}
              </h3>

              <p
                className="text-xs tracking-[0.2em] uppercase text-center mb-3 font-medium"
                style={{ color: "#d97706" }}
              >
                {loc.country}
              </p>

              <p
                className="text-sm text-center leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {loc.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-xs tracking-[0.3em] uppercase mt-14"
          style={{ color: "rgba(217,119,6,0.5)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Adamimogo Worldwide · Planted by Prophet Sam Olu Alo
        </motion.p>
      </div>
    </section>
  );
}
