"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import Container from "./Container";
import KineticHeadline from "./cinematic/KineticHeadline";

export default function Hero({ appStoreUrl }: { appStoreUrl?: string }) {
  void appStoreUrl;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const plateX = useSpring(pointerX, { stiffness: 55, damping: 18 });
  const plateY = useSpring(pointerY, { stiffness: 55, damping: 18 });
  const plateRotateX = useTransform(plateY, [-22, 22], [3, -3]);
  const plateRotateY = useTransform(plateX, [-22, 22], [-3, 3]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 34);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 34);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <header
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative min-h-[96svh] overflow-hidden bg-teff"
    >
      <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y: imageY }}>
        <Image
          src="/images/hero-cinematic-v2.webp"
          alt="A home-cooked Ethiopian communal feast served on injera in a woven gebeta"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] opacity-45 blur-[1px] scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgb(196_59_30_/_0.13),transparent_29%),linear-gradient(90deg,rgb(15_9_6_/_0.99)_0%,rgb(15_9_6_/_0.94)_42%,rgb(15_9_6_/_0.63)_72%,rgb(15_9_6_/_0.48)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-teff)_0%,transparent_28%,rgb(0_0_0_/_0.18)_100%)]" />
      <div aria-hidden="true" className="hero-grain absolute inset-0 opacity-30" />
      <div aria-hidden="true" className="hero-ember hero-ember-one" />
      <div aria-hidden="true" className="hero-ember hero-ember-two" />

      <Container className="relative grid min-h-[96svh] items-center gap-10 py-28 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-20 max-w-[45rem]">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="font-ethiopic text-xl text-gold">እንኳን ደህና መጡ</span>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-injera-dim">
              Coming to the DMV
            </span>
          </motion.div>
          <KineticHeadline />
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24 }}
            className="mt-8 max-w-[38rem] text-lg leading-relaxed text-injera-dim sm:text-xl"
          >
            Authentic Ethiopian meals made by talented cooks in your community.
          </motion.p>
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="#dishes" className="magnetic-cta inline-flex min-h-14 items-center rounded-full bg-gold px-8 font-bold text-teff shadow-[0_18px_55px_rgb(226_169_59_/_0.28)]">
              Explore meals
              <span aria-hidden="true" className="ml-3 text-xl">↗</span>
            </Link>
            <Link href="/cooks#waitlist" className="inline-flex min-h-14 items-center rounded-full border border-injera/30 bg-black/10 px-8 font-semibold text-injera backdrop-blur-md transition hover:border-injera/60 hover:bg-injera/10">
              Become a cook
            </Link>
          </motion.div>
        </div>

        <div aria-hidden="true" className="relative z-10 hidden min-h-[42rem] lg:block [perspective:1200px]">
          <div className="hero-plate-aura absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <div className="hero-orbit absolute left-1/2 top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20">
            <span className="absolute left-[4%] top-[24%] h-4 w-4 rounded-[70%_30%_70%_30%] bg-[#62864a] shadow-[0_0_24px_rgb(98_134_74_/_0.7)]" />
            <span className="absolute bottom-[12%] right-[18%] h-3 w-3 rounded-full bg-berbere shadow-[0_0_22px_rgb(196_59_30_/_0.8)]" />
          </div>
          <div className="hero-orbit hero-orbit-reverse absolute left-1/2 top-1/2 h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-injera/10" />

          <motion.div
            style={{
              x: plateX,
              y: plateY,
              rotateX: plateRotateX,
              rotateY: plateRotateY,
            }}
            className="hero-floating-plate absolute left-1/2 top-1/2 h-[31rem] w-[31rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          >
            <div className="absolute inset-[3%] overflow-hidden rounded-full border border-injera/20 bg-black shadow-[0_45px_100px_rgb(0_0_0_/_0.65),0_0_70px_rgb(196_59_30_/_0.15)]">
              <Image
                src="/images/dishes/beyaynetu.webp"
                alt=""
                fill
                sizes="31rem"
                className="scale-[1.12] object-cover"
              />
              <div className="food-card-shine absolute inset-0 opacity-60" />
            </div>
            <svg className="absolute -top-16 left-1/2 h-24 w-32 -translate-x-1/2" viewBox="0 0 128 96">
              <path className="steam-wisp" d="M39 91C18 67 61 53 42 23" fill="none" />
              <path className="steam-wisp steam-wisp-b" d="M66 91C45 61 84 48 66 11" fill="none" />
              <path className="steam-wisp steam-wisp-c" d="M90 91C70 68 109 54 91 28" fill="none" />
            </svg>
          </motion.div>

          <div className="hero-spice-chip hero-chip-one absolute left-0 top-[22%] flex">
            <span className="h-2.5 w-2.5 rounded-full bg-berbere" /> Berbere heat
          </div>
          <div className="hero-spice-chip hero-chip-two absolute bottom-[20%] right-0 flex">
            <span className="h-2.5 w-2.5 rounded-full bg-gold" /> Injera warmth
          </div>
          <div className="hero-spice-chip hero-chip-three absolute right-[2%] top-[17%] flex font-ethiopic normal-case tracking-normal">
            ከቤት የተሰራ
          </div>
          <p className="absolute bottom-[5%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.32em] text-injera/45">
            Home cooked · community delivered
          </p>
        </div>
      </Container>

      <div className="absolute bottom-7 right-7 hidden items-center text-xs uppercase tracking-[0.2em] text-injera/65 sm:flex">
        Scroll to taste
      </div>
    </header>
  );
}
