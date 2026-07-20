import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Aden Eats collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav appStoreUrl={process.env.APP_STORE_URL} />
      <main className="flex-1 py-20">
        <Container className="max-w-[72ch]">
          <h1 className="text-display-lg font-display text-injera">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-injera-dim">Last updated —</p>

          {/* TODO(binyam): paste the existing privacy policy content here,
              replacing this placeholder, then retire the GitHub Pages copy. */}
          <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-berbere/40 bg-teff-panel p-8 text-injera-dim">
            <p className="font-medium text-berbere">
              Placeholder — content pending.
            </p>
            <p className="mt-2 text-[0.95rem]">
              This page will carry the same privacy policy currently
              published on GitHub Pages. Paste that content in to replace
              this block, then remove the old copy so adeneats.com/privacy
              is the single source of truth.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
