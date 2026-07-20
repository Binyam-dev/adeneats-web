import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of Aden Eats.",
};

export default function TermsPage() {
  return (
    <>
      <Nav appStoreUrl={process.env.APP_STORE_URL} />
      <main className="flex-1 py-20">
        <Container className="max-w-[72ch]">
          <h1 className="text-display-lg font-display text-injera">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-injera-dim">Last updated —</p>

          {/* TODO(binyam): paste the terms of service content here,
              replacing this placeholder. */}
          <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-berbere/40 bg-teff-panel p-8 text-injera-dim">
            <p className="font-medium text-berbere">
              Placeholder — content pending.
            </p>
            <p className="mt-2 text-[0.95rem]">
              Paste the terms of service content in to replace this block.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
