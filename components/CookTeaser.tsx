import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const COOK_PORTRAIT = "/images/cooks/portrait.webp";

const stats = [
  { value: "85%", label: "of every order is yours" },
  { value: "100%", label: "of tips go to you" },
  { value: "$0", label: "to join" },
];

export default function CookTeaser() {
  return (
    <section id="cooks" className="py-24">
      <Container>
        <Reveal>
          <div
            className="grid items-center gap-12 rounded-[var(--radius-panel)] border border-teal/20 p-11 md:grid-cols-[1.2fr_0.8fr] md:p-14"
            style={{
              background:
                "linear-gradient(120deg, rgb(29 158 117 / 0.13), transparent 55%), var(--color-teff-panel)",
            }}
          >
            <div>
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Cook with Aden
              </div>
              <h2 className="text-display-lg font-display text-injera">
                Your kitchen. Your recipes.{" "}
                <em className="font-bold not-italic text-gold">
                  Your income.
                </em>
              </h2>
              <p className="mt-4 max-w-[56ch] text-injera-dim">
                Turn the cooking your family already loves into real
                earnings. Set your own menu, prices, and schedule — we
                handle payments, orders, and customers.
              </p>
              <div className="mt-8 flex flex-wrap gap-9">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <b className="block font-display text-3xl font-bold text-teal">
                      {stat.value}
                    </b>
                    <span className="text-[0.82rem] text-injera-dim">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/cooks"
                className="mt-9 inline-block rounded-full bg-gold px-7 py-3.5 font-medium text-teff shadow-[0_6px_24px_rgb(226_169_59_/_0.3)] transition-transform hover:-translate-y-0.5"
              >
                Apply to cook
              </Link>
            </div>

            <div style={{ transform: "rotate(1.2deg)" }}>
              <TiltCard
                maxTilt={4}
                className="relative rounded-[var(--radius-card)] border border-teff/15 bg-injera p-7 shadow-[0_14px_34px_rgb(0_0_0_/_0.35)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_2px_5px_rgb(0_0_0_/_0.5)]"
                />
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={COOK_PORTRAIT}
                    alt="An Ethiopian home cook in a warm, clean home kitchen"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 30vw, 90vw"
                  />
                </div>
                <p className="font-display text-[1rem] text-teff/85">
                  Your recipes carry history. Aden helps them reach the
                  neighbors who have been looking for that taste of home.
                </p>
                <div className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-teff/60">
                  Cook on your terms
                </div>
              </TiltCard>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
