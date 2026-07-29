"use client";

import type { CookListing } from "@/lib/order-types";
import { formatPrice } from "@/lib/order-types";
import { useCart } from "./CartProvider";

export default function CookMenu({ cook }: { cook: CookListing }) {
  const cart = useCart();
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {cook.menu_items.map((item) => (
        <li key={item.id} className="flex min-h-44 flex-col justify-between rounded-[var(--radius-card)] border border-border bg-teff-panel p-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl text-injera">{item.name}</h3>
              <span className="shrink-0 font-semibold text-gold">{formatPrice(item.price_cents)}</span>
            </div>
            {item.description && <p className="mt-2 text-sm leading-relaxed text-injera-dim">{item.description}</p>}
            {item.fasting_friendly && <span className="mt-3 inline-block rounded-full bg-teal-tint px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">Fasting friendly</span>}
          </div>
          <button type="button" onClick={() => cart.add(item, cook)} className="mt-5 min-h-11 rounded-full bg-teal px-5 font-semibold text-injera transition-transform hover:-translate-y-0.5">
            Add to basket
          </button>
        </li>
      ))}
    </ul>
  );
}
