import { motion } from "framer-motion";

const milestones = [
  {
    title: "Born in Ido-Ekiti",
    desc: "Ekiti State, Nigeria. A destiny rooted in the red soil of Ekiti — chosen before the foundations of the world.",
  },
  {
    title: "The Divine Calling",
    desc: "Received the call of God and founded C.A.C Grace of Mercy Prayer Mountain — a fire that has never gone out.",
  },
  {
    title: "Baba Ori Oke — Oke Erio",
    desc: "Spent 14 years on Ori Oke Anu, Erio Ekiti — interceding, warring, and forging a prophetic mantle on the mountain that named him The Mountain Father.",
  },
  {
    title: "International Headquarters",
    desc: "Established at CAC Power House, Ogombo, Ajah, Lagos State — the nerve centre of the Adamimogo movement.",
  },
  {
    title: "Ikeji Arakeji",
    desc: "Coordinator of the C.A.C Babalola Memorial International Camp — honouring the legacy of the Apostle of faith.",
  },
  {
    title: "School of Prayer",
    desc: "Founded the Adamimogo School of Prayer and Prophetic Ministry — training sons and daughters in the fire.",
  },
  {
    title: "Finland — The Nordic Breakthrough",
    desc: "Planted the first C.A.C in Finland. The gospel of fire crossed into Scandinavia and changed a nation.",
  },
  {
    title: "Global Expansion",
    desc: "Church branches in UK (Dagenham), Canada (Toronto), and across Europe. Nations received the anointing.",
  },
  {
    title: "Adamimogo FM",
    desc: "Founded a radio empire spanning Lagos, Ibadan, Ido-Ekiti and Abeokuta — the airwaves filled with holy fire.",
  },
  {
    title: "Author & Songwriter",
    desc: "Published books of prophetic depth and composed soul-lifting worship anthologies that still echo in heaven.",
  },
  {
    title: "Philanthropist & Spiritual Father",
    desc: "A father to many sons and daughters across nations — his love poured out like the oil that never runs dry.",
  },
];

const cardVariant = {
  hidden: { opacity: 0, x: -48 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function HisStory() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Subtle top fire glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "60%",
          height: "2px",
          background: "linear-gradient(90deg, transparent, #d97706, transparent)",
        }}
      />

      <div className="max-w-3xl mx-auto px-4">
        {/* Section label */}
        <motion.p
          className="text-center text-xs tracking-[0.2em] md:tracking-[0.35em] uppercase mb-4 font-medium"
          style={{ color: "#d97706" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          The Man · The Calling · The Legacy
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-serif text-center text-4xl md:text-5xl font-bold mb-3 hero-text-glow"
          style={{
            color: "#f5f0eb",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          His Story
        </motion.h2>

        {/* Amber underline */}
        <motion.div
          className="mx-auto mb-4"
          style={{
            width: 80,
            height: 3,
            background: "linear-gradient(90deg, transparent, #d97706, transparent)",
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
            color: "rgba(255,255,255,0.6)",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          A life written by the hand of God
        </motion.p>

        {/* Amber divider */}
        <motion.div
          className="w-full h-px mb-12"
          style={{ background: "linear-gradient(90deg, transparent, #d97706, transparent)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical amber line — offset correctly for all screen sizes */}
          <div
            className="absolute top-0 bottom-0 w-0.5"
            style={{
              left: "15px",
              background: "linear-gradient(to bottom, #d97706, #6b0000)",
            }}
          />

          <div className="flex flex-col gap-6 md:gap-8">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="flex items-start"
                style={{ gap: "1rem" }}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Dot — fixed size, centred on the line */}
                <div className="relative flex-shrink-0" style={{ width: 32, paddingTop: 18 }}>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: "#d97706",
                      border: "2px solid #f59e0b",
                      boxShadow: "0 0 10px #d9770688",
                      position: "absolute",
                      left: 7,
                      top: 18,
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-lg transition-all duration-300"
                  style={{
                    background: "#6b0000",
                    borderLeft: "4px solid #d97706",
                    padding: "clamp(0.875rem, 3vw, 1.25rem)",
                  }}
                >
                  <h3
                    className="font-serif font-bold mb-2"
                    style={{
                      color: "#ffffff",
                      fontFamily: "'EB Garamond', Georgia, serif",
                      fontSize: "clamp(1rem, 3vw, 1.2rem)",
                    }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.72)",
                      fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                    }}
                  >
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing scripture */}
        <motion.p
          className="font-serif italic text-center text-lg mt-14"
          style={{
            color: "#d97706",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          "Before I formed you in the womb I knew you — Jeremiah 1:5"
        </motion.p>
      </div>
    </section>
  );
}
