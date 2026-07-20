import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import TibebBand from "@/components/TibebBand";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Cook with Aden",
  description:
    "Turn your home cooking into real income. Set your own menu and prices, keep 85% of every order plus 100% of tips, and cook on your own schedule.",
};

const earnings = [
  { value: "85%", label: "of every order is yours" },
  { value: "100%", label: "of tips go to you" },
  { value: "$0", label: "to apply or join" },
];

const vettingSteps = [
  {
    glyph: "📝",
    tint: "bg-teal-tint",
    title: "Application",
    body: "Tell us about your kitchen, your signature dishes, and where you're based. Takes about ten minutes.",
  },
  {
    glyph: "🔎",
    tint: "bg-berbere-tint",
    title: "Review",
    body: "A member of the Aden team walks through food safety basics with you and confirms your kitchen meets your state's home-kitchen guidelines.",
  },
  {
    glyph: "✅",
    tint: "bg-gold-tint",
    title: "Approved",
    body: "Set your menu and prices in the app, go live, and start taking orders from neighbors nearby.",
  },
];

const faqs = [
  {
    q: "Do I need a commercial kitchen?",
    a: "No — most Aden cooks operate from their home kitchen under their state's cottage food or home-kitchen guidelines. We'll walk you through what's required in DC, Maryland, or Virginia during the review step.",
  },
  {
    q: "How and when do I get paid?",
    a: "Aden handles payment collection in the app. You keep 85% of every order plus 100% of tips — no hidden fees.",
  },
  {
    q: "What if I only want to cook occasionally?",
    a: "You set your own schedule and menu. Cook every weekend or once a month — it's entirely up to you.",
  },
  {
    q: "Is there a fee to join?",
    a: "No. It's $0 to apply and $0 to join. We only do well when you do.",
  },
  {
    q: "Where is Aden Eats launching first?",
    a: "We're starting in DC, Maryland, and Virginia when the app launches on the App Store in October 2026, with more Habesha communities to follow.",
  },
];

export default function CooksPage() {
  const appStoreUrl = process.env.APP_STORE_URL;

  return (
    <>
      <Nav appStoreUrl={appStoreUrl} />

      <main className="flex-1">
        <section className="py-20 sm:py-24">
          <Container>
            <Reveal>
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Cook with Aden
              </div>
              <h1 className="max-w-[18ch] text-hero font-display text-injera sm:text-[3.4rem]">
                Your kitchen. Your recipes.{" "}
                <em className="font-bold not-italic text-gold">
                  Your income.
                </em>
              </h1>
              <p className="mt-5 max-w-[56ch] text-[1.05rem] text-injera-dim">
                Turn the cooking your family already loves into real
                earnings. Set your own menu, prices, and schedule — Aden
                handles payments, orders, and customers, so you can focus on
                what you do best.
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="pb-20">
          <Container>
            <Reveal>
              <div className="grid gap-8 rounded-[var(--radius-panel)] border border-teal/20 bg-teff-panel p-10 sm:grid-cols-3 sm:p-12">
                {earnings.map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <b className="block font-display text-4xl font-bold text-teal">
                      {stat.value}
                    </b>
                    <span className="text-[0.9rem] text-injera-dim">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <Reveal>
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                How vetting works
              </div>
              <h2 className="text-display-lg font-display text-injera">
                Every cook is reviewed before their first order.
              </h2>
              <p className="mt-4 max-w-[56ch] text-injera-dim">
                We keep the bar high so neighbors can trust what shows up at
                pickup — and so cooks who take food seriously stand out.
              </p>
            </Reveal>
            <div className="mt-13 grid gap-6 md:grid-cols-3">
              {vettingSteps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <div className="h-full rounded-[var(--radius-card)] border border-border bg-teff-panel p-8">
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

        <TibebBand />

        <section className="py-20">
          <Container>
            <Reveal>
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-berbere">
                Food safety
              </div>
              <h2 className="max-w-[26ch] text-display-lg font-display text-injera">
                What we expect from every kitchen.
              </h2>
              <ul className="mt-6 grid max-w-[64ch] gap-3 text-injera-dim sm:grid-cols-2">
                <li className="rounded-[var(--radius-card)] border border-border bg-teff-panel p-5 text-[0.92rem]">
                  A kitchen that meets your state&apos;s home-kitchen or
                  cottage food requirements.
                </li>
                <li className="rounded-[var(--radius-card)] border border-border bg-teff-panel p-5 text-[0.92rem]">
                  Basic food-handler knowledge — we&apos;ll point you to the
                  right training if you need it.
                </li>
                <li className="rounded-[var(--radius-card)] border border-border bg-teff-panel p-5 text-[0.92rem]">
                  Clear labeling of allergens and ingredients for every dish
                  you list.
                </li>
                <li className="rounded-[var(--radius-card)] border border-border bg-teff-panel p-5 text-[0.92rem]">
                  Consistent, on-time pickup windows so orders leave your
                  kitchen hot.
                </li>
              </ul>
            </Reveal>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <Reveal>
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                FAQ
              </div>
              <h2 className="text-display-lg font-display text-injera">
                Questions cooks ask us most.
              </h2>
              <div className="mt-10 max-w-[68ch] divide-y divide-border border-y border-border">
                {faqs.map((faq) => (
                  <details key={faq.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-injera">
                      {faq.q}
                      <span
                        aria-hidden="true"
                        className="text-teal transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-[0.95rem] text-injera-dim">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="py-20 text-center">
          <Container>
            <Reveal>
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Once you&apos;re approved
              </div>
              <h2 className="text-display-lg font-display text-injera">
                Manage your kitchen from the app.
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-injera-dim">
                The Aden Eats app is where approved cooks set menus, prices,
                and pickup windows, and where neighbors place orders.
                Launching on the App Store October 2026.
              </p>
              <Link
                href={appStoreUrl || "#waitlist"}
                target={appStoreUrl ? "_blank" : undefined}
                rel={appStoreUrl ? "noopener noreferrer" : undefined}
                className="mt-7 inline-block rounded-full bg-teal px-7 py-3.5 font-medium text-injera shadow-[0_6px_24px_rgb(29_158_117_/_0.35)] transition-transform hover:-translate-y-0.5"
              >
                Get the app
              </Link>
            </Reveal>
          </Container>
        </section>

        <TibebBand />

        <section id="waitlist" className="py-24 text-center">
          <Container>
            <Reveal>
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Apply to cook
              </div>
              <h2 className="text-display-lg font-display text-injera">
                Tell us about your kitchen.
              </h2>
              <p className="mx-auto mt-3.5 max-w-[52ch] text-injera-dim">
                Join the cook waitlist and we&apos;ll reach out as we open
                onboarding in your city.
              </p>
              <div className="mx-auto max-w-[560px]">
                <WaitlistForm role="cook" />
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
