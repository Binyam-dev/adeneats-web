"use client";

import Image from "next/image";
import TiltCard from "./TiltCard";

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  fasting_friendly: boolean;
};

// Slight, deterministic per-card rotation so the corkboard reads as
// hand-placed rather than randomly jittered on every render/hydration.
const ROTATIONS = [-1.4, 1.1, -0.6, 1.6, -1.1, 0.9];

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function CookCard({
  index,
  name,
  bio,
  city,
  cuisineSpecialty,
  photoUrl,
  menuItems,
  fallbackGradient,
}: {
  index: number;
  name: string;
  bio: string | null;
  city: string | null;
  cuisineSpecialty: string | null;
  photoUrl: string | null;
  menuItems: MenuItem[];
  fallbackGradient: [string, string];
}) {
  const rotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <div style={{ transform: `rotate(${rotation}deg)` }}>
      <TiltCard
        maxTilt={4}
        className="relative h-full overflow-hidden rounded-[var(--radius-card)] border border-teff/15 bg-injera shadow-[0_14px_34px_rgb(0_0_0_/_0.35)] transition-transform hover:-translate-y-1.5"
      >
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_2px_5px_rgb(0_0_0_/_0.5)]"
        />

        {photoUrl ? (
          <div className="relative h-40">
            <Image
              src={photoUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="flex h-40 items-center justify-center font-display text-4xl text-injera/70"
            style={{
              background: `linear-gradient(135deg, ${fallbackGradient[0]}, ${fallbackGradient[1]})`,
            }}
          >
            {name.trim().charAt(0).toUpperCase()}
          </div>
        )}

        <div className="p-7">
          <h2 className="font-display text-display-md italic text-teff">
            {name}
          </h2>
          <p className="mt-1 text-[0.85rem] uppercase tracking-[0.1em] text-teff/60">
            {[city, cuisineSpecialty].filter(Boolean).join(" · ")}
          </p>
          {bio && <p className="mt-3 text-[0.92rem] text-teff/80">{bio}</p>}

          {menuItems.length > 0 && (
            <ul className="mt-6 space-y-4 border-t border-dashed border-teff/25 pt-5">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-display italic text-teff">
                      {item.name}
                    </span>
                    <span className="whitespace-nowrap text-[0.9rem] text-berbere">
                      {formatPrice(item.price_cents)}
                    </span>
                  </div>
                  {item.description && (
                    <p className="mt-1 text-[0.88rem] text-teff/70">
                      {item.description}
                    </p>
                  )}
                  {item.fasting_friendly && (
                    <span className="mt-2 inline-block rounded-full border border-teal/50 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-teal-deep">
                      Fasting friendly
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </TiltCard>
    </div>
  );
}
