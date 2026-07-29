import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import OrderMarketplace from "@/components/OrderMarketplace";
import { getServerSupabase } from "@/lib/supabase-server";
import type { CookListing } from "@/lib/order-types";

export const metadata: Metadata = {
  title: "Order",
  description:
    "Browse home cooks and menus near you on Aden Eats. Ordering happens in the app — this is a preview of what's cooking.",
};

export const revalidate = 60;

export default async function OrderPage() {
  const appStoreUrl = process.env.APP_STORE_URL;
  const supabase = getServerSupabase();
  const { data: cooks, error } = await supabase
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

        <section
          className="pb-24"
          style={{
            backgroundImage:
              "radial-gradient(rgb(0 0 0 / 0.18) 1.5px, transparent 1.8px)," +
              "radial-gradient(rgb(245 235 220 / 0.05) 1px, transparent 1.6px)",
            backgroundSize: "26px 26px, 14px 14px",
            backgroundPosition: "0 0, 7px 7px",
          }}
        >
          <Container>
            {cooks && cooks.length > 0 ? (
              <OrderMarketplace cooks={cooks} />
            ) : (
              <Reveal>
                <div className="rounded-[var(--radius-panel)] border border-border bg-teff-panel px-10 py-16 text-center">
                  <h2 className="text-display-md font-display text-injera">
                    No cooks are live yet — check back soon.
                  </h2>
                  <p className="mx-auto mt-3 max-w-[48ch] text-injera-dim">
                    {error?.code === "PGRST205"
                      ? "The marketplace is being prepared. Join the waitlist for opening-day menus."
                      : "Know a great home cook?"}
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
