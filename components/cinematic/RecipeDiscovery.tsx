"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { dishes, type Dish } from "@/data/dishes";

type JourneyDish = Dish & {
  cookNote: string;
  ingredients: Array<{
    name: string;
    image: string;
    motion: "spice" | "grain" | "layer" | "herb" | "injera";
  }>;
  steps: string[];
};

const recipeDetails: Record<
  "doro-wat" | "awaze-tibs" | "beyaynetu" | "shiro-wat",
  Pick<JourneyDish, "cookNote" | "ingredients" | "steps">
> = {
  "doro-wat": {
    cookNote:
      "A celebration dish built slowly: onions first, then berbere, chicken, and the treasured whole egg.",
    ingredients: [
      { name: "Berbere", image: "/images/ingredients/berbere.webp", motion: "spice" },
      { name: "Slow onions", image: "/images/ingredients/slow-cooked-onions.webp", motion: "layer" },
      { name: "Injera", image: "/images/culture/injera.webp", motion: "injera" },
      { name: "Teff", image: "/images/ingredients/teff.webp", motion: "grain" },
    ],
    steps: ["Bloom the spice", "Simmer patiently", "Gather around injera"],
  },
  "awaze-tibs": {
    cookNote:
      "The pan announces this one first—beef seared hot with awaze, onion, jalapeño, and rosemary.",
    ingredients: [
      { name: "Awaze", image: "/images/ingredients/berbere.webp", motion: "spice" },
      { name: "Onion", image: "/images/ingredients/slow-cooked-onions.webp", motion: "layer" },
      { name: "Herbs", image: "/images/ingredients/gomen.webp", motion: "herb" },
      { name: "Injera", image: "/images/culture/injera.webp", motion: "injera" },
    ],
    steps: ["Heat the mitad", "Sear with awaze", "Serve while sizzling"],
  },
  beyaynetu: {
    cookNote:
      "A fasting table in one generous circle: distinct stews and greens composed to be shared.",
    ingredients: [
      { name: "Shiro", image: "/images/ingredients/shiro.webp", motion: "grain" },
      { name: "Gomen", image: "/images/ingredients/gomen.webp", motion: "herb" },
      { name: "Berbere", image: "/images/ingredients/berbere.webp", motion: "spice" },
      { name: "Injera", image: "/images/culture/injera.webp", motion: "injera" },
    ],
    steps: ["Cook each stew", "Unfold the injera", "Compose the gebeta"],
  },
  "shiro-wat": {
    cookNote:
      "Everyday comfort made silky: chickpea flour whisked into an aromatic onion and spice base.",
    ingredients: [
      { name: "Shiro", image: "/images/ingredients/shiro.webp", motion: "grain" },
      { name: "Onion", image: "/images/ingredients/slow-cooked-onions.webp", motion: "layer" },
      { name: "Berbere", image: "/images/ingredients/berbere.webp", motion: "spice" },
      { name: "Injera", image: "/images/culture/injera.webp", motion: "injera" },
    ],
    steps: ["Build the base", "Whisk until silky", "Scoop with injera"],
  },
};

const journeySlugs = ["doro-wat", "awaze-tibs", "beyaynetu", "shiro-wat"] as const;
const journeyDishes = journeySlugs.map((slug) => {
  const dish = dishes.find((candidate) => candidate.slug === slug);
  if (!dish) throw new Error(`Missing journey dish: ${slug}`);
  return { ...dish, ...recipeDetails[slug] };
});

