import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";

// ─── Import all 22 photos ───────────────────────────────────────────
import photo1 from "../assets/images/photo1.jpg";
import photo2 from "../assets/images/photo2.jpg";
import photo3 from "../assets/images/photo3.jpg";
import photo4 from "../assets/images/photo4.jpg";
import photo5 from "../assets/images/photo5.jpg";
import photo6 from "../assets/images/photo6.jpg";
import photo7 from "../assets/images/photo7.jpg";
import photo8 from "../assets/images/photo8.jpg";
import photo9 from "../assets/images/photo9.jpg";
import photo10 from "../assets/images/photo10.jpg";
import photo11 from "../assets/images/photo11.jpg";
import photo12 from "../assets/images/photo12.jpg";
import photo13 from "../assets/images/photo13.jpg";
import photo14 from "../assets/images/photo14.jpg";
import photo15 from "../assets/images/photo15.jpg";
import photo16 from "../assets/images/photo16.jpg";
import photo17 from "../assets/images/photo17.jpg";
import photo18 from "../assets/images/photo18.jpg";
import photo19 from "../assets/images/photo19.jpg";
import photo20 from "../assets/images/photo20.jpg";
import photo21 from "../assets/images/photo21.jpg";
import photo22 from "../assets/images/photo22.jpg";

// ─── Slider photos (first 4) ────────────────────────────────────────
const sliderPhotos = [
  { src: photo1, caption: "A Man Sent By God", sub: "Prophet Sam Olu Alo" },
  {
    src: photo2,
    caption: "The Voice That Shakes The Heavens",
    sub: "Adamimogo Worldwide",
  },
  {
    src: photo3,
    caption: "Father To Nations",
    sub: "C.A.C Grace of Mercy Prayer Mountain",
  },
  {
    src: photo4,
    caption: "The Anointing That Breaks The Yoke",
    sub: "A Legacy In Motion",
  },
];

// ─── Gallery photos (remaining 18) ──────────────────────────────────
const galleryPhotos = [
  { src: photo5, caption: "The Crusade Ground" },
  { src: photo6, caption: "Moments of Glory" },
  { src: photo7, caption: "The Prophet Speaks" },
  { src: photo8, caption: "Fire From Heaven" },
  { src: photo9, caption: "Nations Gathering" },
  { src: photo10, caption: "Sacred Anointing" },
  { src: photo11, caption: "The Berlin Crusade" },
  { src: photo12, caption: "Jesus City Lagos" },
  { src: photo13, caption: "The Planter" },
  { src: photo14, caption: "Ministry Moments" },
  { src: photo15, caption: "A Life Poured Out" },
  { src: photo16, caption: "The Prayer Mountain" },
  { src: photo17, caption: "Anniversary Celebration" },
  { src: photo18, caption: "Anniversary Celebration" },
  { src: photo19, caption: "Anniversary Celebration" },
  { src: photo20, caption: "Grace of Mercy Church" },
  { src: photo21, caption: "Ido-Ekiti Roots" },
  { src: photo22, caption: "A Legacy In Frames" },
];

