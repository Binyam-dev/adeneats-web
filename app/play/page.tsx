import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aden Kitchen Challenge",
  description: "Take on misir, shiro and doro wot. Two chances to gather ingredients, cook, plate and serve in the Aden Eats practice kitchen.",
  robots: { index: false, follow: false },
};

/**
 * An intentionally isolated, local-only practice game. The sandbox grants script
 * execution, but no same-origin access, storage, forms, popups or navigation.
 * No score is trusted by checkout and no rewards APIs are connected.
 */
export default function KitchenPage() {
  return (
    <main className="flex h-dvh min-h-[30rem] flex-col bg-teff text-injera">
      <nav aria-label="Kitchen navigation" className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-injera/15 px-5 py-3">
        <Link href="/#dishes" className="rounded text-sm font-semibold text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
          ← Back to Aden Eats
        </Link>
        <span className="text-xs text-injera/65">Practice only · No redeemable rewards</span>
      </nav>
      <iframe
        title="Aden Eats Kitchen Challenge: misir, shiro and doro wot"
        src="/kitchen/index.html"
        sandbox="allow-scripts"
        referrerPolicy="no-referrer"
        className="min-h-0 w-full flex-1 border-0"
      />
    </main>
  );
}
