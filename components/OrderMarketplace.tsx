"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CookListing } from "@/lib/order-types";
import { formatPrice } from "@/lib/order-types";
import { useCart } from "./CartProvider";

export default function OrderMarketplace({ cooks }: { cooks: CookListing[] }) {
  const [query, setQuery] = useState("");
  const [fastingOnly, setFastingOnly] = useState(false);
  const cart = useCart();
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return cooks
      .map((cook) => ({
        ...cook,
        menu_items: cook.menu_items.filter(
          (item) =>
            (!fastingOnly || item.fasting_friendly) &&
            (!needle ||
              cook.name.toLowerCase().includes(needle) ||
              cook.city?.toLowerCase().includes(needle) ||
              cook.cuisine_specialty?.toLowerCase().includes(needle) ||
              item.name.toLowerCase().includes(needle)),
        ),
      }))
      .filter((cook) => !needle || cook.menu_items.length > 0);
  }, [cooks, fastingOnly, query]);

  return (
    <>
      <div className="sticky top-[7.6rem] z-20 mb-8 grid gap-3 rounded-[var(--radius-panel)] border border-border bg-teff/90 p-3 backdrop-blur-xl sm:top-[5.2rem] sm:grid-cols-[1fr_auto]">
        <label className="relative">
          <span className="sr-only">Search cooks, dishes, or cities</span>
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cooks, dishes, or cities"
            className="min-h-12 w-full rounded-2xl border border-border bg-injera/5 pl-12 pr-4 text-injera outline-none placeholder:text-injera-dim/60 focus:border-gold"
          />
        </label>
        <button
          type="button"
          aria-pressed={fastingOnly}
          onClick={() => setFastingOnly((value) => !value)}
          className={`min-h-12 rounded-2xl border px-5 text-sm font-semibold transition-colors ${
            fastingOnly ? "border-teal bg-teal text-injera" : "border-border text-injera-dim hover:text-injera"
          }`}
        >
          Fasting friendly
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[var(--radius-panel)] border border-border bg-teff-panel px-8 py-14 text-center">
          <h2 className="font-display text-2xl text-injera">No matching menus yet.</h2>
          <p className="mt-2 text-injera-dim">Try another dish, cook, or city.</p>
        </div>
      ) : (
        <div className="grid gap-7 lg:grid-cols-2">
          {filtered.map((cook) => (
            <article key={cook.id} className="overflow-hidden rounded-[var(--radius-panel)] border border-border bg-teff-panel shadow-[0_22px_60px_rgb(0_0_0_/_0.2)]">
              <div className="grid sm:grid-cols-[11rem_1fr]">
                <div className="relative min-h-44 bg-[linear-gradient(135deg,var(--color-teal-deep),var(--color-berbere-deep))]">
                  {cook.photo_url ? (
                    <Image src={cook.photo_url} alt="" fill className="object-cover" sizes="176px" />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center font-display text-6xl text-injera/70">{cook.name.charAt(0)}</span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-gold">{[cook.city, cook.cuisine_specialty].filter(Boolean).join(" · ")}</p>
                  <h2 className="mt-2 font-display text-3xl text-injera">{cook.name}</h2>
                  {cook.bio && <p className="mt-3 line-clamp-3 text-sm text-injera-dim">{cook.bio}</p>}
                  <Link href={`/order/${cook.id}`} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-teal">
                    Meet this cook <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                </div>
              </div>
              <ul className="divide-y divide-border border-t border-border">
                {cook.menu_items.slice(0, 4).map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg text-injera">{item.name}</h3>
                        {item.fasting_friendly && <span className="rounded-full bg-teal-tint px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-teal">Fasting</span>}
                      </div>
                      {item.description && <p className="mt-1 text-sm text-injera-dim">{item.description}</p>}
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="mb-2 text-sm font-semibold text-gold">{formatPrice(item.price_cents)}</div>
                      <button type="button" onClick={() => cart.add(item, cook)} className="min-h-11 rounded-full border border-teal/50 px-4 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-injera">
                        Add
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-injera-dim" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></svg>;
}
