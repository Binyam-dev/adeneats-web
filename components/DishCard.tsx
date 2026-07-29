"use client";

import { useState } from "react";
import Image from "next/image";
import TiltCard from "./TiltCard";
import type { Dish } from "@/data/dishes";

export default function DishCard({
  dish,
}: {
  dish: Dish;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <TiltCard
      maxTilt={7}
      className="group h-full overflow-visible rounded-[var(--radius-card)] transition-[transform,filter] duration-500 hover:-translate-y-2 hover:drop-shadow-[0_32px_44px_rgb(0_0_0_/_0.42)]"
    >
      <button
        type="button"
        onClick={() => setRevealed((v) => !v)}
        aria-expanded={revealed}
        className="relative block h-full w-full text-left transition-transform duration-300 [transform-style:preserve-3d] [perspective:1400px]"
        style={{
          transform: `translateY(${revealed ? -4 : 0}px) rotateY(${revealed ? 180 : 0}deg)`,
        }}
      >
        {/* Front — the illustration and dish details */}
        <div
          aria-hidden={revealed}
          className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-teff-panel shadow-[inset_0_1px_0_rgb(255_255_255_/_0.04)] [backface-visibility:hidden]"
          style={{ transform: "rotateY(0deg)" }}
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={dish.image}
              alt={dish.alt}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 350px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.085]"
            />
            <span aria-hidden="true" className="food-card-shine absolute inset-0" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgb(20_12_8_/_0.64)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          <div className="p-6">
            <div className="mb-2 flex items-baseline justify-between gap-2.5">
              <h3 className="text-display-md font-display text-injera">
                {dish.name}
              </h3>
              <span className="font-ethiopic text-base text-gold">
                {dish.fidel}
              </span>
            </div>
            <p className="text-[0.88rem] text-injera-dim">{dish.description}</p>
            {dish.fastingFriendly && (
              <span className="mt-3 inline-block rounded-full border border-teal/50 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-teal">
                Fasting friendly
              </span>
            )}
            <span className="mt-3 block text-[0.68rem] uppercase tracking-[0.1em] text-injera-dim/60">
              Tap for the story
            </span>
          </div>
        </div>

        {/* Back — a recipe card, picked up and turned over */}
        <div
          aria-hidden={!revealed}
          className="absolute inset-0 flex flex-col justify-center overflow-hidden rounded-[var(--radius-card)] border border-gold/25 bg-teff-panel-2 p-7 [backface-visibility:hidden]"
          style={{
            transform: "rotateY(180deg)",
            backgroundImage:
              "repeating-linear-gradient(rgb(245 235 220 / 0.05) 0 1px, transparent 1px 26px)",
          }}
        >
          <p className="font-display text-[1.05rem] italic leading-snug text-injera">
            <span className="text-gold">{dish.cookFirstName}&apos;s</span>{" "}
            {dish.name}
          </p>
          <p className="mt-3 text-[0.88rem] italic leading-relaxed text-injera-dim">
            {dish.story}
          </p>
          <span className="mt-4 block text-[0.68rem] uppercase tracking-[0.1em] text-injera-dim/50">
            Tap to flip back
          </span>
        </div>
      </button>
    </TiltCard>
  );
}