export default function RecipeDiscovery() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    let cancelled = false;
    let cleanup = () => {};

    void Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("gsap/MotionPathPlugin"),
    ]).then(([gsapModule, triggerModule, pathModule]) => {
      if (cancelled || !sectionRef.current) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      const MotionPathPlugin = pathModule.MotionPathPlugin;
      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

      const context = gsap.context(() => {
        const scenes = gsap.utils.toArray<HTMLElement>("[data-recipe-scene]");
        const mobile = window.matchMedia("(max-width: 767px)").matches;
        const travelX = mobile ? Math.min(window.innerWidth * 0.72, 310) : window.innerWidth * 0.64;
        const travelY = mobile ? 105 : 180;
        const timeline = gsap.timeline({
          defaults: { overwrite: "auto" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${journeyDishes.length * (mobile ? 1050 : 1550)}`,
            pin: true,
            scrub: mobile ? 0.55 : 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        scenes.forEach((scene, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          const meal = scene.querySelector<HTMLElement>("[data-meal]");
          const shadow = scene.querySelector<HTMLElement>("[data-meal-shadow]");
          const copy = scene.querySelector<HTMLElement>("[data-recipe-copy]");
          const ingredients = scene.querySelectorAll<HTMLElement>("[data-floating-ingredient]");
          const steps = scene.querySelectorAll<HTMLElement>("[data-recipe-step]");
          const chapter = timeline.duration();

          gsap.set(scene, { autoAlpha: 0, pointerEvents: "none" });
          gsap.set(meal, {
            autoAlpha: 0,
            x: direction * travelX,
            y: direction * travelY * 0.42,
            scale: mobile ? 0.76 : 0.68,
            rotate: direction * 13,
            transformOrigin: "50% 50%",
          });
          gsap.set(shadow, { autoAlpha: 0, x: direction * travelX, scale: 0.55 });
          gsap.set(copy, { autoAlpha: 0, y: 26 });
          gsap.set(ingredients, { autoAlpha: 0, scale: 0.25, z: -240 });
          gsap.set(steps, { autoAlpha: 0, y: 16 });

          timeline
            .set(scene, { autoAlpha: 1, pointerEvents: "auto" }, chapter)
            .to(
              meal,
              {
                autoAlpha: 1,
                duration: 1.25,
                ease: "power4.out",
                motionPath: {
                  path: [
                    { x: direction * travelX, y: direction * travelY * 0.42 },
                    { x: direction * travelX * 0.28, y: -direction * travelY * 0.34 },
                    { x: mobile ? 0 : direction * 55, y: mobile ? -45 : 0 },
                  ],
                  curviness: 1.55,
                },
                scale: mobile ? 0.94 : 0.98,
                rotate: direction * 2.5,
              },
              chapter,
            )
            .to(
              shadow,
              {
                autoAlpha: 0.48,
                x: mobile ? 0 : direction * 68,
                scale: 1,
                duration: 1.1,
                ease: "power3.out",
              },
              chapter + 0.08,
            )
            .to(copy, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" }, chapter + 0.68)
            .to(
              ingredients,
              {
                autoAlpha: 1,
                scale: 1,
                z: 0,
                duration: 1,
                stagger: 0.13,
                ease: "back.out(1.35)",
              },
              chapter + 0.8,
            )
            .to(steps, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.15 }, chapter + 1.45)
            .to(
              meal,
              {
                scale: mobile ? 0.98 : 1.075,
                rotate: -direction * 1.5,
                y: mobile ? -52 : -10,
                duration: 3.2,
                ease: "sine.inOut",
              },
              chapter + 1.25,
            )
            .to(
              ingredients,
              {
                rotate: (ingredientIndex) => direction * (ingredientIndex % 2 === 0 ? 7 : -6),
                y: (ingredientIndex) => (ingredientIndex % 2 === 0 ? -10 : 9),
                duration: 3.1,
                ease: "sine.inOut",
              },
              chapter + 1.3,
            )
            .to([copy, ingredients, steps], { autoAlpha: 0, duration: 0.5, stagger: 0.015 }, chapter + 4.35)
            .to(
              meal,
              {
                autoAlpha: 0,
                scale: mobile ? 0.82 : 0.72,
                rotate: -direction * 11,
                duration: 1.2,
                ease: "power2.in",
                motionPath: {
                  path: [
                    { x: mobile ? 0 : direction * 55, y: mobile ? -52 : -10 },
                    { x: -direction * travelX * 0.35, y: direction * travelY * 0.28 },
                    { x: -direction * travelX, y: -direction * travelY * 0.5 },
                  ],
                  curviness: 1.4,
                },
              },
              chapter + 4.55,
            )
            .to(shadow, { autoAlpha: 0, x: -direction * travelX, scale: 0.5, duration: 0.95 }, chapter + 4.58)
            .set(scene, { autoAlpha: 0, pointerEvents: "none" }, chapter + 5.76);
        });

        const finePointer = window.matchMedia("(pointer: fine)").matches;
        let pointerCleanup = () => {};
        if (finePointer) {
          const node = sectionRef.current;
          const onPointerMove = (event: PointerEvent) => {
            if (!node) return;
            const x = (event.clientX / window.innerWidth - 0.5) * 14;
            const y = (event.clientY / window.innerHeight - 0.5) * 10;
            gsap.to("[data-recipe-scene][style*=\"visibility: inherit\"] [data-pointer-layer]", {
              x,
              y,
              rotateY: x * 0.1,
              rotateX: -y * 0.08,
              duration: 0.8,
              ease: "power2.out",
            });
          };
          node?.addEventListener("pointermove", onPointerMove);
          pointerCleanup = () => node?.removeEventListener("pointermove", onPointerMove);
        }

        ScrollTrigger.refresh();
        if (window.location.hash === "#dishes") {
          window.requestAnimationFrame(() => {
            sectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
            ScrollTrigger.update();
          });
        }

        cleanup = () => {
          pointerCleanup();
          context.revert();
        };
      }, sectionRef);
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="dishes"
      aria-label="Signature meals and recipe journeys"
      className={`recipe-journey relative isolate overflow-hidden bg-coffee-black ${
        reduced ? "py-24" : "h-svh min-h-[42rem]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <div className="absolute -left-44 top-1/3 h-[28rem] w-[28rem] rounded-full bg-berbere/15 blur-[110px]" />
        <div className="absolute -right-32 top-0 h-[25rem] w-[25rem] rounded-full bg-gold/10 blur-[100px]" />
        <div className="recipe-grain absolute inset-0 opacity-[0.055]" />
      </div>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-9 sm:py-7">
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold">08 · From ingredient to table</p>
          <p className="mt-1 hidden text-xs text-injera/45 sm:block">Scroll slowly. The center is the tasting stage.</p>
        </div>
        <p className="font-ethiopic text-xl text-injera/55">እንብላ</p>
      </header>

      <div className={reduced ? "mx-auto grid max-w-[88rem] gap-24 px-5 sm:px-8" : "relative h-full"}>
        {journeyDishes.map((dish, index) => (
          <article
            key={dish.slug}
            data-recipe-scene
            className={
              reduced
                ? "relative grid min-h-[40rem] items-center gap-9 lg:grid-cols-[0.9fr_1.1fr]"
                : "invisible absolute inset-0"
            }
          >
            <div
              data-recipe-copy
              className={`z-20 mx-5 max-w-[25rem] sm:mx-9 lg:mx-[7vw] ${
                reduced
                  ? index % 2
                    ? "lg:order-2"
                    : ""
                  : `absolute bottom-7 left-0 sm:bottom-[8vh] ${index % 2 ? "lg:left-auto lg:right-0 lg:text-right" : ""}`
              }`}
            >
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold">
                Signature journey · 0{index + 1}
              </p>
              <h2 className="mt-2 font-display text-[clamp(2.7rem,5vw,5.4rem)] leading-[0.88] text-injera">
                {dish.name}
              </h2>
              <p className="mt-2 font-ethiopic text-2xl text-gold/75">{dish.fidel}</p>
              <p className="mt-4 text-sm leading-relaxed text-injera/70 sm:text-base">{dish.cookNote}</p>
              <p className="mt-3 text-sm italic leading-relaxed text-injera/50">
                <span className="not-italic font-semibold text-injera/80">{dish.cookFirstName}&apos;s table:</span>{" "}
                {dish.story}
              </p>
              <div className={`mt-5 flex flex-wrap gap-2 ${!reduced && index % 2 ? "lg:justify-end" : ""}`}>
                {dish.steps.map((step, stepIndex) => (
                  <span
                    key={step}
                    data-recipe-step
                    className="rounded-full border border-injera/15 bg-black/20 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-injera/70 backdrop-blur-md"
                  >
                    {stepIndex + 1}. {step}
                  </span>
                ))}
              </div>
              <div className={`mt-6 flex flex-wrap gap-3 ${!reduced && index % 2 ? "lg:justify-end" : ""}`}>
                <Link href="/cooks#waitlist" className="inline-flex min-h-12 items-center rounded-full border border-injera/20 px-5 text-sm font-bold text-injera transition hover:border-gold hover:text-gold">
                  Meet future cooks
                </Link>
                <Link href="/#waitlist" className="inline-flex min-h-12 items-center rounded-full bg-gold px-5 text-sm font-bold text-teff transition hover:scale-[1.03]">
                  Join to order at launch
                </Link>
              </div>
            </div>

            <div
              className={`pointer-events-none z-10 ${
                reduced
                  ? "relative mx-auto aspect-square w-[min(84vw,35rem)]"
                  : "absolute left-1/2 top-[43%] aspect-square w-[min(82vw,34rem)] -translate-x-1/2 -translate-y-1/2 sm:top-1/2 lg:w-[min(47vw,42rem)]"
              }`}
            >
              <div data-meal-shadow className="absolute left-[12%] top-[78%] h-[14%] w-[76%] rounded-[50%] bg-black/70 blur-2xl" />
              <div data-meal data-pointer-layer className="absolute inset-[8%] [perspective:1200px] [transform-style:preserve-3d]">
                <div className="absolute inset-0 rounded-full bg-gold/15 blur-3xl" />
                <div className="absolute inset-0 overflow-hidden rounded-full border border-injera/15 bg-teff-panel shadow-[0_35px_90px_rgb(0_0_0_/_0.62),inset_0_1px_0_rgb(255_255_255_/_0.18)]">
                  <Image
                    src={dish.image}
                    alt={dish.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 767px) 76vw, 42rem"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-injera/10" />
                </div>
                <div className="recipe-steam recipe-steam-a" aria-hidden="true" />
                <div className="recipe-steam recipe-steam-b" aria-hidden="true" />
                <div className="recipe-steam recipe-steam-c" aria-hidden="true" />
              </div>

              <div className="absolute inset-0">
                {dish.ingredients.map((ingredient, ingredientIndex) => (
                  <div
                    key={ingredient.name}
                    data-floating-ingredient
                    data-motion={ingredient.motion}
                    className={`recipe-ingredient recipe-ingredient-${ingredientIndex + 1} absolute ${
                      ingredientIndex > 1 ? "hidden sm:block" : ""
                    }`}
                  >
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-injera/20 bg-teff-panel shadow-[0_15px_35px_rgb(0_0_0_/_0.45)] sm:h-[4.5rem] sm:w-[4.5rem]">
                      <Image src={ingredient.image} alt="" fill sizes="72px" className="object-cover" />
                    </div>
                    <span className="mt-2 block text-center text-[0.58rem] font-bold uppercase tracking-[0.12em] text-injera/65">
                      {ingredient.name}
                    </span>
                    {ingredient.motion === "spice" && (
                      <span className="recipe-spice-particles absolute inset-0" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {!reduced && (
        <div className="pointer-events-none absolute bottom-5 right-5 z-30 hidden items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-injera/35 sm:flex">
          <span className="h-px w-10 bg-injera/20" />
          Four dishes · one long table
        </div>
      )}
    </section>
  );
}
