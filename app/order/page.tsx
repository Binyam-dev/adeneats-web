import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { getServerSupabase } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Order",
  description:
    "Browse home cooks and menus near you on Aden Eats. Ordering happens in the app — this is a preview of what's cooking.",
};

export const revalidate = 60;

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  fasting_friendly: boolean;
};

// From public.cook_listings — a website-only preview table, deliberately
// separate from the app team's public.cooks (unknown schema, not touched
// here). See supabase/ordering.sql.
type CookListing = {
  id: string;
  name: string;
  bio: string | null;
  city: string | null;
  cuisine_specialty: string | null;
  photo_url: string | null;
  menu_items: MenuItem[];
};

const PLACEHOLDER_GRADIENTS: [string, string][] = [
  ["#7a2412", "#c43b1e"],
  ["#0f6b4e", "#1d9e75"],
  ["#8a5a16", "#e2a93b"],
  ["#5c3a20", "#8a5a2e"],
];

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function OrderPage() {
  const appStoreUrl = process.env.APP_STORE_URL;
  const supabase = getServerSupabase();
  const { data: cooks } = await supabase
    .from("cook_listings")
    .select("*, menu_items(*)")
    .eq("is_published", true)
    .order("name")
    .returns<CookListing[]>();

  return (
    <>
      <Nav appStoreUrl={appStoreUrl} />

      <main className="flex-1">
        <section className="py-20 sm:py-24">
          <Container>
            <Reveal>
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                Order
              </div>
              <h1 className="max-w-[20ch] text-hero font-display text-injera sm:text-[3.4rem]">
                See what&apos;s cooking near you.
              </h1>
              <p className="mt-5 max-w-[56ch] text-[1.05rem] text-injera-dim">
                A preview of the home cooks and menus on Aden Eats. Ordering
                and pickup scheduling happen in the app.
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="pb-24">
          <Container>
            {cooks && cooks.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {cooks.map((cook, i) => (
                  <Reveal key={cook.id} delay={(i % 2) * 0.08}>
                    <div className="h-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-teff-panel transition-transform hover:-translate-y-1.5">
                      {cook.photo_url ? (
                        <div className="relative h-40">
                          <Image
                            src={cook.photo_url}
                            alt={cook.name}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 50vw, 100vw"
                          />
                        </div>
                      ) : (
                        <div
                          aria-hidden="true"
                          className="flex h-40 items-center justify-center text-[0.62rem] uppercase tracking-[0.14em] text-injera/55"
                          style={{
                            background: `linear-gradient(135deg, ${
                              PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length][0]
                            }, ${PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length][1]})`,
                          }}
                        >
                          Photo: {cook.name}
                        </div>
                      )}

                      <div className="p-7">
                        <h2 className="text-display-md font-display text-injera">
                          {cook.name}
                        </h2>
                        <p className="mt-1 text-[0.85rem] uppercase tracking-[0.1em] text-injera-dim">
                          {[cook.city, cook.cuisine_specialty]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                        {cook.bio && (
                          <p className="mt-3 text-[0.92rem] text-injera-dim">
                            {cook.bio}
                          </p>
                        )}

                        {cook.menu_items.length > 0 && (
                          <ul className="mt-6 space-y-4 border-t border-border pt-5">
                            {cook.menu_items.map((item) => (
                              <li key={item.id}>
                                <div className="flex items-baseline justify-between gap-3">
                                  <span className="font-display text-injera">
                                    {item.name}
                                  </span>
                                  <span className="whitespace-nowrap text-[0.9rem] text-gold">
                                    {formatPrice(item.price_cents)}
                                  </span>
                                </div>
                                {item.description && (
                                  <p className="mt-1 text-[0.88rem] text-injera-dim">
                                    {item.description}
                                  </p>
                                )}
                                {item.fasting_friendly && (
                                  <span className="mt-2 inline-block rounded-full border border-teal/50 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-teal">
                                    Fasting friendly
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal>
                <div className="rounded-[var(--radius-panel)] border border-border bg-teff-panel px-10 py-16 text-center">
                  <h2 className="text-display-md font-display text-injera">
                    No cooks are live yet — check back soon.
                  </h2>
                  <p className="mx-auto mt-3 max-w-[48ch] text-injera-dim">
                    Know a great home cook?
                  </p>
                  <Link
                    href="/cooks#waitlist"
                    className="mt-6 inline-block rounded-full bg-teal px-7 py-3.5 font-medium text-injera shadow-[0_6px_24px_rgb(29_158_117_/_0.35)] transition-transform hover:-translate-y-0.5"
                  >
                    Have them apply
                  </Link>
                </div>
              </Reveal>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
