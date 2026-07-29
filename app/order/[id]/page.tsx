import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import CookMenu from "@/components/CookMenu";
import { getServerSupabase } from "@/lib/supabase-server";
import type { CookListing } from "@/lib/order-types";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from("cook_listings")
    .select("name,bio")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();
  return data
    ? { title: `${data.name}'s menu`, description: data.bio ?? `Explore ${data.name}'s Aden Eats menu.` }
    : { title: "Cook menu" };
}

export default async function CookProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appStoreUrl = process.env.APP_STORE_URL;
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from("cook_listings")
    .select("*, menu_items(*)")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle<CookListing>();

  if (!data) notFound();
  const cook = {
    ...data,
    menu_items: data.menu_items.filter((item) => item.is_available !== false),
  };

  return (
    <>
      <Nav appStoreUrl={appStoreUrl} />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border py-16 sm:py-24">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgb(29_158_117_/_0.18),transparent_45%)]" />
          <Container className="relative">
            <Link href="/order" className="inline-flex min-h-11 items-center text-sm font-semibold text-teal">← Back to all cooks</Link>
            <div className="mt-8 grid items-center gap-10 md:grid-cols-[15rem_1fr]">
              <div className="relative aspect-square overflow-hidden rounded-full border-8 border-gold/15 bg-[linear-gradient(135deg,var(--color-teal-deep),var(--color-berbere-deep))] shadow-2xl">
                {cook.photo_url ? (
                  <Image src={cook.photo_url} alt={`Portrait of ${cook.name}`} fill priority className="object-cover" sizes="240px" />
                ) : (
                  <span className="absolute inset-0 grid place-items-center font-display text-8xl text-injera/75">{cook.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{[cook.city, cook.cuisine_specialty].filter(Boolean).join(" · ")}</p>
                <h1 className="mt-3 font-display text-hero text-injera sm:text-[3.8rem]">{cook.name}&apos;s kitchen</h1>
                {cook.bio && <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-injera-dim">{cook.bio}</p>}
              </div>
            </div>
          </Container>
        </section>
        <section className="py-20">
          <Container>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Today&apos;s menu</p>
            <h2 className="mt-3 mb-8 font-display text-display-lg text-injera">Made in this home kitchen.</h2>
            {cook.menu_items.length ? (
              <CookMenu cook={cook} />
            ) : (
              <div className="rounded-[var(--radius-panel)] border border-border bg-teff-panel p-10 text-center text-injera-dim">This cook is preparing their next menu.</div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
