"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
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
    <motion.div
      aria-hidden="true"
      className="group relative mx-auto aspect-[3/4] w-full max-w-[31rem] [perspective:1100px]"
      whileHover={reduced ? undefined : { rotateY: -2.5, rotateX: 1.5, scale: 1.015 }}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[2.2rem] border border-gold/20 shadow-[0_38px_100px_rgb(0_0_0_/_0.48)]"
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
      >
        <Image
          src="/images/buna-ceremony-v2.webp"
          alt=""
          fill
          sizes="(max-width: 1024px) 90vw, 500px"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgb(18_11_8_/_0.88)_100%)]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-6 bottom-6 flex items-end justify-between"
          >
            <span className="font-ethiopic text-3xl text-gold">{stages[stage].fidel}</span>
            <span className="rounded-full border border-injera/25 bg-teff/55 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-injera backdrop-blur-md">
              {stages[stage].title}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute -inset-5 -z-10 rounded-[2.8rem] bg-[radial-gradient(circle_at_60%_40%,rgb(226_169_59_/_0.2),transparent_68%)] blur-2xl" />
    </motion.div>
  );
}
