import Link from "next/link";
import Container from "@/components/Container";
import WaitlistForm from "@/components/WaitlistForm";

export default function CommunityCTA() {
  return (
    <section id="waitlist" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgb(226_169_59_/_0.17),transparent_42%),linear-gradient(180deg,var(--color-teff-panel-2),var(--color-teff))]" />
      <div aria-hidden="true" className="hero-grain absolute inset-0 opacity-20" />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-ethiopic text-2xl text-gold">እንብላ</p>
          <h2 className="mt-6 font-display text-[clamp(3.4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.045em] text-injera">
            Your next favorite meal may be <em className="text-gold">cooking nearby.</em>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-injera-dim">
            Aden Eats is coming to DC, Maryland, and Virginia. Join the market waitlist and tell us where the table should open first.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-gold/20 bg-teff-panel/80 p-6 shadow-[0_40px_100px_rgb(0_0_0_/_0.4)] backdrop-blur-md sm:p-9">
          <WaitlistForm role="client" />
        </div>
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-4 border-t border-injera/10 pt-8 text-center">
          <p className="font-display text-2xl text-injera">Your recipes deserve a bigger table.</p>
          <Link href="/cooks#waitlist" className="inline-flex min-h-12 items-center rounded-full bg-berbere px-6 font-bold text-injera">
            Become a cook
          </Link>
        </div>
      </Container>
    </section>
  );
}
