import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FidelMarquee from "@/components/FidelMarquee";
import CulturalStory from "@/components/CulturalStory";
import CoffeeCeremony from "@/components/CoffeeCeremony";
import IngredientJourney from "@/components/cinematic/IngredientJourney";
import CookStoryScene from "@/components/cinematic/CookStoryScene";
import AnimatedOrderDemo from "@/components/cinematic/AnimatedOrderDemo";
import HumanPayoffScene from "@/components/cinematic/HumanPayoffScene";
import CommunityCTA from "@/components/cinematic/CommunityCTA";
import RecipeDiscovery from "@/components/cinematic/RecipeDiscovery";
import StoryInterlude from "@/components/cinematic/StoryInterlude";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Aden Eats",
  description:
    "A coming-soon Ethiopian and Eritrean food marketplace connecting vetted Habesha home cooks with neighbors across the DMV.",
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
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Nav appStoreUrl={appStoreUrl} />
      <main className="flex-1">
        <Hero appStoreUrl={appStoreUrl} />
        <FidelMarquee />
        <IngredientJourney />
        <CookStoryScene />
        <StoryInterlude />
        <AnimatedOrderDemo />
        <HumanPayoffScene />
        <RecipeDiscovery />
        <CulturalStory />
        <CoffeeCeremony />
        <CommunityCTA />
      </main>
      <Footer />
    </>
  );
}
