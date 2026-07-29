# Cinematic homepage implementation

## Experience levels

- Desktop: GSAP/ScrollTrigger horizontal ingredient journey, layered parallax,
  kinetic type, card depth, and continuous low-cost atmosphere.
- Mobile: vertical ingredient grid, no cursor dependency, shorter transitions,
  responsive photography, and an accessible menu.
- Reduced motion: no GSAP pinning or horizontal transform, no parallax,
  continuous effects disabled, and all narrative content remains visible.

## Demonstration-content boundary

The pre-launch order interface, Almaz profile, fulfillment statuses, payout
amount, and customer response are explicitly labeled demonstrations. They do
not represent live cooks, orders, earnings, pricing, ratings, or availability.

## Assets still needed before the app launch

The current site uses optimized, project-local WebP food, coffee, and cook
imagery. For the final application campaign, commission and approve:

1. `public/media/cooks/almaz-kitchen-portrait.avif`
   - 1600 × 2000 portrait
   - Release from the photographed cook
   - Real home kitchen, available-light editorial photography
2. `public/media/kitchen/onions-to-plating.webm`
   - 1920 × 1080, 8–12 seconds, muted loop, under 2.5 MB
   - Onion preparation, spice bloom, stirring, plating, and careful packaging
   - MP4 fallback and WebP poster frame
3. `public/media/community/two-homes.avif`
   - 2000 × 1200 landscape
   - Released cook and customer households photographed separately
4. Optional `public/models/gebeta-optimized.glb`
   - Under 1.5 MB after Draco compression
   - Photogrammetry-quality injera and platter materials
   - Only ship after testing shows a material improvement over the current
     photographic hero on ordinary mobile hardware

Do not replace these with unlicensed stock or generated images presented as
real Aden cooks.

## Cultural and content review

- Confirm Amharic/Fidel spelling and regional usage with a fluent reviewer.
- Review the demonstration name “Almaz” and Silver Spring location before
  public use.
- Validate future pickup/delivery language against actual launch operations.
- Validate all cook earning and home-kitchen claims with legal/operations
  before activating ordering.

## Motion architecture

- GSAP and ScrollTrigger are loaded dynamically only when the ingredient scene
  mounts on a device without reduced-motion preference.
- Framer Motion handles local UI transitions and viewport reveals.
- CSS handles grain, ember, word-entry, and hover effects.
- No custom smooth-scroll runtime, WebGL loop, or duplicate animation library
  is included.
