import Container from "./Container";
import Reveal from "./Reveal";

const steps = [
  {
    glyph: "🏡",
    tint: "bg-teal-tint",
    title: "Find a cook near you",
    body: "Browse vetted home cooks in the DMV. See their menus, ratings, and specialties — every cook is reviewed and approved before their first order.",
  },
  {
    glyph: "🍲",
    tint: "bg-berbere-tint",
    title: "Order real home cooking",
    body: "Pick your dishes, your spice level, and your pickup time. Pay securely in the app — tips go 100% to your cook.",
  },
  {
    glyph: "🤝",
    tint: "bg-gold-tint",
    title: "Pick up & enjoy",
    body: "Meet your cook, grab your order hot, and taste the difference a home kitchen makes. Betam tafach.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24">
      <Container>
        <Reveal>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            How it works
          </div>
          <h2 className="max-w-[20ch] text-display-lg font-display text-injera">
            From their kitchen to your table.
          </h2>
          <p className="mt-4 max-w-[56ch] text-injera-dim">
            No restaurant markup, no shortcuts on tradition. Just the food
            you grew up with — or the food you&apos;ve been meaning to fall
            in love with.
          </p>
        </Reveal>

        <div className="mt-13 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="h-full rounded-[var(--radius-card)] border border-border bg-teff-panel p-8 transition-transform hover:-translate-y-1.5">
                <div
                  className={`mb-5 flex h-13 w-13 items-center justify-center rounded-2xl text-2xl ${step.tint}`}
                >
                  {step.glyph}
                </div>
                <h3 className="text-display-md font-display text-injera">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] text-injera-dim">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
