"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { dishes } from "@/data/dishes";
import Container from "@/components/Container";
import SceneHeading from "./SceneHeading";

export default function RecipeDiscovery() {
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  function move(direction: -1 | 1) {
    rail.current?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.78, 720),
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <section id="dishes" className="cinematic-scene overflow-hidden bg-[linear-gradient(180deg,var(--color-teff),var(--color-coffee-black))] py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SceneHeading
            chapter="08"
            eyebrow="Recipes & discovery"
            title={<>Every dish carries a <em className="text-gold">voice.</em></>}
            body="These pre-launch examples show the kinds of meals and stories Aden Eats is being built to celebrate. They are not live inventory."
          />
          <div className="flex gap-3">
            <button type="button" onClick={() => move(-1)} aria-label="Show previous meals" className="grid h-12 w-12 place-items-center rounded-full border border-injera/20 text-xl text-injera transition hover:border-gold hover:text-gold">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Show next meals" className="grid h-12 w-12 place-items-center rounded-full bg-gold text-xl text-teff transition hover:scale-105">→</button>
          </div>
        </div>
      </Container>

      <div
        ref={rail}
        className="recipe-rail mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-var(--container-max))/2))] pb-8 [scrollbar-width:none]"
      >
        {dishes.map((dish, index) => (
          <motion.article
            key={dish.slug}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: (index % 3) * 0.08 }}
            className="group relative min-h-[31rem] w-[84vw] max-w-[34rem] shrink-0 snap-center overflow-hidden rounded-[2.2rem] border border-injera/10 bg-teff-panel shadow-[0_35px_90px_rgb(0_0_0_/_0.38)] sm:w-[68vw] lg:w-[38vw]"
          >
            <Image
              src={dish.image}
              alt={dish.alt}
              fill
              sizes="(max-width: 640px) 84vw, (max-width: 1024px) 68vw, 38vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgb(14_8_6_/_0.94)_100%)]" />
            <span className="absolute right-6 top-6 rounded-full border border-injera/20 bg-black/25 px-4 py-2 font-ethiopic text-gold backdrop-blur-md">{dish.fidel}</span>
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Demonstration meal · 0{index + 1}</span>
                  <h3 className="mt-2 font-display text-4xl text-injera sm:text-5xl">{dish.name}</h3>
                </div>
                {dish.fastingFriendly && <span className="shrink-0 rounded-full border border-gold/35 px-3 py-1.5 text-xs font-bold text-gold">Fasting</span>}
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-injera-dim sm:text-base">{dish.description}</p>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pt-4 text-sm italic leading-relaxed text-injera/80">
                    <span className="font-semibold text-gold">{dish.cookFirstName}&apos;s story:</span> {dish.story}
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
        <div className="flex w-[78vw] max-w-[28rem] shrink-0 snap-center items-center justify-center rounded-[2.2rem] border border-dashed border-gold/30 p-8 text-center">
          <div>
            <p className="font-ethiopic text-3xl text-gold">እንብላ</p>
            <h3 className="mt-4 font-display text-4xl text-injera">The next recipe could be yours.</h3>
            <Link href="/cooks#waitlist" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-gold px-6 font-bold text-teff">Become a cook</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
