"use client";

import { motion, useReducedMotion } from "framer-motion";

const phrases = [
  { fidel: "እንኳን ደህና መጡ", latin: "Welcome" },
  { fidel: "ቡና", latin: "Buna" },
  { fidel: "እንጀራ", latin: "Injera" },
  { fidel: "ቤተሰብ", latin: "Family" },
  { fidel: "አብሮነት", latin: "Togetherness" },
];

function PhraseSet() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      {phrases.map((phrase) => (
        <div key={phrase.fidel} className="flex items-center gap-3 whitespace-nowrap">
          <span className="font-ethiopic text-lg text-injera sm:text-xl">
            {phrase.fidel}
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">
            {phrase.latin}
          </span>
          <span aria-hidden="true" className="ml-3 h-1.5 w-1.5 rotate-45 bg-berbere" />
        </div>
      ))}
    </div>
  );
}

export default function FidelMarquee() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Words of welcome and togetherness in Amharic"
      className="overflow-hidden border-y border-border bg-teff-panel-2 py-4"
    >
      <motion.div
        className="flex w-max"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduced
            ? undefined
            : { duration: 26, ease: "linear", repeat: Infinity }
        }
      >
        <PhraseSet />
        <div aria-hidden="true">
          <PhraseSet />
        </div>
      </motion.div>
    </section>
  );
}
