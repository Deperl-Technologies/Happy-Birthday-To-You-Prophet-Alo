import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import ProjectIcon from "./ProjectIcon.jsx";

export default function FooterSection() {
  return (
    <footer
      className="py-16 relative overflow-hidden"
      style={{ background: "#fdf8f0" }}
    >
      {/* Top amber gold divider */}
      <div
        className="absolute top-0 inset-x-0 h-0.5"
        style={{ background: "linear-gradient(90deg, transparent, #c9a84c 30%, #d97706 50%, #c9a84c 70%, transparent)" }}
      />

      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Diamond ornament */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ProjectIcon icon={Flame} size={16} tone="light" />
        </motion.div>

        {/* Honour line */}
        <motion.p
          className="font-serif italic text-sm mb-3"
          style={{
            color: "#8b0000",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          In honour of a man sent by God
        </motion.p>

        {/* Name */}
        <motion.h2
          className="font-serif font-bold text-3xl md:text-4xl mb-3"
          style={{
            color: "#1a0000",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Prophet Sam Olu Alo
        </motion.h2>

        {/* Church */}
        <motion.p
          className="text-xs tracking-[0.3em] uppercase mb-6 font-semibold"
          style={{ color: "#c9a84c" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          C.A.C Grace of Mercy · Adamimogo Worldwide
        </motion.p>

        {/* Thin amber divider */}
        <motion.div
          className="mx-auto mb-8"
          style={{
            width: 120,
            height: 1,
            background: "linear-gradient(90deg, transparent, #d97706, transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        />

        {/* CTA Button */}
        <motion.a
          href="https://celebrate-prophet-sam-alo-birthday.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm mb-10 transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #d97706, #f59e0b)",
            color: "#1a0000",
            boxShadow: "0 4px 20px #d9770644",
          }}
          whileHover={{ y: -3, boxShadow: "0 8px 32px #d97706aa" }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span>🙏</span>
          <span>Send Your Birthday Wish</span>
        </motion.a>

        {/* Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <a
            href="https://portfoliozone.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors duration-200 hover:text-red-700"
            style={{ color: "#8b0000" }}
          >
            Built with ❤️ by Adeperl🍁 Innovations
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
