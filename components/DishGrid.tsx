import Container from "./Container";
import Reveal from "./Reveal";
import { dishes } from "@/data/dishes";

export default function DishGrid() {
  return (
    <div
      id="dishes"
      className="bg-[linear-gradient(180deg,var(--color-teff)_0%,var(--color-teff-panel-2)_50%,var(--color-teff)_100%)] py-24"
    >
      <Container>
        <Reveal>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            The dishes
          </div>
          <h2 className="max-w-[24ch] text-display-lg font-display text-injera">
            The classics, done the way they&apos;re meant to be.
          </h2>
        </Reveal>

        <div className="mt-13 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, i) => (
            <Reveal key={dish.slug} delay={(i % 3) * 0.08}>
              <div className="h-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-teff-panel transition-transform hover:-translate-y-1.5">
                <div
                  aria-hidden="true"
                  className="flex h-36 items-center justify-center text-[0.62rem] uppercase tracking-[0.14em] text-injera/55"
                  style={{
                    background: `linear-gradient(135deg, ${dish.gradient[0]}, ${dish.gradient[1]})`,
                  }}
                >
                  Photo: {dish.name}
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-baseline justify-between gap-2.5">
                    <h3 className="text-display-md font-display text-injera">
                      {dish.name}
                    </h3>
                    <span className="font-ethiopic text-base text-gold">
                      {dish.fidel}
                    </span>
                  </div>
                  <p className="text-[0.88rem] text-injera-dim">
                    {dish.description}
                  </p>
                  {dish.fastingFriendly && (
                    <span className="mt-3 inline-block rounded-full border border-teal/50 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-teal">
                      Fasting friendly
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
