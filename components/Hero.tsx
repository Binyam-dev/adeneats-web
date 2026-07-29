"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "./Container";

export default function Hero({ appStoreUrl }: { appStoreUrl?: string }) {
  void appStoreUrl;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"]);

  return (
    <header ref={ref} className="relative min-h-[92svh] overflow-hidden bg-teff">
      <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y: imageY }}>
        <Image
          src="/images/hero-cinematic-v2.webp"
          alt="A home-cooked Ethiopian communal feast served on injera in a woven gebeta"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_9_6_/_0.98)_0%,rgb(15_9_6_/_0.9)_33%,rgb(15_9_6_/_0.45)_58%,rgb(15_9_6_/_0.08)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-teff)_0%,transparent_28%,rgb(0_0_0_/_0.18)_100%)]" />
      <div aria-hidden="true" className="hero-grain absolute inset-0 opacity-30" />
      <div aria-hidden="true" className="hero-ember hero-ember-one" />
      <div aria-hidden="true" className="hero-ember hero-ember-two" />

      <Container className="relative flex min-h-[92svh] items-center py-24">
        <div className="max-w-[45rem]">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="font-ethiopic text-xl text-gold">እንኳን ደህና መጡ</span>
            <span className="h-px w-14 bg-gold/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-injera-dim">
              Coming to the DMV
            </span>
          </motion.div>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="max-w-[10ch] font-display text-[clamp(3.8rem,8.4vw,7.6rem)] leading-[0.88] tracking-[-0.045em] text-injera"
          >
            Home is a <span className="italic text-gold">flavor.</span>
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24 }}
            className="mt-8 max-w-[38rem] text-lg leading-relaxed text-injera-dim sm:text-xl"
          >
            Aden Eats is bringing authentic Ethiopian and Eritrean food from
            gifted home cooks to neighbors across the DMV.
          </motion.p>
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="#waitlist" className="magnetic-cta inline-flex min-h-14 items-center rounded-full bg-gold px-8 font-bold text-teff shadow-[0_18px_55px_rgb(226_169_59_/_0.28)]">
              Save my place
              <span aria-hidden="true" className="ml-3 text-xl">↗</span>
            </Link>
            <Link href="#story" className="inline-flex min-h-14 items-center rounded-full border border-injera/30 bg-black/10 px-8 font-semibold text-injera backdrop-blur-md transition hover:border-injera/60 hover:bg-injera/10">
              Enter the story
            </Link>
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-7 right-7 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-injera/65 sm:flex">
        <span className="hero-scroll-line h-px w-16 bg-injera/40" />
        Scroll to taste
      </div>
    </header>
  );
}
