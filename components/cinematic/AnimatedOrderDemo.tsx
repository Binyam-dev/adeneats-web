"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fulfillmentStatuses, orderSteps } from "@/data/cinematic";
import Container from "@/components/Container";
import SceneHeading from "./SceneHeading";

export default function AnimatedOrderDemo() {
  const reduced = useReducedMotion();

  return (
    <section id="journey" className="cinematic-scene overflow-hidden bg-injera py-24 text-teff sm:py-32">
      <Container>
        <SceneHeading
          chapter="04"
          eyebrow="The future experience"
          title={<>From a story on your screen to <em className="text-berbere">dinner at home.</em></>}
          body="This interface is a clearly labeled product demonstration. Live meals, prices, ratings, availability, and ordering will arrive with the app."
          theme="light"
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative mx-auto w-full max-w-[22rem] rounded-[2.8rem] border-[10px] border-teff bg-teff p-3 shadow-[0_40px_90px_rgb(35_24_18_/_0.28)]">
            <div className="rounded-[2rem] bg-teff-panel p-5 text-injera">
              <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-injera/20" />
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold">App concept · not live</p>
              <h3 className="mt-3 font-display text-3xl">Almaz’s kitchen</h3>
              <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl border border-injera/10">
                <Image
                  src="/images/dishes/doro-wat.webp"
                  alt="Doro wat with chicken and egg served on injera"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(17_11_8_/_0.75))]" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-injera">Doro wat · meal preview</span>
              </div>
              <div className="mt-6 space-y-3">
                {orderSteps.map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={reduced ? false : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl border border-injera/10 bg-injera/[0.055] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <b className="text-sm">{step.label}</b>
                      <span className="text-gold">✓</span>
                    </div>
                    <p className="mt-1 text-xs text-injera-dim">{step.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.span
              aria-hidden="true"
              className="absolute -right-7 top-1/2 grid h-16 w-16 place-items-center rounded-full bg-berbere text-2xl text-injera shadow-2xl"
              animate={reduced ? undefined : { x: [0, 14, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ↗
            </motion.span>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-berbere">Pickup or delivery</p>
            <h3 className="mt-4 max-w-[14ch] font-display text-5xl leading-none sm:text-6xl">
              The meal stays central at every step.
            </h3>
            <div className="relative mt-10">
              <div aria-hidden="true" className="absolute left-[1.15rem] top-5 h-[calc(100%-2.5rem)] w-px bg-teff/20" />
              <ol className="space-y-4">
                {fulfillmentStatuses.map((status, index) => (
                  <motion.li
                    key={status}
                    initial={reduced ? false : { opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="relative flex items-center gap-5"
                  >
                    <span className={`relative z-10 h-9 w-9 rounded-full border-4 border-injera ${index < 2 ? "bg-berbere" : "bg-gold"}`} />
                    <div className="flex-1 border-b border-teff/10 py-4 font-semibold">{status}</div>
                  </motion.li>
                ))}
              </ol>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/#waitlist" className="inline-flex min-h-13 items-center rounded-full bg-teff px-7 font-bold text-injera">
                Get launch updates
              </Link>
              <Link href="/cooks#waitlist" className="inline-flex min-h-13 items-center rounded-full border border-teff/30 px-7 font-bold">
                Become a cook
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
