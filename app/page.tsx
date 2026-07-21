import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import DishGrid from "@/components/DishGrid";
import CookTeaser from "@/components/CookTeaser";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import { publicImageExists } from "@/lib/media";

const HERO_IMAGE = "/images/hero.jpg";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Aden Eats",
  description:
    "A home-cooked Ethiopian and Eritrean food marketplace connecting vetted Habesha home cooks with neighbors across the DMV for pickup ordering.",
  url: "https://adeneats.com",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Washington, DC" },
    { "@type": "AdministrativeArea", name: "Maryland" },
    { "@type": "AdministrativeArea", name: "Virginia" },
  ],
  sameAs: ["https://instagram.com/adeneatsdmv"],
};

export default function Home() {
  const appStoreUrl = process.env.APP_STORE_URL;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Nav appStoreUrl={appStoreUrl} />
      <main className="flex-1">
        <Hero
          appStoreUrl={appStoreUrl}
          heroImage={publicImageExists(HERO_IMAGE) ? HERO_IMAGE : undefined}
        />
        <HowItWorks />
        <DishGrid />
        <CookTeaser />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
