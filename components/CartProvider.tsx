"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { CartLine, CookListing, MenuItem } from "@/lib/order-types";
import { formatPrice } from "@/lib/order-types";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  add: (item: MenuItem, cook: Pick<CookListing, "id" | "name">) => void;
  change: (itemId: string, quantity: number) => void;
  open: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "aden-cart-v1";

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setLines(JSON.parse(saved) as CartLine[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [hydrated, lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      add(item, cook) {
        setLines((current) => {
          const existing = current.find((line) => line.item.id === item.id);
          return existing
            ? current.map((line) =>
                line.item.id === item.id
                  ? { ...line, quantity: line.quantity + 1 }
                  : line,
              )
            : [...current, { item, cook, quantity: 1 }];
        });
        setIsOpen(true);
      },
      change(itemId, quantity) {
        setLines((current) =>
          quantity <= 0
            ? current.filter((line) => line.item.id !== itemId)
            : current.map((line) =>
                line.item.id === itemId ? { ...line, quantity } : line,
              ),
        );
      },
      open: () => setIsOpen(true),
    }),
    [lines],
  );

  const total = lines.reduce(
    (sum, line) => sum + line.item.price_cents * line.quantity,
    0,
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {hydrated && value.count > 0 && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center gap-3 rounded-full bg-gold px-5 py-3 font-semibold text-teff shadow-[0_16px_45px_rgb(0_0_0_/_0.4)] transition-transform hover:-translate-y-1"
        >
          <CartIcon />
          Cart
          <span className="grid h-7 min-w-7 place-items-center rounded-full bg-teff px-2 text-xs text-injera">
            {value.count}
          </span>
        </button>
      )}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close cart"
              className="fixed inset-0 z-[60] cursor-default bg-black/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
              className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col border-l border-border bg-teff-panel-2 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <div className="flex items-center justify-between border-b border-border p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">Your order</p>
                  <h2 id="cart-title" className="mt-1 font-display text-2xl text-injera">
                    Gebeta basket
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border text-xl text-injera"
                  aria-label="Close cart"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto p-6">
                {lines.length === 0 ? (
                  <p className="text-injera-dim">Your basket is empty.</p>
                ) : (
                  lines.map((line) => (
                    <div key={line.item.id} className="rounded-2xl border border-border bg-teff-panel p-4">
                      <div className="flex justify-between gap-4">
                        <div>
                          <h3 className="font-display text-lg text-injera">{line.item.name}</h3>
                          <p className="text-xs text-injera-dim">From {line.cook.name}</p>
                        </div>
                        <span className="text-sm font-semibold text-gold">
                          {formatPrice(line.item.price_cents * line.quantity)}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <button type="button" aria-label={`Remove one ${line.item.name}`} onClick={() => value.change(line.item.id, line.quantity - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-border text-injera">−</button>
                        <span className="min-w-8 text-center text-sm text-injera">{line.quantity}</span>
                        <button type="button" aria-label={`Add one ${line.item.name}`} onClick={() => value.change(line.item.id, line.quantity + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-border text-injera">+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-injera-dim">Estimated total</span>
                  <strong className="font-display text-2xl text-injera">{formatPrice(total)}</strong>
                </div>
                <p className="mb-4 text-xs leading-relaxed text-injera-dim">
                  This basket is a preview. Payment and pickup confirmation happen in the Aden Eats app.
                </p>
                <Link href="/#waitlist" className="flex min-h-12 items-center justify-center rounded-full bg-teal px-6 font-semibold text-injera">
                  Get ordering updates
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

function CartIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5h2l2 10h9l2-7H7" /><circle cx="10" cy="19" r="1" /><circle cx="17" cy="19" r="1" /></svg>;
}
