"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
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
                className="ingredient-panel group relative min-h-[31rem] overflow-hidden rounded-[2rem] border border-injera/10 bg-teff-panel lg:w-[23rem] lg:shrink-0"
              >
                <Image
                  src={ingredient.image}
                  alt={ingredient.alt}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1024px) 50vw, 23rem"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_11_8_/_0.06)_18%,rgb(17_11_8_/_0.48)_48%,rgb(17_11_8_/_0.97)_100%)]" />
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-3xl transition-transform duration-500 group-hover:scale-150 motion-reduce:group-hover:scale-100"
                  style={{ background: ingredient.color }}
                />
                <span className="absolute left-7 top-7 rounded-full border border-injera/20 bg-black/30 px-3 py-1.5 font-display text-sm text-injera/70 backdrop-blur-md">
                  0{index + 1}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="block font-ethiopic text-3xl text-gold">{ingredient.fidel}</span>
                  <h3 className="mt-2 font-display text-4xl text-injera">{ingredient.name}</h3>
                  <p className="mt-3 leading-relaxed text-injera-dim">{ingredient.note}</p>
                  <div className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-injera/45">
                    Part of the table
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
