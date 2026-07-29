"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import SteamEffect from "./SteamEffect";

const SPRING = { stiffness: 180, damping: 24, mass: 0.65 };

export default function FoodHero3D() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, SPRING);
  const rotateY = useSpring(tiltY, SPRING);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 28]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (
      reduced ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 9);
    tiltX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 9);
  }

  function reset() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      aria-label="An Ethiopian family-style platter with doro wat, shiro, lentils, greens, vegetables, ayib, and injera"
      role="img"
      className="hero-food-shell relative mx-auto aspect-square w-full max-w-[30rem] [perspective:1200px]"
      style={{ y: parallaxY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <motion.div
        className="hero-food-float relative h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="hero-orbit absolute -inset-[4%] h-[108%] w-[108%] overflow-visible [transform:translateZ(-28px)]"
        >
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke="rgb(226 169 59 / .32)"
            strokeWidth=".35"
            strokeDasharray="2 3"
          />
          <circle cx="50" cy="3" r="1.4" fill="#e2a93b" />
          <circle cx="91" cy="73" r="1" fill="#1d9e75" />
          <circle cx="9" cy="73" r="1" fill="#c43b1e" />
        </svg>
        <div aria-hidden="true" className="hero-food-glow absolute inset-[8%] rounded-full" />
        <div
          aria-hidden="true"
          className="absolute inset-[2%] rounded-full border border-gold/30 bg-teff-panel shadow-[0_45px_110px_rgb(0_0_0_/_0.55)] [transform:translateZ(-20px)]"
        />
        <div className="absolute inset-[5%] overflow-hidden rounded-full ring-8 ring-gold/15 [transform:translateZ(14px)]">
          <Image
            src="/images/hero.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 65vw, 440px"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(120deg,rgb(255_255_255_/_0.13),transparent_34%,transparent_68%,rgb(0_0_0_/_0.12))]"
          />
        </div>
        <SteamEffect className="absolute left-1/2 top-[-4%] h-[30%] w-[42%] -translate-x-1/2 [transform:translateZ(42px)]" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="hero-spice-chip absolute -left-2 top-[17%] hidden sm:flex"
        animate={reduced ? undefined : { y: [0, -7, 0], rotate: [-3, -1, -3] }}
        transition={{ duration: 5.8, ease: "easeInOut", repeat: Infinity }}
      >
        <span className="h-2 w-2 rounded-full bg-berbere" />
        Berbere
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="hero-spice-chip absolute -right-3 bottom-[22%] hidden sm:flex"
        animate={reduced ? undefined : { y: [0, 8, 0], rotate: [3, 1, 3] }}
        transition={{ duration: 6.4, ease: "easeInOut", repeat: Infinity }}
      >
        <span className="h-2 w-2 rounded-full bg-gold" />
        Niter kibbeh
      </motion.div>
    </motion.div>
  );
}
