import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Flame } from "lucide-react";
import cacLogo from "../assets/logo_left_refined.png";
import gmpmLogo from "../assets/logo_right_refined.png";

// ─── Ember Particle ─────────────────────────────────────────────────────────
function EmberParticle({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none ember-particle"
      style={{
        width: style.size,
        height: style.size,
        background: style.color,
        left: style.left,
        top: style.top,
        animationDuration: style.duration,
        animationDelay: style.delay,
        filter: "blur(0.5px)",
        ...style,
      }}
    />
  );
}

// ─── Canvas Fire Rays ────────────────────────────────────────────────────────
function FireCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Radial amber glow from center
      const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.65);
      radial.addColorStop(0, "rgba(217,119,6,0.18)");
      radial.addColorStop(0.4, "rgba(180,60,0,0.10)");
      radial.addColorStop(1, "rgba(26,0,0,0)");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fire rays
      const rayCount = 16;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + t * 0.003;
        const wobble = Math.sin(t * 0.02 + i * 1.3) * 0.06;
        const length = (canvas.width * 0.55) * (0.7 + 0.3 * Math.sin(t * 0.015 + i * 0.7));
        const alpha = 0.04 + 0.04 * Math.sin(t * 0.02 + i * 0.9);
        const grad = ctx.createLinearGradient(
          cx, cy,
          cx + Math.cos(angle + wobble) * length,
          cy + Math.sin(angle + wobble) * length
        );
        grad.addColorStop(0, `rgba(245,158,11,${alpha * 3})`);
        grad.addColorStop(0.3, `rgba(217,119,6,${alpha})`);
        grad.addColorStop(1, "rgba(139,0,0,0)");
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
          cx + Math.cos(angle + wobble) * length,
          cy + Math.sin(angle + wobble) * length
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = 28 + 16 * Math.sin(t * 0.01 + i);
        ctx.lineCap = "round";
        ctx.globalAlpha = 0.7;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      t++;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// ─── Ember particles data ────────────────────────────────────────────────────
const embers = Array.from({ length: 28 }, (_, i) => ({
  size: `${2 + Math.random() * 4}px`,
  color: i % 3 === 0 ? "#f59e0b" : i % 3 === 1 ? "#d97706" : "#c9a84c",
  left: `${5 + Math.random() * 90}%`,
  top: `${40 + Math.random() * 55}%`,
  duration: `${4 + Math.random() * 5}s`,
  delay: `${Math.random() * 6}s`,
}));

// ─── Fade Up Variant ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: "easeOut" } },
});

// ─── Hero ────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #3d0000 0%, #1a0000 60%, #0a0000 100%)",
      }}
    >
      {/* Fire Canvas */}
      <FireCanvas />

      {/* Ember Particles */}
      {embers.map((e, i) => (
        <EmberParticle key={i} style={e} />
      ))}

      {/* Hero background image overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,0,0,0.55) 0%, rgba(26,0,0,0.25) 40%, rgba(26,0,0,0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-16 max-w-4xl mx-auto w-full">

        {/* Logos */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6 mb-5 md:mb-6"
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
        >
          {[cacLogo, gmpmLogo].map((logo, i) => (
            <div
              key={i}
              className="fire-pulse-ring rounded-full p-1"
              style={{
                background: "#1a0000",
                border: "2px solid #d97706",
                boxShadow: "0 0 18px #d9770666, 0 0 40px #d9770633",
              }}
            >
              <div
                className="rounded-full overflow-hidden"
                style={{ width: "clamp(56px, 12vw, 72px)", height: "clamp(56px, 12vw, 72px)", background: "#2a0000" }}
              >
                <img
                  src={logo}
                  alt={i === 0 ? "CAC Logo" : "GMPM Logo"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Church name */}
        <motion.p
          className="text-xs tracking-[0.3em] uppercase mb-3 font-medium"
          style={{ color: "#d97706" }}
          variants={fadeUp(0.25)}
          initial="hidden"
          animate="visible"
        >
          C.A.C Grace of Mercy Prayer Mountain International
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-40 h-px mb-5"
          style={{ background: "linear-gradient(90deg, transparent, #d97706, transparent)" }}
          variants={fadeUp(0.35)}
          initial="hidden"
          animate="visible"
        />

        {/* A Divine Tribute To */}
        <motion.p
          className="text-xs tracking-[0.25em] uppercase mb-4"
          style={{ color: "rgba(255,255,255,0.45)" }}
          variants={fadeUp(0.4)}
          initial="hidden"
          animate="visible"
        >
          A Divine Tribute To
        </motion.p>

        {/* MASSIVE Name */}
        <motion.h1
          className="font-serif font-bold leading-tight mb-4 amber-glow-text"
          style={{
            color: "#ffffff",
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            textShadow:
              "0 0 40px #d9770699, 0 0 80px #d9770444, 0 2px 4px rgba(0,0,0,0.8)",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          variants={fadeUp(0.5)}
          initial="hidden"
          animate="visible"
        >
          Prophet Sam Olu Alo
        </motion.h1>

        {/* Title */}
        <motion.p
          className="text-sm tracking-[0.2em] uppercase mb-5 font-medium"
          style={{ color: "#c9a84c", letterSpacing: "0.18em" }}
          variants={fadeUp(0.65)}
          initial="hidden"
          animate="visible"
        >
          Founder &amp; General Overseer · Adamimogo Worldwide
        </motion.p>

        {/* Gold divider */}
        <motion.div
          className="w-32 h-px mb-6"
          style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }}
          variants={fadeUp(0.72)}
          initial="hidden"
          animate="visible"
        />

        {/* Tagline */}
        <motion.p
          className="font-serif italic text-xl md:text-2xl mb-2 max-w-2xl leading-relaxed"
          style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'EB Garamond', Georgia, serif" }}
          variants={fadeUp(0.8)}
          initial="hidden"
          animate="visible"
        >
          "A man sent by God. A father to nations. A voice that shakes the heavens."
        </motion.p>

        {/* Bible verse */}
        <motion.p
          className="text-sm italic mb-7"
          style={{ color: "rgba(217,119,6,0.7)" }}
          variants={fadeUp(0.9)}
          initial="hidden"
          animate="visible"
        >
          — Jeremiah 1:5
        </motion.p>

        {/* Date badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 text-sm font-medium"
          style={{
            background: "#1a0000",
            border: "1px solid #d97706",
            color: "#d97706",
            boxShadow: "0 0 16px #d9770633",
          }}
          variants={fadeUp(1.0)}
          initial="hidden"
          animate="visible"
        >
          <span>🎂</span>
          <span>Celebrating a Legend · 25th May 2026</span>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="https://celebrate-prophet-sam-alo-birthday.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-base transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #d97706, #f59e0b)",
            color: "#1a0000",
            boxShadow: "0 4px 20px #d9770666",
          }}
          whileHover={{ y: -3, boxShadow: "0 8px 32px #d97706aa" }}
          whileTap={{ scale: 0.97 }}
          variants={fadeUp(1.1)}
          initial="hidden"
          animate="visible"
        >
          <span>🙏</span>
          <span>Send Your Birthday Wish</span>
        </motion.a>
      </div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 bounce-arrow"
        style={{ color: "#d97706" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <ChevronDown size={32} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