// ─── Hero Slider ─────────────────────────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % sliderPhotos.length);
    }, 3000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (index, dir) => {
    setDirection(dir);
    setCurrent(index);
    startTimer();
  };

  const prev = () => {
    goTo((current - 1 + sliderPhotos.length) % sliderPhotos.length, -1);
  };

  const next = () => {
    goTo((current + 1) % sliderPhotos.length, 1);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl mb-12"
      style={{
        height: "clamp(400px, 65vw, 650px)",
        border: "1px solid rgba(217,119,6,0.3)",
        boxShadow: "0 0 40px rgba(217,119,6,0.15)",
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={{
            enter: (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={sliderPhotos[current].src}
            alt={sliderPhotos[current].caption}
            className="w-full h-full"
            style={{
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(26,0,0,0.9) 0%, rgba(26,0,0,0.2) 60%, transparent 100%)",
            }}
          />
          {/* Caption */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p
              className="font-serif font-bold mb-1"
              style={{
                color: "#d97706",
                fontSize: "clamp(1.1rem, 3vw, 1.8rem)",
                fontFamily: "Georgia, serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.8)",
              }}
            >
              {sliderPhotos[current].caption}
            </p>
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {sliderPhotos[current].sub}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Prev/Next buttons */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
        style={{
          background: "rgba(26,0,0,0.7)",
          border: "1px solid rgba(217,119,6,0.4)",
          color: "#d97706",
        }}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
        style={{
          background: "rgba(26,0,0,0.7)",
          border: "1px solid rgba(217,119,6,0.4)",
          color: "#d97706",
        }}
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 right-6 z-10 flex gap-2">
        {sliderPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 20 : 8,
              height: 8,
              background: i === current ? "#d97706" : "rgba(217,119,6,0.4)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────
function Lightbox({ photo, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.95)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl w-full"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full rounded-xl"
          style={{
            maxHeight: "80vh",
            objectFit: "contain",
            border: "1px solid rgba(217,119,6,0.3)",
          }}
        />
        <p
          className="text-center mt-3 font-serif italic"
          style={{ color: "#d97706", fontFamily: "Georgia, serif" }}
        >
          {photo.caption}
        </p>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: "#3d0000",
            border: "1px solid #d97706",
            color: "#d97706",
          }}
        >
          <X size={16} />
        </button>

        {/* Prev/Next */}
        <button
          onClick={onPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(26,0,0,0.8)",
            border: "1px solid rgba(217,119,6,0.4)",
            color: "#d97706",
          }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(26,0,0,0.8)",
            border: "1px solid rgba(217,119,6,0.4)",
            color: "#d97706",
          }}
        >
          <ChevronRight size={18} />
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────
export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () =>
    setLightbox(
      (prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length,
    );
  const nextPhoto = () =>
    setLightbox((prev) => (prev + 1) % galleryPhotos.length);

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#1a0000" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(217,119,6,0.06) 0%, transparent 65%)",
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
          Moments in Time · A Life in Frames
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
          The Gallery of Fire
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
          Glimpses of a life poured out for God and nations
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

        {/* ── AUTO SLIDER (4 photos) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4 text-center"
            style={{ color: "rgba(217,119,6,0.6)" }}
          >
            ✦ Featured Moments
          </p>
          <HeroSlider />
        </motion.div>

        {/* ── GALLERY GRID (18 photos) ── */}
        <p
          className="text-xs uppercase tracking-[0.3em] mb-6 text-center"
          style={{ color: "rgba(217,119,6,0.6)" }}
        >
          ✦ Photo Gallery · Click to Enlarge
        </p>

        {/* Desktop masonry grid */}
        <div
          className="hidden sm:grid gap-3"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "200px",
          }}
        >
          {galleryPhotos.map((photo, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                i === 0 || i === 5 || i === 10 || i === 15 ? "row-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.08 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,0,0,0.9) 0%, rgba(217,119,6,0.1) 60%, transparent 100%)",
                }}
              />
              {/* Border glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow:
                    "inset 0 0 0 2px rgba(217,119,6,0.7), 0 0 24px rgba(217,119,6,0.25)",
                }}
              />
              {/* Caption */}
              {/* <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-serif italic text-sm" style={{ color: "#d97706", fontFamily: "Georgia, serif" }}>
                  {photo.caption}
                </p>
              </div> */}
              {/* Camera icon */}
              <div
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{ color: "#d97706" }}
              >
                <Camera size={16} strokeWidth={1.5} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile grid */}
        <div className="grid sm:hidden grid-cols-2 gap-3">
          {galleryPhotos.map((photo, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? "col-span-2" : ""}`}
              style={{ height: i === 0 ? 200 : 150 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,0,0,0.85) 0%, transparent 100%)",
                }}
              />
              {/* <p className="absolute bottom-2 left-3 text-xs font-serif italic opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#d97706" }}>
                {photo.caption}
              </p> */}
            </motion.div>
          ))}
        </div>

        {/* Bottom ornament */}
        <motion.p
          className="text-center text-xs tracking-[0.3em] uppercase mt-12"
          style={{ color: "rgba(217,119,6,0.45)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Adamimogo Worldwide · A Legacy in Photographs
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            photo={galleryPhotos[lightbox]}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
