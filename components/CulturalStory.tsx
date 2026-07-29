"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "./Container";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CulturalStory() {
  const reduced = useReducedMotion();

  return (
    <section id="culture" className="relative overflow-hidden py-24 sm:py-28">
      <div aria-hidden="true" className="culture-halo culture-halo-left" />
      <div aria-hidden="true" className="culture-halo culture-halo-right" />
      <Container className="relative">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="flex flex-col justify-between rounded-[var(--radius-panel)] border border-gold/20 bg-teff-panel p-7 sm:p-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  More than a meal
                </p>
                <h2 className="mt-4 max-w-[12ch] font-display text-display-lg text-injera sm:text-[2.75rem]">
                  The table is where welcome becomes belonging.
                </h2>
                <p className="mt-5 max-w-[42ch] text-injera-dim">
                  Habesha food is built for sharing: one injera, many hands,
                  stories moving around the table. Aden carries that spirit
                  into every neighborhood connection.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-4 border-t border-border pt-6">
                <span className="font-ethiopic text-3xl text-gold">እንብላ</span>
                <span className="text-sm text-injera-dim">
                  Enbela — let&apos;s eat.
                </span>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <motion.article
                whileHover={reduced ? undefined : { y: -5, rotateX: 1.5, rotateY: -1.5 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="culture-card culture-card-buna relative min-h-[21rem] overflow-hidden rounded-[var(--radius-panel)] border border-berbere/25 p-7 [transform-style:preserve-3d] sm:col-span-2 sm:p-9"
              >
                <BunaScene reduced={Boolean(reduced)} />
                <div className="relative z-10 sm:max-w-[25rem]">
                  <span className="font-ethiopic text-lg text-gold">ቡና</span>
                  <h3 className="mt-3 font-display text-3xl text-injera">
                    Buna makes time for people.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-injera-dim sm:text-base">
                    Coffee is roasted, brewed, poured, and shared with care.
                    The ceremony turns an ordinary visit into time together.
                  </p>
                </div>
              </motion.article>

              <motion.article
                whileHover={reduced ? undefined : { y: -5, rotateX: -1.5, rotateY: 1.5 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="culture-card relative overflow-hidden rounded-[var(--radius-panel)] border border-teal/25 bg-teal-tint p-7"
              >
                <InjeraMotif />
                <div className="relative z-10">
                  <span className="font-ethiopic text-lg text-teal">እንጀራ</span>
                  <h3 className="mt-3 font-display text-2xl text-injera">
                    Injera holds the table together.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-injera-dim">
                    Tangy, soft, and made to be shared—it is plate, utensil,
                    and the heart of the meal.
                  </p>
                </div>
              </motion.article>

              <motion.article
                whileHover={reduced ? undefined : { y: -5, rotateX: 1.5, rotateY: 1.5 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="culture-card relative overflow-hidden rounded-[var(--radius-panel)] border border-gold/25 bg-gold-tint p-7"
              >
                <GurshaMark />
                <div className="relative z-10">
                  <span className="font-ethiopic text-lg text-gold">ጉርሻ</span>
                  <h3 className="mt-3 font-display text-2xl text-injera">
                    Gursha is a gesture of care.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-injera-dim">
                    Offering a bite to someone else turns food into affection,
                    respect, and playful connection.
                  </p>
                </div>
              </motion.article>
            </div>
        </div>
      </Container>
    </section>
  );
}

function BunaScene({ reduced }: { reduced: boolean }) {
  return (
    <div aria-hidden="true" className="absolute inset-y-0 right-0 w-[48%] min-w-48 opacity-35 sm:opacity-100">
      <motion.svg
        viewBox="0 0 320 320"
        className="absolute bottom-[-3rem] right-[-3rem] w-[22rem] max-w-none text-berbere"
        animate={reduced ? undefined : { y: [0, -5, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      >
        <ellipse cx="170" cy="271" rx="98" ry="20" fill="rgb(0 0 0 / .22)" />
        <path d="M125 89c0-31 24-55 54-55s54 24 54 55v25h-108V89Z" fill="#e2a93b" opacity=".9" />
        <path d="M112 111h133l-13 127c-2 20-19 35-39 35h-29c-21 0-38-16-40-37l-12-125Z" fill="#7a2412" />
        <path d="M238 130c53-13 66 17 42 36-14 11-28 8-42 2" fill="none" stroke="#e2a93b" strokeWidth="11" strokeLinecap="round" />
        <path d="M140 139c24 10 51 10 76 0" fill="none" stroke="#e2a93b" strokeWidth="5" opacity=".7" />
        <path d="M151 188c17 8 38 8 55 0" fill="none" stroke="#e2a93b" strokeWidth="5" opacity=".55" />
        <circle cx="179" cy="86" r="10" fill="#231812" />
      </motion.svg>
      <span className="buna-steam buna-steam-one" />
      <span className="buna-steam buna-steam-two" />
      <span className="buna-steam buna-steam-three" />
    </div>
  );
}

function InjeraMotif() {
  return (
    <div aria-hidden="true" className="absolute -right-14 -top-14 h-48 w-48 rounded-full border border-injera/10 bg-injera/[0.04]">
      <div className="injera-texture absolute inset-3 rounded-full" />
      <div className="absolute inset-7 rounded-full border border-teal/20" />
    </div>
  );
}

function GurshaMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 160"
      className="absolute -right-6 -top-5 h-40 w-40 text-gold opacity-15"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    >
      <path d="M23 113c27-2 38-25 47-46 7-17 16-31 27-25 9 5 1 19-5 31" />
      <path d="M64 110c25-1 42-15 53-34 8-14 20-25 29-17 8 7-4 20-12 29-17 20-27 39-57 45" />
      <path d="M64 74c-7-13-19-24-28-16-8 8 5 20 14 30" />
    </svg>
  );
}
