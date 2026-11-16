import Link from "next/link";

export default function KitchenChallengeInvite() {
  return (
    <section aria-labelledby="kitchen-invite-title" className="border-y border-gold/20 bg-teff px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">The practice kitchen</p>
          <h2 id="kitchen-invite-title" className="mt-3 font-display text-4xl leading-tight text-injera sm:text-5xl">Your first pot of shiro.</h2>
          <p className="mt-4 text-base leading-relaxed text-injera/70">Pick your ingredients, build the flavor, and serve your virtual stew with injera. Discover Ethiopian food one delicious decision at a time.</p>
          <p className="mt-3 text-xs text-injera/50">Practice points only. Food-order discounts are not available in this prototype.</p>
        </div>
        <Link href="/play" className="inline-flex min-h-12 shrink-0 items-center rounded-full bg-gold px-7 py-4 text-sm font-bold text-teff transition hover:bg-injera focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
          Enter the kitchen →
        </Link>
      </div>
    </section>
  );
}
