import Link from "next/link";
import Container from "./Container";
import Reveal from "./Reveal";

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

            <div className="rounded-[var(--radius-card)] border border-injera/10 bg-teff/75 p-7">
              <div
                aria-hidden="true"
                className="mb-5 flex h-30 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#3a2a20,#5c4230)] text-center text-[0.62rem] uppercase tracking-[0.14em] text-injera/50"
              >
                Photo: cook portrait
              </div>
              <p className="text-[0.92rem] italic text-injera-dim">
                &quot;I&apos;ve been making doro wat for my family for twenty
                years. Now my neighborhood gets to taste it too — and it
                pays.&quot;
              </p>
              <div className="mt-3 text-[0.88rem] font-medium text-injera">
                — A future Aden cook, maybe you
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
