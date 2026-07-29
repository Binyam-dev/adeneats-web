"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ingredients } from "@/data/cinematic";
import Container from "@/components/Container";
import SceneHeading from "./SceneHeading";

export default function IngredientJourney() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !section.current || !track.current) return;
    let cancelled = false;
    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, triggerModule]) => {
        if (cancelled) return;
        const gsap = gsapModule.default;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          const distance = () =>
            Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth);
          gsap.to(track.current, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });
          gsap.from("[data-ingredient-orbit]", {
            rotate: -16,
            opacity: 0,
            stagger: 0.08,
            scrollTrigger: {
              trigger: section.current,
              start: "top 72%",
              end: "top 15%",
              scrub: true,
            },
          });
        }, section);
        if (window.location.hash && window.location.hash !== "#ingredients") {
          window.requestAnimationFrame(() => {
            document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "auto" });
          });
        }
        cleanup = () => context.revert();
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduced]);

  return (
    <section ref={section} id="ingredients" className="cinematic-scene bg-coffee-black lg:min-h-[190svh]">
      <div className="overflow-hidden py-24 lg:sticky lg:top-0 lg:flex lg:min-h-svh lg:items-center lg:py-0">
        <Container>
          <SceneHeading
            chapter="02"
            eyebrow="Ingredients & origins"
            title={<>The flavor begins <em className="text-gold">long before</em> the plate.</>}
            body="A few familiar ingredients, handled with patience, become something deeply personal."
          />
          <div
            ref={track}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:flex lg:w-max lg:gap-7 lg:pr-[28vw]"
          >
            {ingredients.map((ingredient, index) => (
              <article
                key={ingredient.name}
                data-ingredient-orbit
                className="ingredient-panel group relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-injera/10 bg-teff-panel p-7 lg:w-[23rem] lg:shrink-0"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-3xl transition-transform duration-700 group-hover:scale-150"
                  style={{ background: ingredient.color }}
                />
                <span className="font-display text-sm text-injera/35">0{index + 1}</span>
                <span className="mt-8 block font-ethiopic text-3xl text-gold">{ingredient.fidel}</span>
                <h3 className="mt-3 font-display text-4xl text-injera">{ingredient.name}</h3>
                <p className="mt-5 leading-relaxed text-injera-dim">{ingredient.note}</p>
                <div className="absolute inset-x-7 bottom-7 flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-injera/45">
                  <span className="h-px flex-1 bg-injera/15" />
                  Part of the table
                </div>
              </article>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
