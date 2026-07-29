"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "./Container";

const stages = [
  {
    id: "roast",
    fidel: "ቡና መቁላት",
    title: "Roast",
    body: "Green coffee beans are washed and roasted until their aroma fills the room—an invitation before the first cup is poured.",
  },
  {
    id: "brew",
    fidel: "ጀበና",
    title: "Brew",
    body: "Freshly ground coffee meets hot water in the jebena. Patience, fragrance, and conversation are all part of the preparation.",
  },
  {
    id: "share",
    fidel: "አብሮነት",
    title: "Share",
    body: "Small cups move from hand to hand. The ceremony creates space to listen, laugh, reconnect, and welcome another round.",
  },
] as const;

export default function CoffeeCeremony() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const stage = stages[active];

  return (
    <section className="overflow-hidden border-y border-border bg-teff-panel-2 py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">The buna ceremony</p>
            <h2 className="mt-4 max-w-[14ch] font-display text-display-lg text-injera sm:text-[2.8rem]">
              A ritual measured in conversation, not minutes.
            </h2>
            <p className="mt-5 max-w-[56ch] text-injera-dim">
              Explore a simplified journey through one of Ethiopia and Eritrea&apos;s most enduring forms of hospitality.
            </p>
            <div role="tablist" aria-label="Coffee ceremony stages" className="mt-8 flex flex-wrap gap-3">
              {stages.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-controls="coffee-stage-panel"
                  onClick={() => setActive(index)}
                  className={`min-h-12 rounded-full border px-5 text-sm font-semibold transition-colors ${
                    active === index
                      ? "border-gold bg-gold text-teff"
                      : "border-border text-injera-dim hover:border-injera/30 hover:text-injera"
                  }`}
                >
                  <span className="mr-2 font-ethiopic">{item.fidel}</span>
                  {item.title}
                </button>
              ))}
            </div>
            <div id="coffee-stage-panel" role="tabpanel" className="mt-8 min-h-36">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.id}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="font-ethiopic text-xl text-gold">{stage.fidel}</p>
                  <h3 className="mt-2 font-display text-3xl text-injera">{stage.title}</h3>
                  <p className="mt-3 max-w-[50ch] leading-relaxed text-injera-dim">{stage.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <CoffeeStageArt stage={active} reduced={Boolean(reduced)} />
        </div>
      </Container>
    </section>
  );
}

function CoffeeStageArt({ stage, reduced }: { stage: number; reduced: boolean }) {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[28rem]">
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(226_169_59_/_0.16),transparent_65%)] blur-xl" />
      <motion.div
        className="absolute inset-[13%] rounded-full border border-gold/20"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 36, ease: "linear", repeat: Infinity }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="absolute left-1/2 top-1/2 h-2.5 w-1.5 rounded-[50%_50%_45%_45%] bg-berbere"
            style={{ transform: `rotate(${index * 30}deg) translateY(-10.3rem) rotate(22deg)` }}
          />
        ))}
      </motion.div>
      <svg viewBox="0 0 360 360" className="absolute inset-0 h-full w-full">
        <ellipse cx="180" cy="303" rx="112" ry="18" fill="rgb(0 0 0 / .25)" />
        <motion.g
          animate={reduced ? undefined : stage === 1 ? { y: [0, -4, 0] } : { y: 0 }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <path d="M124 104h112l-12 153c-2 25-23 44-48 44h-1c-25 0-46-20-48-45l-3-152Z" fill="#7a2412" />
          <path d="M136 104c0-35 18-60 45-60s45 25 45 60" fill="#e2a93b" />
          <path d="M230 137c59-12 73 25 42 46-13 9-27 9-43 4" fill="none" stroke="#e2a93b" strokeWidth="12" strokeLinecap="round" />
          <path d="M145 157c24 9 48 9 72 0M148 211c22 8 43 8 65 0" fill="none" stroke="#e2a93b" strokeWidth="5" opacity=".65" />
          <circle cx="181" cy="97" r="10" fill="#231812" />
        </motion.g>
        {stage === 2 && (
          <motion.path
            d="M252 180c32 5 45 23 50 46"
            fill="none"
            stroke="#e2a93b"
            strokeWidth="5"
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
        )}
      </svg>
      {stage !== 0 && <span className="coffee-art-steam coffee-art-steam-a" />}
      {stage !== 0 && <span className="coffee-art-steam coffee-art-steam-b" />}
    </div>
  );
}
