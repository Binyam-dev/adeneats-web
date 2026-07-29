import { motion } from "framer-motion";

const words = ["Food", "made", "with", "love.", "Delivered", "with", "care."] as const;

export default function KineticHeadline() {
  return (
    <h1 className="max-w-[11ch] font-display text-[clamp(3.5rem,7.8vw,7.2rem)] leading-[0.88] tracking-[-0.045em] text-injera">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={false}
          className={`kinetic-word mr-[0.18em] inline-block [transform-origin:50%_100%] ${
            word === "love." || word === "care." ? "italic text-gold" : ""
          }`}
          style={{ animationDelay: `${index * 70}ms` }}
        >
          {word}
          {word === "love." && <br />}
        </motion.span>
      ))}
    </h1>
  );
}
