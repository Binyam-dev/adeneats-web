"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "./Container";

const links = [
  ["/#ingredients", "Ingredients"],
  ["/#cook-story", "The cooks"],
  ["/#journey", "How it will work"],
  ["/#dishes", "Meals"],
  ["/#culture", "Culture"],
] as const;

export default function Nav({ appStoreUrl }: { appStoreUrl?: string }) {
  void appStoreUrl;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${scrolled || open ? "border-b border-injera/10 bg-[rgb(18_11_8_/_0.9)] shadow-2xl backdrop-blur-xl" : "bg-gradient-to-b from-black/60 to-transparent"}`}>
      <nav aria-label="Primary navigation">
        <Container className="flex min-h-[4.8rem] items-center justify-between gap-5">
          <Link href="/" className="group inline-flex min-h-11 items-center gap-3 font-display text-2xl font-semibold tracking-tight text-injera">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/45 font-ethiopic text-sm text-gold transition-transform group-hover:rotate-[-8deg]">አ</span>
            <span>Aden <em className="not-italic text-gold">Eats</em></span>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="inline-flex min-h-11 items-center rounded-full px-3 text-sm text-injera-dim transition hover:bg-injera/5 hover:text-injera">
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/#waitlist" className="hidden min-h-11 items-center rounded-full bg-gold px-5 text-sm font-bold text-teff shadow-[0_8px_28px_rgb(226_169_59_/_0.22)] sm:inline-flex">
              Join the waitlist
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setOpen((value) => !value)}
              className="grid h-11 w-11 place-items-center rounded-full border border-injera/20 text-injera lg:hidden"
            >
              <span aria-hidden="true" className="text-xl">{open ? "×" : "≡"}</span>
            </button>
          </div>
        </Container>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={reduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-injera/10 bg-teff-panel-2 lg:hidden"
          >
            <Container className="grid py-5">
              {links.map(([href, label]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-injera/10 font-display text-xl text-injera">
                  {label}
                </Link>
              ))}
              <Link href="/#waitlist" onClick={() => setOpen(false)} className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 font-bold text-teff">
                Join the waitlist
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
