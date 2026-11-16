import Link from "next/link";

export default function OrderPreviewUnavailable() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-24 text-injera">
      <p className="text-xs font-bold uppercase tracking-widest text-gold">Preview environment</p>
      <h1 className="mt-4 font-display text-4xl">Menus are not connected in this preview.</h1>
      <p className="mt-5 leading-relaxed text-injera/70">Live cook listings and ordering are unavailable here. You can still explore the practice kitchen. Its points have no monetary value.</p>
      <div className="mt-8 flex flex-wrap gap-6">
        <Link href="/play" className="font-semibold text-gold underline underline-offset-4">Try the practice kitchen</Link>
        <Link href="/" className="font-semibold text-gold underline underline-offset-4">Back to Aden Eats</Link>
      </div>
    </main>
  );
}
