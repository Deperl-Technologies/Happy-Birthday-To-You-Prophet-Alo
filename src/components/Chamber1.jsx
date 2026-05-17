import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHAMBER1_CODE = "IBADAN2026";
const UNLOCK_DATE = new Date("2026-05-17T00:00:00");

export default function Chamber1() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // Only render on/after unlock date
  if (new Date() < UNLOCK_DATE) return null;

  const handleUnlock = () => {
    if (code.trim().toUpperCase() === CHAMBER1_CODE) {
      setError("");
      setUnlocked(true);
    } else {
      setError("Incorrect passcode. Try again.");
      setCode("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleUnlock();
  };

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden min-h-screen flex items-center"
      style={{ background: "#1a0000" }}
    >
      {/* Amber radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217,119,6,0.08) 0%, transparent 65%)",
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

      <div className="max-w-xl mx-auto px-4 relative z-10 w-full text-center">
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
            >
              {/* Lock icon */}
              <motion.div
                className="text-6xl mb-6 crown-pulse inline-block"
                style={{ filter: "drop-shadow(0 0 18px #d97706)" }}
              >
                🔐
              </motion.div>

              {/* Heading */}
              <h2
                className="font-serif font-bold text-3xl md:text-4xl mb-4"
                style={{
                  color: "#ffffff",
                  fontFamily: "'EB Garamond', Georgia, serif",
                }}
              >
                A Private Message Awaits You
              </h2>

              {/* Subtitle */}
              <p
                className="font-serif italic text-base mb-6"
                style={{
                  color: "#d97706",
                  fontFamily: "'EB Garamond', Georgia, serif",
                }}
              >
                From your children at Adamimogo Grace Assembly, Ibadan
              </p>

              {/* Divider */}
              <div
                className="mx-auto mb-8"
                style={{
                  width: 80,
                  height: 2,
                  background:
                    "linear-gradient(90deg, transparent, #c9a84c, transparent)",
                }}
              />

              {/* Passcode input */}
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your key..."
                className="w-full max-w-xs mx-auto block text-center text-base py-3 px-4 rounded-none mb-6 outline-none transition-all duration-300"
                style={{
                  background: "#3d0000",
                  borderBottom: "2px solid #d97706",
                  color: "#ffffff",
                  caretColor: "#d97706",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.15em",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = "0 4px 20px rgba(217,119,6,0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = "none";
                }}
              />

              {/* Error */}
              {error && (
                <p className="text-sm italic mb-4" style={{ color: "#ef4444" }}>
                  {error}
                </p>
              )}

              {/* Unlock button */}
              <motion.button
                onClick={handleUnlock}
                className="px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #d97706, #f59e0b)",
                  color: "#1a0000",
                  boxShadow: "0 4px 20px #d9770666",
                }}
                whileHover={{ y: -3, boxShadow: "0 8px 32px #d97706aa" }}
                whileTap={{ scale: 0.97 }}
              >
                Unlock 🔓
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Revealed card — Ibadan Assembly private blessing letter */}
              <div
                className="rounded-2xl text-left"
                style={{
                  background: "#2a0000",
                  border: "2px solid #c9a84c",
                  boxShadow:
                    "0 0 50px #c9a84c55, 0 0 100px #c9a84c22, inset 0 0 40px rgba(217,119,6,0.04)",
                }}
              >
                {/* Card header */}
                <div
                  className="flex items-center gap-3 px-6 pt-6 pb-4 border-b"
                  style={{ borderColor: "rgba(201,168,76,0.25)" }}
                >
                  <div className="text-3xl">🕊️</div>
                  <div>
                    <p
                      className="text-xs tracking-[0.25em] uppercase font-semibold"
                      style={{ color: "#c9a84c" }}
                    >
                      Adamimogo Grace Assembly, Ibadan
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      A Private Blessing — 25th May 2026
                    </p>
                  </div>
                </div>

                {/* Letter body */}
                <div className="px-6 py-6 space-y-5">
                  {/* Salutation */}
                  <p
                    className="font-serif font-bold text-xl md:text-2xl"
                    style={{
                      color: "#ffffff",
                      fontFamily: "'EB Garamond', Georgia, serif",
                    }}
                  >
                    Our Dearest Father in the Lord,
                  </p>
                  <p
                    className="font-serif italic text-lg leading-relaxed"
                    style={{
                      color: "#d97706",
                      fontFamily: "'EB Garamond', Georgia, serif",
                    }}
                  >
                    Prophet Sam Olu Alo
                  </p>

                  {/* Divider */}
                  <div
                    style={{
                      width: 60,
                      height: 1,
                      background:
                        "linear-gradient(90deg, #c9a84c, transparent)",
                    }}
                  />

                  {/* Body paragraphs */}
                  <p
                    className="text-sm md:text-base leading-7"
                    style={{ color: "rgba(255,255,255,0.78)" }}
                  >
                    From the hills of Ibadan, where your voice first broke the
                    silence of a generation, your children at Adamimogo Grace
                    Assembly rise with one heart and one voice on this sacred
                    day to honour the man God sent to us. You did not come to us
                    with enticing words of man's wisdom — you came with a
                    demonstration of the Spirit and of power.
                  </p>

                  <p
                    className="text-sm md:text-base leading-7"
                    style={{ color: "rgba(255,255,255,0.78)" }}
                  >
                    We remember the early mornings of prayer. We remember the
                    altar calls that shook the ground beneath our feet. We
                    remember the tears, the healings, the deliverances — souls
                    snatched from darkness into his marvellous light because a
                    man obeyed the call of God without compromise. That man is
                    you.
                  </p>

                  <p
                    className="text-sm md:text-base leading-7"
                    style={{ color: "rgba(255,255,255,0.78)" }}
                  >
                    Daddy, Ibadan loves you. The assembly you planted in this
                    ancient city stands as a testament that the fire you carry
                    is not ordinary. It burns in us. It has changed our homes,
                    our families, our destinies. No words are sufficient — but
                    we offer you these words as a small token of the
                    immeasurable gratitude overflowing in our hearts.
                  </p>

                  {/* Gold scripture block */}
                  <div
                    className="rounded-xl px-5 py-4 my-2"
                    style={{
                      background: "rgba(201,168,76,0.08)",
                      borderLeft: "3px solid #c9a84c",
                    }}
                  >
                    <p
                      className="font-serif italic text-base md:text-lg leading-relaxed"
                      style={{
                        color: "#c9a84c",
                        fontFamily: "'EB Garamond', Georgia, serif",
                      }}
                    >
                      "The LORD bless you and keep you; the LORD make his face
                      shine on you and be gracious to you; the LORD turn his
                      face toward you and give you peace."
                    </p>
                    <p
                      className="text-xs mt-2 font-semibold tracking-widest uppercase"
                      style={{ color: "rgba(201,168,76,0.6)" }}
                    >
                      — Numbers 6:24–26
                    </p>
                  </div>

                  <p
                    className="text-sm md:text-base leading-7"
                    style={{ color: "rgba(255,255,255,0.78)" }}
                  >
                    May every seed you have sown across nations return to you
                    multiplied. May your strength be renewed like the eagle's.
                    May your latter years be greater than your former years —
                    not because you deserve anything less, but because our God
                    is a God of increase and overflow. Happy Birthday, Daddy.
                    Heaven celebrates you today.
                  </p>

                  {/* Closing */}
                  <div
                    className="pt-2 border-t"
                    style={{ borderColor: "rgba(201,168,76,0.2)" }}
                  >
                    <p
                      className="font-serif italic text-base"
                      style={{
                        color: "#d97706",
                        fontFamily: "'EB Garamond', Georgia, serif",
                      }}
                    >
                      With hearts full of love and reverence,
                    </p>
                    <p
                      className="font-serif font-bold text-lg mt-1"
                      style={{
                        color: "#ffffff",
                        fontFamily: "'EB Garamond', Georgia, serif",
                      }}
                    >
                      Your children — Adamimogo Grace Assembly, Ibadan
                    </p>
                    <p
                      className="text-xs tracking-widest uppercase mt-1"
                      style={{ color: "rgba(201,168,76,0.5)" }}
                    >
                      25th May 2026 🔥
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
