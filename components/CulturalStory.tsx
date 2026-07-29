"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
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
    <motion.div
      aria-hidden="true"
      className="absolute inset-0"
      animate={reduced ? undefined : { scale: [1, 1.025, 1] }}
      transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
    >
      <Image src="/images/buna-ceremony-v2.webp" alt="" fill sizes="(max-width: 1024px) 92vw, 680px" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(20_12_8_/_0.95)_0%,rgb(20_12_8_/_0.72)_52%,rgb(20_12_8_/_0.18)_100%)]" />
    </motion.div>
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
