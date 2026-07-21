"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

const EASE = [0.22, 1, 0.36, 1] as const;

function FadeUp({
  children,
  delay,
  reduced,
}: {
  children: React.ReactNode;
  delay: number;
  reduced: boolean | null;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero({
  appStoreUrl,
  heroImage,
}: {
  appStoreUrl?: string;
  /** Path under /public, only passed once the file exists on disk. */
  heroImage?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="relative flex min-h-[85vh] items-center overflow-hidden">
      {/* radial color wash + injera-dot texture, matching the mockup's hero-bg */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 78% 30%, rgb(196 59 30 / 0.34), transparent 60%)," +
            "radial-gradient(ellipse 60% 50% at 20% 80%, rgb(29 158 117 / 0.22), transparent 60%)," +
            "radial-gradient(ellipse 45% 40% at 60% 85%, rgb(226 169 59 / 0.16), transparent 60%)," +
            "var(--color-teff)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(rgb(245 235 220 / 0.5) 1px, transparent 1.6px)",
          backgroundSize: "22px 22px",
        }}
      />

      <Container className="relative z-10 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <FadeUp delay={0.1} reduced={prefersReducedMotion}>
              <div className="mb-6 inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.18em] text-gold">
                <span className="h-px w-8 bg-gold" aria-hidden="true" />
                Serving the DMV
              </div>
            </FadeUp>
            <FadeUp delay={0.2} reduced={prefersReducedMotion}>
              <p className="font-ethiopic mb-5 text-xl text-gold">
                እንኳን ደህና መጡ
              </p>
            </FadeUp>
            <FadeUp delay={0.3} reduced={prefersReducedMotion}>
              <h1 className="max-w-[13ch] text-hero font-display text-injera sm:text-[3.6rem] lg:text-[4.2rem]">
                Home-cooked Habesha food, made by{" "}
                <em className="font-bold not-italic text-teal">
                  your neighbors
                </em>
                .
              </h1>
            </FadeUp>
            <FadeUp delay={0.4} reduced={prefersReducedMotion}>
              <p className="mt-6 max-w-[46ch] text-[1.05rem] text-injera-dim">
                Real Doro Wat. Real injera. Real home kitchens. Aden Eats
                connects you with vetted Ethiopian &amp; Eritrean home cooks
                in your community — order ahead, pick up hot.
              </p>
            </FadeUp>
            <FadeUp delay={0.5} reduced={prefersReducedMotion}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href={appStoreUrl || "/#waitlist"}
                  target={appStoreUrl ? "_blank" : undefined}
                  rel={appStoreUrl ? "noopener noreferrer" : undefined}
                  className="rounded-full bg-teal px-7 py-3.5 font-medium text-injera shadow-[0_6px_24px_rgb(29_158_117_/_0.35)] transition-transform hover:-translate-y-0.5"
                >
                  Get the app
                </Link>
                <Link
                  href="/cooks"
                  className="rounded-full border border-injera/35 px-7 py-3.5 font-medium text-injera transition-transform hover:-translate-y-0.5"
                >
                  Cook with Aden
                </Link>
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.1em] text-injera-dim/70">
                Coming to the App Store — October 2026
              </p>
            </FadeUp>
          </div>

          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-full shadow-[0_40px_120px_rgb(0_0_0_/_0.55)] ring-8 ring-gold/15"
            style={
              heroImage
                ? undefined
                : {
                    background:
                      "radial-gradient(circle at 38% 34%, rgb(196 59 30 / 0.85) 0 12%, transparent 13%)," +
                      "radial-gradient(circle at 62% 30%, rgb(226 169 59 / 0.8) 0 10%, transparent 11%)," +
                      "radial-gradient(circle at 66% 60%, rgb(29 158 117 / 0.7) 0 11%, transparent 12%)," +
                      "radial-gradient(circle at 40% 64%, rgb(120 72 40 / 0.9) 0 12%, transparent 13%)," +
                      "radial-gradient(circle at 52% 47%, rgb(245 235 220 / 0.16) 0 30%, transparent 31%)," +
                      "radial-gradient(circle, #3a2a20 0 68%, #4a3527 68% 100%)",
                  }
            }
          >
            {heroImage ? (
              <Image
                src={heroImage}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 420px, 90vw"
              />
            ) : (
              <span className="absolute inset-x-0 bottom-10 text-center text-[0.65rem] uppercase tracking-[0.14em] text-injera/50">
                Photo: injera spread, shot from above
              </span>
            )}
          </motion.div>
        </div>
      </Container>
    </header>
  );
}
