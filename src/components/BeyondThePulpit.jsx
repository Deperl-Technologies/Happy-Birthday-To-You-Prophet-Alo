import { motion } from "framer-motion";

const bentoItems = [
  {
    id: "fc",
    icon: "⚽",
    title: "Adamimogo FC",
    desc: "A football club that carries a prophetic vision — building champions on and off the pitch. Sports as a vehicle for revival.",
    span: "md:col-span-2",
    dark: true,
    bg: "#3d0000",
    border: "borderTop",
    borderColor: "#d97706",
  },
  {
    id: "farm",
    icon: "🌾",
    title: "The Farm",
    desc: "Feeding nations. Adamimogo Farm is a testament that the prophet's hands produce fruit in every season.",
    span: "",
    dark: false,
    bg: "#ffffff",
    border: "borderLeft",
    borderColor: "#d97706",
  },
  {
    id: "author",
    icon: "📚",
    title: "Author",
    desc: "Books of prophetic depth — written under holy fire, carrying the weight of decades of revelation.",
    span: "",
    dark: false,
    bg: "#ffffff",
    border: "borderTop",
    borderColor: "#8b0000",
  },
  {
    id: "songs",
    icon: "🎵",
    title: "Songwriter",
    desc: "Worship anthologies that carry the anointing of God. His songs have lifted thousands into the presence of the Almighty.",
    span: "md:col-span-2",
    dark: true,
    bg: "#6b0000",
    border: "none",
    borderColor: "#c9a84c",
    accent: true,
  },
];

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function BeyondThePulpit() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#fdf8f0" }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #d97706, transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Section label */}
        <motion.p
          className="text-center text-xs tracking-[0.35em] uppercase mb-4 font-semibold"
          style={{ color: "#8b0000" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Beyond the Pulpit
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-serif text-center text-4xl md:text-5xl font-bold mb-3"
          style={{
            color: "#1a0000",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          The Full Man
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="font-serif italic text-center text-lg mb-6"
          style={{
            color: "#8b0000",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Prophet. Builder. Entrepreneur. Father.
        </motion.p>

        {/* Gold divider */}
        <motion.div
          className="mx-auto mb-12"
          style={{
            width: 80,
            height: 2,
            background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        />

        {/* Asymmetric bento grid — collapses to single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {bentoItems.map((item, i) => {
            const borderStyle = {};
            if (item.border === "borderTop") borderStyle.borderTop = `4px solid ${item.borderColor}`;
            if (item.border === "borderLeft") borderStyle.borderLeft = `4px solid ${item.borderColor}`;
            // On mobile, col-span-2 only applies at md+; force col-span-1 on mobile
            const spanClass = item.span ? item.span.replace("md:col-span-2", "col-span-1 md:col-span-2") : "";

            return (
              <motion.div
                key={item.id}
                className={`rounded-2xl transition-all duration-300 cursor-default ${spanClass}`}
                style={{
                  background: item.bg,
                  padding: "clamp(1.25rem, 4vw, 1.75rem)",
                  ...borderStyle,
                  ...(item.dark ? {} : { boxShadow: "0 2px 16px rgba(26,0,0,0.06)" }),
                }}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: item.dark
                    ? "0 0 24px #d9770655, 0 0 48px #d9770622"
                    : "0 8px 32px rgba(217,119,6,0.18)",
                }}
              >
                <div className="text-3xl md:text-4xl mb-3">{item.icon}</div>
                <h3
                  className="font-serif font-bold mb-2"
                  style={{
                    color: item.dark ? "#ffffff" : "#1a0000",
                    fontFamily: "'EB Garamond', Georgia, serif",
                    fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}
                  style={{
                    color: item.dark ? "rgba(255,255,255,0.7)" : "rgba(26,0,0,0.65)",
                  }}
                >
                  {item.desc}
                </p>
                {item.accent && (
                  <div
                    className="mt-4 w-12 h-0.5"
                    style={{ background: "#c9a84c" }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
