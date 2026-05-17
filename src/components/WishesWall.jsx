import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const BIRTHDAY = new Date("2026-05-25T00:00:00");

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.07, ease: "easeOut" },
  }),
};

export default function WishesWall() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const isBirthday = true; // show all messages now

  const PREVIEW_COUNT = 5;

  useEffect(() => {
    const q = query(collection(db, "wishes"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWishes(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const displayedWishes = expanded ? wishes : wishes.slice(0, PREVIEW_COUNT);
  const hasMore = wishes.length > PREVIEW_COUNT;

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#1a0000" }}
    >
      {/* Amber radial fire glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217,119,6,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #d97706, transparent)",
        }}
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
          From His Children
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-serif text-center font-bold mb-3"
          style={{
            color: "#ffffff",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Birthday Wishes & Prayers
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
            color: "rgba(255,255,255,0.55)",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          The world speaks. A prophet listens.
        </motion.p>

        {/* Amber divider */}
        <motion.div
          className="w-full h-px mb-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, #d97706, transparent)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />

        {/* Live wish counter */}
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <div
            className="inline-flex flex-col items-center gap-1 px-8 py-5 rounded-full"
            style={{
              background: "#3d0000",
              border: "1.5px solid #d97706",
              boxShadow: "0 0 20px #d9770655",
            }}
          >
            <span
              className="font-serif font-bold"
              style={{
                color: "#d97706",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                fontFamily: "'EB Garamond', Georgia, serif",
                lineHeight: 1,
              }}
            >
              {loading ? "..." : wishes.length}
            </span>
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              wishes submitted worldwide
            </span>
          </div>
        </motion.div>

        {/* Wishes list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div
              className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{ borderColor: "#d97706", borderTopColor: "transparent" }}
            />
          </div>
        ) : wishes.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p
              className="font-serif italic text-xl"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontFamily: "'EB Garamond', Georgia, serif",
              }}
            >
              🙏 Wishes are being gathered from around the world...
            </p>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col gap-5">
              <AnimatePresence>
                {displayedWishes.map((wish, i) => (
                  <motion.div
                    key={wish.id}
                    className="rounded-xl p-6 transition-all duration-300"
                    style={{
                      background: "#3d0000",
                      borderLeft: "4px solid #d97706",
                    }}
                    custom={i}
                    variants={cardVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{
                      y: -3,
                      boxShadow: "0 0 20px #d9770644, 0 0 40px #d9770622",
                    }}
                  >
                    {/* Name */}
                    <h3
                      className="font-serif font-bold text-lg mb-1"
                      style={{
                        color: "#ffffff",
                        fontFamily: "'EB Garamond', Georgia, serif",
                      }}
                    >
                      {wish.name || "Anonymous"}
                    </h3>

                    {/* Branch */}
                    {wish.branch && (
                      <p
                        className="text-xs font-medium mb-1"
                        style={{ color: "#d97706" }}
                      >
                        {wish.branch}
                      </p>
                    )}

                    {/* Location */}
                    {wish.location && (
                      <p
                        className="text-xs mb-3"
                        style={{ color: "rgba(217,119,6,0.6)" }}
                      >
                        📍 {wish.location}
                      </p>
                    )}

                    {/* Message */}
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.72)" }}
                    >
                      {wish.message}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Show More / Show Less button */}
            {hasMore && (
              <motion.div
                className="flex flex-col items-center mt-8 gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "rgba(217,119,6,0.5)" }}
                >
                  {expanded
                    ? "Showing all wishes"
                    : `Showing 5 of ${wishes.length} wishes`}
                </p>
                <motion.button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
                  style={{
                    background: "#3d0000",
                    border: "1.5px solid #d97706",
                    color: "#d97706",
                    cursor: "pointer",
                  }}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 0 20px #d9770655",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {expanded ? (
                    <>
                      <ChevronUp size={16} />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Show All {wishes.length} Wishes
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </>
        )}

        {/* Birthday reveal note */}
        <motion.p
          className="font-serif italic text-center text-sm mt-12"
          style={{ color: "rgba(217,119,6,0.5)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          All wishes revealed to Prophet Sam on his birthday — 25th May 2026 🎂
        </motion.p>
      </div>
    </section>
  );
}
