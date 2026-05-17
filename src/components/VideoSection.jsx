import { motion } from "framer-motion";
import { Youtube } from "lucide-react";

const youtubeVideos = [
  {
    src: "https://www.youtube.com/embed/DeVg520BsJA",
    title: "Prophet Sam Olu Alo — Message 1",
  },
  {
    src: "https://www.youtube.com/embed/Efufu1ka0lA",
    title: "Prophet Sam Olu Alo — Message 2",
  },
  {
    src: "https://www.youtube.com/embed/No7coKcUzZI",
    title: "Prophet Sam Olu Alo — Message 3",
  },
  {
    src: "https://www.youtube.com/embed/x_Cyz7QT5-I",
    title: "Prophet Sam Olu Alo — Message 4",
  },
  {
    src: "https://www.youtube.com/embed/Ctg-YlakxIQ",
    title: "Prophet Sam Olu Alo — Message 5",
  },
  {
    src: "https://www.youtube.com/embed/Z_mpEvWhcs0",
    title: "Prophet Sam Olu Alo — Message 6",
  },
  {
    src: "https://www.youtube.com/embed/82RHsxACrDI",
    title: "Prophet Sam Olu Alo — Message 7",
  },
  {
    src: "https://www.youtube.com/embed/wIEZdh5zh70",
    title: "Prophet Sam Olu Alo — Message 8",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.07, ease: "easeOut" },
  }),
};

export default function VideoSection() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#0d0000" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217,119,6,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Top divider */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #d97706, transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section label */}
        <motion.p
          className="text-center text-xs tracking-[0.4em] uppercase mb-5 font-medium"
          style={{ color: "#d97706" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          The Voice & The Vision
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-serif text-center font-bold mb-3"
          style={{
            color: "#ffffff",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontFamily: "Georgia, serif",
            textShadow: "0 0 30px rgba(217,119,6,0.3)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Watch & Be Inspired
        </motion.h2>

        {/* Amber underline */}
        <motion.div
          className="mx-auto mb-4"
          style={{
            width: 80,
            height: 3,
            background:
              "linear-gradient(90deg, transparent, #d97706, transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Subtitle */}
        <motion.p
          className="font-serif italic text-center text-lg mb-8"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontFamily: "Georgia, serif",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Messages, sermons and moments from Prophet Sam Olu Alo
        </motion.p>

        {/* Divider */}
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

        {/* YouTube label */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Youtube size={24} color="#ff0000" />
          <h3
            className="font-serif font-bold text-xl"
            style={{ color: "#ffffff", fontFamily: "Georgia, serif" }}
          >
            YouTube
          </h3>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(217,119,6,0.4), transparent)",
            }}
          />
        </motion.div>

        {/* YouTube Grid — 2 columns desktop, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {youtubeVideos.map((video, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -4,
                boxShadow: "0 0 24px rgba(217,119,6,0.3)",
              }}
              className="rounded-xl overflow-hidden"
              style={{
                background: "#1a0000",
                border: "1px solid rgba(217,119,6,0.25)",
              }}
            >
              {/* iframe */}
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={video.src}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video title */}
              <div className="px-4 py-3">
                <p
                  className="text-sm font-medium"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {video.title}
                </p>
                <p
                  className="text-xs mt-1 uppercase tracking-wider"
                  style={{ color: "rgba(217,119,6,0.6)" }}
                >
                  Prophet Sam Olu Alo
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-xs italic mt-12"
          style={{
            color: "rgba(217,119,6,0.45)",
            fontFamily: "Georgia, serif",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Subscribe to Adamimogo Worldwide on YouTube for more messages 🙏
        </motion.p>
      </div>
    </section>
  );
}
