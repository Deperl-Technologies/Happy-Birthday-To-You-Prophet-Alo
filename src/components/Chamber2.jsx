import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHAMBER2_CODE = "PROPHET2026";
const UNLOCK_DATE = new Date("2026-05-25T00:00:00");

export default function Chamber2() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const isRevealDayOrLater = new Date() >= UNLOCK_DATE;

  const handleUnlock = () => {
    if (code.trim().toUpperCase() === CHAMBER2_CODE) {
      setError("");
      setUnlocked(true);
    } else {
      setError("Incorrect passcode. The chamber remains sealed.");
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
      {/* Amber radial fire glow — more intense than Chamber 1 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245,158,11,0.10) 0%, rgba(217,119,6,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #c9a84c, transparent)",
        }}
      />

      <div className="max-w-xl mx-auto px-4 relative z-10 w-full text-center">
        <AnimatePresence mode="wait">
          {!isRevealDayOrLater ? (
            <motion.div
              key="reveal-notice"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl px-6 py-8 md:px-8 md:py-10"
              style={{
                background: "rgba(26,0,0,0.72)",
                border: "1px solid rgba(201,168,76,0.35)",
                boxShadow: "0 0 40px rgba(217,119,6,0.12)",
              }}
            >
              <div
                className="text-6xl mb-5 crown-pulse inline-block"
                style={{ filter: "drop-shadow(0 0 24px #d97706)" }}
              >
                👑
              </div>

              <h2
                className="font-serif font-bold mb-4"
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(2rem, 6vw, 3.25rem)",
                  fontFamily: "'EB Garamond', Georgia, serif",
                  textShadow: "0 0 30px #d9770666",
                }}
              >
                The Prophet's Grand Chamber
              </h2>

              <p
                className="font-serif italic text-base md:text-lg mb-4"
                style={{
                  color: "#d97706",
                  fontFamily: "'EB Garamond', Georgia, serif",
                }}
              >
                This chamber will be revealed on 25th May 2026, the celebrant’s day.
              </p>

              <div
                className="mx-auto mb-5"
                style={{
                  width: 100,
                  height: 2,
                  background:
                    "linear-gradient(90deg, transparent, #c9a84c, transparent)",
                }}
              />

              <p
                className="text-sm md:text-base leading-7"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                A sacred message is being held in reserve for the celebration day. Come
                back on 25th May 2026 to witness the full unveiling of the chamber.
              </p>

              <div
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.25)",
                  color: "#c9a84c",
                }}
              >
                <span>📣</span>
                <span>Reveal scheduled for 25th May 2026</span>
              </div>
            </motion.div>
          ) : !unlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
            >
              {/* Crown icon — grand */}
              <motion.div
                className="text-7xl mb-6 crown-pulse inline-block"
                style={{ filter: "drop-shadow(0 0 24px #d97706)" }}
              >
                👑
              </motion.div>

              {/* Heading */}
              <h2
                className="font-serif font-bold mb-4"
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(2rem, 6vw, 3.5rem)",
                  fontFamily: "'EB Garamond', Georgia, serif",
                  textShadow: "0 0 30px #d9770666",
                }}
              >
                The Prophet's Grand Chamber
              </h2>

              {/* Subtitle */}
              <p
                className="font-serif italic text-base mb-6"
                style={{
                  color: "#d97706",
                  fontFamily: "'EB Garamond', Georgia, serif",
                }}
              >
                A sacred message sealed for you alone — from Adamimogo Worldwide
              </p>

              {/* Divider */}
              <div
                className="mx-auto mb-8"
                style={{
                  width: 100,
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
                className="w-full max-w-xs mx-auto block text-center text-base py-4 px-4 rounded-none mb-6 outline-none transition-all duration-300"
                style={{
                  background: "#3d0000",
                  borderBottom: "2px solid #c9a84c",
                  color: "#ffffff",
                  caretColor: "#c9a84c",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.2em",
                  fontSize: "1.1rem",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = "0 6px 24px rgba(201,168,76,0.35)";
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
                className="px-10 py-4 rounded-full font-semibold text-base transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #c9a84c, #d97706, #f59e0b)",
                  color: "#1a0000",
                  boxShadow: "0 4px 24px #c9a84c88",
                  fontSize: "1rem",
                }}
                whileHover={{ y: -4, boxShadow: "0 10px 40px #c9a84caa" }}
                whileTap={{ scale: 0.97 }}
              >
                Open The Chamber 🔓
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Revealed card — Grand Adamimogo Worldwide blessing letter */}
              <div
                className="rounded-2xl text-left"
                style={{
                  background:
                    "linear-gradient(160deg, #2a0000 0%, #1a0000 100%)",
                  border: "2px solid #c9a84c",
                  boxShadow:
                    "0 0 60px #c9a84c66, 0 0 120px #d9770633, inset 0 0 60px rgba(217,119,6,0.05)",
                }}
              >
                {/* Crown header */}
                <div
                  className="flex flex-col items-center py-8 px-6 border-b"
                  style={{ borderColor: "rgba(201,168,76,0.3)" }}
                >
                  <div
                    className="text-5xl mb-3"
                    style={{ filter: "drop-shadow(0 0 20px #d97706)" }}
                  >
                    👑
                  </div>
                  <h3
                    className="font-serif font-bold text-2xl md:text-3xl text-center"
                    style={{
                      color: "#c9a84c",
                      fontFamily: "'EB Garamond', Georgia, serif",
                      textShadow: "0 0 20px rgba(201,168,76,0.5)",
                    }}
                  >
                    A Royal Proclamation
                  </h3>
                  <p
                    className="text-xs tracking-[0.3em] uppercase mt-2"
                    style={{ color: "rgba(201,168,76,0.6)" }}
                  >
                    From Adamimogo Worldwide · 25th May 2026
                  </p>
                </div>

                {/* Letter body */}
                <div className="px-6 py-8 space-y-5">
                  {/* Salutation */}
                  <p
                    className="font-serif font-bold text-xl md:text-2xl text-center"
                    style={{
                      color: "#ffffff",
                      fontFamily: "'EB Garamond', Georgia, serif",
                    }}
                  >
                    To the Revered Prophet Sam Olu Alo
                  </p>
                  <p
                    className="font-serif italic text-center text-base"
                    style={{
                      color: "rgba(217,119,6,0.8)",
                      fontFamily: "'EB Garamond', Georgia, serif",
                    }}
                  >
                    Founder & General Overseer · Adamimogo Worldwide
                  </p>

                  {/* Gold center ornament */}
                  <div className="flex justify-center py-1">
                    <div
                      style={{
                        width: 80,
                        height: 2,
                        background:
                          "linear-gradient(90deg, transparent, #c9a84c, transparent)",
                      }}
                    />
                  </div>

                  <p
                    className="text-sm md:text-base leading-7"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    From Lagos to London. From Ibadan to Toronto. From Ido-Ekiti
                    to the frozen shores of Finland. Wherever the fire of
                    Adamimogo has landed, a people have risen today with one
                    unified voice to declare: blessed is the man who answered
                    the call.
                  </p>

                  <p
                    className="text-sm md:text-base leading-7"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    Prophet, your life has been a living epistle — read of all
                    men across every continent where God has carried your
                    anointing. You built when others quit. You interceded when
                    others slept. You crossed oceans so the gospel could light
                    fires in places that had never heard the name of Jesus
                    preached under that sacred Adamimogo fire.
                  </p>

                  {/* Grand gold scripture */}
                  <div
                    className="rounded-2xl px-6 py-6 my-3 text-center"
                    style={{
                      background: "rgba(201,168,76,0.07)",
                      border: "1px solid rgba(201,168,76,0.3)",
                      boxShadow: "0 0 30px rgba(201,168,76,0.08)",
                    }}
                  >
                    <p
                      className="font-serif italic text-lg md:text-xl leading-relaxed"
                      style={{
                        color: "#c9a84c",
                        fontFamily: "'EB Garamond', Georgia, serif",
                      }}
                    >
                      "Well done, good and faithful servant. You have been
                      faithful over a little; I will set you over much. Enter
                      into the joy of your master."
                    </p>
                    <p
                      className="text-xs mt-3 tracking-widest uppercase"
                      style={{ color: "rgba(201,168,76,0.55)" }}
                    >
                      — Matthew 25:23
                    </p>
                  </div>

                  <p
                    className="text-sm md:text-base leading-7"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    Today, the entirety of Adamimogo Worldwide — every branch,
                    every soul, every son and daughter you fathered in the
                    Spirit — stands as your crown of rejoicing. You are not
                    finished. The greatest chapters of your story are still
                    being written by the hand of the Almighty. Your voice still
                    carries fire. Your prayers still shake heavens.
                  </p>

                  <p
                    className="text-sm md:text-base leading-7"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    We decree over you today: long life and satisfaction. We
                    decree: supernatural health and renewed strength. We decree:
                    greater influence, greater harvest, greater joy — pressed
                    down, shaken together, running over. The fire in you shall
                    never go out.
                  </p>

                  {/* Worldwide signatures */}
                  <div
                    className="rounded-xl p-5 mt-2"
                    style={{
                      background: "rgba(26,0,0,0.6)",
                      border: "1px solid rgba(217,119,6,0.2)",
                    }}
                  >
                    <p
                      className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
                      style={{ color: "#d97706" }}
                    >
                      United in love from every nation:
                    </p>
                    <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                      {[
                        "🇳🇬 Lagos, Nigeria",
                        "🇳🇬 Ibadan, Nigeria",
                        "🇳🇬 Ido-Ekiti, Nigeria",
                        "🇳🇬 Abeokuta, Nigeria",
                        "🇬🇧 Dagenham, London",
                        "🇨🇦 Toronto, Canada",
                        "🇫🇮 Finland",
                        "🌍 Nations Worldwide",
                      ].map((loc) => (
                        <p
                          key={loc}
                          className="text-xs"
                          style={{ color: "rgba(255,255,255,0.55)" }}
                        >
                          {loc}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Grand closing */}
                  <div
                    className="pt-4 text-center border-t"
                    style={{ borderColor: "rgba(201,168,76,0.2)" }}
                  >
                    <div className="text-3xl mb-3">🔥</div>
                    <p
                      className="font-serif italic text-lg md:text-xl"
                      style={{
                        color: "#d97706",
                        fontFamily: "'EB Garamond', Georgia, serif",
                      }}
                    >
                      Happy Birthday, Prophet Sam Olu Alo.
                    </p>
                    <p
                      className="font-serif font-bold text-xl md:text-2xl mt-1"
                      style={{
                        color: "#ffffff",
                        fontFamily: "'EB Garamond', Georgia, serif",
                      }}
                    >
                      Heaven celebrates you. Earth honours you.
                    </p>
                    <p
                      className="text-xs tracking-widest uppercase mt-3"
                      style={{ color: "rgba(201,168,76,0.5)" }}
                    >
                      Adamimogo Worldwide · 25th May 2026 👑
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
