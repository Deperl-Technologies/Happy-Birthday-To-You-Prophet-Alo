import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Link2,
  MessageCircleMore,
  Share2,
  X,
} from "lucide-react";
import ProjectIcon from "./ProjectIcon.jsx";

const TRIBUTE_URL = "https://celebrate-prophet-sam-alo-birthday.vercel.app";

const SACRED_MESSAGE =
  "🔥 A sacred tribute to a man sent by God — Prophet Sam Olu Alo, Founder of C.A.C Grace of Mercy Prayer Mountain International. Join us in celebrating a life that has shaken nations and lit fires that will never go out. 🎂 25th May 2026 · Adamimogo Worldwide";

const shareOptions = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircleMore,
    color: "#25D366",
    hoverBg: "rgba(37,211,102,0.12)",
    href: `https://wa.me/?text=${encodeURIComponent(SACRED_MESSAGE + "\n\n" + TRIBUTE_URL)}`,
  },
  {
    id: "twitter",
    label: "Twitter / X",
    icon: ArrowUpRight,
    color: "#1DA1F2",
    hoverBg: "rgba(29,161,242,0.12)",
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SACRED_MESSAGE)}&url=${encodeURIComponent(TRIBUTE_URL)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: Share2,
    color: "#1877F2",
    hoverBg: "rgba(24,119,242,0.12)",
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(TRIBUTE_URL)}&quote=${encodeURIComponent(SACRED_MESSAGE)}`,
  },
];

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const sheetRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(TRIBUTE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = TRIBUTE_URL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      {/* Share Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={sheetRef}
            className="fixed z-50"
            style={{ bottom: 90, right: 24 }}
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #2a0000 0%, #1a0000 100%)",
                border: "1px solid rgba(217,119,6,0.4)",
                boxShadow:
                  "0 0 0 1px rgba(217,119,6,0.1), 0 24px 48px rgba(0,0,0,0.7), 0 0 40px rgba(217,119,6,0.15)",
                minWidth: 260,
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid rgba(217,119,6,0.15)" }}
              >
                <div>
                  <p
                    className="font-serif font-bold text-base"
                    style={{
                      color: "#ffffff",
                      fontFamily: "'EB Garamond', Georgia, serif",
                    }}
                  >
                    Share This Tribute
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(217,119,6,0.65)" }}
                  >
                    Spread the fire · Honour the prophet
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    width: 30,
                    height: 30,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                  }}
                  aria-label="Close share sheet"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Message preview */}
              <div
                className="px-5 py-3 mx-3 my-3 rounded-xl text-xs leading-6"
                style={{
                  background: "rgba(217,119,6,0.06)",
                  border: "1px solid rgba(217,119,6,0.15)",
                  color: "rgba(255,255,255,0.6)",
                  maxHeight: 72,
                  overflow: "hidden",
                  fontStyle: "italic",
                }}
              >
                {SACRED_MESSAGE.slice(0, 120)}…
              </div>

              {/* Share options */}
              <div className="px-3 pb-2 flex flex-col gap-1">
                {shareOptions.map((opt) => (
                  <a
                    key={opt.id}
                    href={opt.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 no-underline"
                    style={{
                      color: "#ffffff",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = opt.hoverBg;
                      e.currentTarget.style.borderColor = opt.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    <ProjectIcon
                      icon={opt.icon}
                      size={15}
                      tone="darkAmber"
                      className="shrink-0"
                    />
                    <div className="flex-1">
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#ffffff" }}
                      >
                        {opt.label}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(217,119,6,0.12)",
                        color: "#d97706",
                        border: "1px solid rgba(217,119,6,0.25)",
                      }}
                    >
                      Share
                    </span>
                  </a>
                ))}

                {/* Copy link button */}
                <button
                  onClick={copyLink}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200"
                  style={{
                    background: copied ? "rgba(201,168,76,0.1)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (!copied)
                      e.currentTarget.style.background =
                        "rgba(201,168,76,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    if (!copied)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <ProjectIcon
                    icon={Link2}
                    size={15}
                    tone="darkAmber"
                    className="shrink-0"
                  />
                  <div className="flex-1">
                    <p
                      className="text-sm font-medium"
                      style={{ color: copied ? "#c9a84c" : "#ffffff" }}
                    >
                      {copied ? "Link Copied!" : "Copy Link"}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {TRIBUTE_URL.replace("https://", "")}
                    </p>
                  </div>
                  <span
                    style={{
                      color: copied ? "#c9a84c" : "rgba(217,119,6,0.5)",
                    }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </span>
                </button>
              </div>

              {/* Footer ornament */}
              <div
                className="text-center py-3"
                style={{ borderTop: "1px solid rgba(217,119,6,0.1)" }}
              >
                <p
                  className="text-xs font-serif italic"
                  style={{ color: "rgba(217,119,6,0.4)" }}
                >
                  🔥 Adamimogo Worldwide · 25th May 2026
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Share FAB */}
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed z-50 flex items-center gap-2 rounded-full font-semibold text-sm select-none"
        style={{
          bottom: 24,
          right: 24,
          background: open
            ? "linear-gradient(135deg, #d97706, #f59e0b)"
            : "linear-gradient(160deg, #2a0000 0%, #1a0000 100%)",
          border: "1.5px solid",
          borderColor: open ? "#f59e0b" : "rgba(217,119,6,0.55)",
          color: open ? "#1a0000" : "#d97706",
          padding: "0.65rem 1.25rem",
          boxShadow: open
            ? "0 0 24px rgba(245,158,11,0.55), 0 0 48px rgba(217,119,6,0.25), 0 4px 16px rgba(0,0,0,0.5)"
            : "0 0 18px rgba(217,119,6,0.3), 0 4px 16px rgba(0,0,0,0.5)",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}
        whileHover={{
          scale: 1.06,
          boxShadow:
            "0 0 28px rgba(217,119,6,0.55), 0 4px 20px rgba(0,0,0,0.5)",
        }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6, ease: "easeOut" }}
        aria-label="Share this tribute"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={17} />
            </motion.span>
          ) : (
            <motion.span
              key="share"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Share2 size={17} />
            </motion.span>
          )}
        </AnimatePresence>
        <span>{open ? "Close" : "Share Tribute"}</span>

        {/* Pulse ring when closed */}
        {!open && (
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: "1.5px solid rgba(217,119,6,0.4)",
              animation: "share-pulse 2.5s ease-out infinite",
            }}
          />
        )}
      </motion.button>

      <style>{`
        @keyframes share-pulse {
          0%   { transform: scale(1); opacity: 0.7; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
      `}</style>
    </>
  );
}
