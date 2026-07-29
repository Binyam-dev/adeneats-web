"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function StoryInterlude() {
  const reduced = useReducedMotion();
  return (
    <section aria-label="The order travels from customer to cook" className="relative grid min-h-[76svh] place-items-center overflow-hidden bg-berbere-deep px-5 py-24">
      <div aria-hidden="true" className="hero-grain absolute inset-0 opacity-30" />
      <div className="relative max-w-6xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">From one home to another</p>
        <h2 className="mt-8 font-display text-[clamp(3.8rem,10vw,10rem)] leading-[0.78] tracking-[-0.055em] text-injera">
          The order moves.
          <motion.span
            className="block italic text-gold"
            animate={reduced ? undefined : { letterSpacing: ["-0.05em", "-0.015em", "-0.05em"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            The care stays.
          </motion.span>
        </h2>
      </div>
      <motion.span
        aria-hidden="true"
        className="absolute bottom-[16%] left-[12%] grid h-14 w-14 place-items-center rounded-full bg-gold font-bold text-teff shadow-2xl"
        animate={reduced ? undefined : { x: ["0vw", "68vw"], rotate: [0, 360] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        ↗
      </motion.span>
    </section>
  );
}
