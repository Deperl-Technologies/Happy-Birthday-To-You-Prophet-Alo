import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Youtube, Play } from "lucide-react";
import { MEDIA_PAUSE_EVENT, pauseOtherMedia } from "@/lib/audioManager";

const youtubeVideos = [
  {
    src: "https://www.youtube.com/embed/DeVg520BsJA?enablejsapi=1&rel=0&modestbranding=1",
    title: "Prophet Sam Olu Alo — Message",
  },
  {
    src: "https://www.youtube.com/embed/Efufu1ka0lA?enablejsapi=1&rel=0&modestbranding=1",
    title: "Prophet Sam Olu Alo — Message",
  },
  {
    src: "https://www.youtube.com/embed/No7coKcUzZI?enablejsapi=1&rel=0&modestbranding=1",
    title: "Prophet Sam Olu Alo — Message",
  },
  {
    src: "https://www.youtube.com/embed/x_Cyz7QT5-I?enablejsapi=1&rel=0&modestbranding=1",
    title: "Prophet Sam Olu Alo — Message",
  },
  {
    src: "https://www.youtube.com/embed/Ctg-YlakxIQ?enablejsapi=1&rel=0&modestbranding=1",
    title: "Prophet Sam Olu Alo — Message",
  },
  {
    src: "https://www.youtube.com/embed/Z_mpEvWhcs0?enablejsapi=1&rel=0&modestbranding=1",
    title: "Prophet Sam Olu Alo — Message",
  },
  {
    src: "https://www.youtube.com/embed/82RHsxACrDI?enablejsapi=1&rel=0&modestbranding=1",
    title: "Prophet Sam Olu Alo — Message",
  },
  {
    src: "https://www.youtube.com/embed/wIEZdh5zh70?enablejsapi=1&rel=0&modestbranding=1",
    title: "Prophet Sam Olu Alo — Message",
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

function VideoCard({ video, index, isActive, onActivate }) {
  return (
    <motion.div
      key={index}
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -4,
        boxShadow: "0 0 24px rgba(217,119,6,0.3)",
      }}
      className="w-full rounded-xl overflow-hidden"
      style={{
        background: "#1a0000",
        border: "1px solid rgba(217,119,6,0.25)",
      }}
    >
      <button
        type="button"
        onClick={onActivate}
        className="relative block w-full overflow-hidden text-left"
        style={{ aspectRatio: "16 / 9", width: "100%" }}
        aria-label={`Play ${video.title}`}
      >
        {isActive ? (
          <iframe
            className="absolute top-1/2 left-1/2 block"
            style={{
              width: "106%",
              height: "106%",
              transform: "translate(-50%, -50%)",
            }}
            src={video.src}
            title={video.title}
            frameBorder="0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(61,0,0,0.98) 0%, rgba(26,0,0,0.98) 80%)",
            }}
          >
            <div
              className="flex items-center justify-center rounded-full mb-3 transition-transform duration-300 group-hover:scale-110"
              style={{
                width: 54,
                height: 54,
                background: "linear-gradient(135deg, #d97706, #f59e0b)",
                boxShadow: "0 0 20px rgba(217,119,6,0.5)",
              }}
            >
              <Play
                size={20}
                fill="#1a0000"
                strokeWidth={0}
                style={{ marginLeft: 3 }}
              />
            </div>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(217,119,6,0.75)" }}
            >
              Tap to play
            </p>
          </div>
        )}
      </button>

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
  );
}

export default function VideoSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handlePauseEvent = (event) => {
      if (event.detail?.source !== "youtube") {
        setActiveIndex(null);
      }
    };

    window.addEventListener(MEDIA_PAUSE_EVENT, handlePauseEvent);
    return () =>
      window.removeEventListener(MEDIA_PAUSE_EVENT, handlePauseEvent);
  }, []);

  const activateVideo = (index) => {
    pauseOtherMedia("youtube");
    setActiveIndex(index);
  };

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "transparent" }}
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

        <motion.h2
          className="font-serif text-center font-bold mb-3 hero-text-glow"
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

        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Youtube size={24} color="#ff0000" />
          <h3
            className="font-serif font-bold text-xl hero-text-glow"
            style={{ color: "#f5f0eb", fontFamily: "Georgia, serif" }}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {youtubeVideos.map((video, i) => (
            <VideoCard
              key={i}
              video={video}
              index={i}
              isActive={activeIndex === i}
              onActivate={() => activateVideo(i)}
            />
          ))}
        </div>

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
          Tap any video to load it. Only one video stays active at a time.
        </motion.p>
      </div>
    </section>
  );
}
