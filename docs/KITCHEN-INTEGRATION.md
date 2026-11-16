# Kitchen integration review

Base: `Binyam-dev/adeneats-web`, `1b5fe009790fac9e4416a71ebf1b23e6a04e0107`.

## Architecture and boundaries

The home page now has an entry card immediately after recipe discovery. `/play` is a Next.js App Router route with metadata, back navigation, and a responsive full-height sandboxed frame pointing to the checked-in `public/kitchen/index.html`.

The frame is deliberate prototype isolation, not a native React rewrite. Only `allow-scripts` is granted. It cannot access parent DOM/cookies/storage, submit forms, open popups, or navigate the parent. All game scripts and original SVG artwork are local; there are no network calls or user data. Scores live only in memory and are clearly labeled practice points. Browser refresh discards the round. Game scripts render only developer-authored static data; no external strings enter HTML.

No checkout, authentication, waitlist, deployment config, dependency manifest, lockfile, or financial logic changed. The standalone source remains in the separate prototype package. The HTML is the canonical self-contained asset for this integration; its actual bundled scoring is tested rather than a separate duplicate implementation.

## Evidence

- `npm test`: **14/14 passed**, including 10 existing waitlist tests and four new bundled-game/integration tests.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `JSDOM_MODULE=/tmp/aden-qa/node_modules/jsdom/lib/api.js node tests/e2e/kitchen-dom.mjs`: passed full DOM rounds, including perfect 120 score, incorrect pantry, duplicate wrong action penalty, bad heat, three-stir gate, mode and replay resets. This is DOM-level verification, not visual/browser evidence.
- `npm run build`: compilation and TypeScript passed, then **blocked by pre-existing `/order` prerender dependency on missing Supabase public URL/anon-key environment variables**. No credentials were copied, fabricated, or changed.
- Playwright `tests/e2e/kitchen.mjs`: provided but **could not execute**; Chromium fails before page loading with `socket() failed: Operation not permitted`. Mobile layout, frame behavior and visual appearance therefore still require real browser QA.
- `git diff --check`: passed.

## Release gate status

Not production-ready or deployed. The repository contract requires coverage >=80%, browser E2E and adversarial review; these gates are not certified here. The referenced fortification workflow and `.agents/skills` are absent at the base commit, and `docs/PLAN.md` was absent, so a narrowly scoped plan was added rather than claiming existing plan compliance.

Before publishing: run a real browser at desktop and narrow mobile widths; verify focus, frame scrolling, navigation, reduced motion and the complete round; run coverage and security review; have an Ethiopian cook review the simplified shiro sequence. The game explains that recipes vary and is not a real-time cooking guide. The website's existing assets and styles were not replaced.

Future financial rewards must be a separately approved feature with server-validated play, authenticated accounts, reward caps, replay protection, one-time redemption, approved conversion/expiry rules, and integration with actual ordering. Never trust a client-side score for monetary value.

## Applying the review patch

Use a fresh branch based on the base commit, inspect the patch, then `git apply --check adeneats-kitchen-integration.patch` followed by `git apply adeneats-kitchen-integration.patch`. Do not apply over other edits without reviewing conflicts. This handoff does not authorize a push or deployment. No remote write has been performed.

## Preview build follow-up

Vercel logs confirmed the same missing public Supabase configuration failure as the local build. A narrow code-only fallback now applies **only** when `VERCEL_ENV=preview` and either public Supabase setting is absent. Both order routes and cook metadata avoid database construction in that case and show explicit unavailability; there are no fabricated cooks or borrowed credentials. Configured previews and production/development retain the existing behavior. The existing `/order` redirect is unchanged.

Verification after the fix: 16/16 unit tests, lint, typecheck and `VERCEL_ENV=preview npm run build` pass; all 16 static pages generated, including `/play`. New tests cover 36 environment/configuration combinations. Real-browser QA remains pending. This is still a feature in the existing AdenEats website and hosting project, not a new product or service.

## Challenge revision (user feedback)

- Three selectable dishes: misir and shiro beginner, doro advanced. Doro has nine ingredients/eight sequence steps, five stirs, a narrower acceptable heat range and three serving portions.
- Correct ingredient tiles animate into the pot using layout-derived flight paths. Pot color/toppings reflect the selected dish; ladling animates toward an illustrated injera plate. Reduced motion suppresses flights; restarting removes in-flight elements.
- Two total wrong choices across pantry, cooking sequence, heat and serving reset the same dish: empty selection, zero score, first stage and fresh two chances. A repeated wrong tap counts again; completed/disabled correct choices cannot duplicate points. Recipe or mode change explicitly starts over.
- Final stage requires laying injera, ladling the dish-specific portion count and pressing Serve. There is no checkout integration or monetary value.
- DOM tests exercise all three complete dishes, resets at every stage, life carryover, duplicate actions, phase gates, recipe/mode switches and flight cleanup/reduced motion. The browser harness now covers mobile completion and 320/390/768/1440 widths, but real-browser execution is still pending.

### Recipe editorial references

These are simplified game cards, not canonical recipes or food-safety instructions. Family/region variations are explicitly acknowledged. No real cooking times/temperatures are inferred from taps; the doro stove stage explicitly warns that it cannot determine real chicken safety. A cook should review before live publication.

- [Delina / Nazareth's shiro recipe](https://www.delinaonline.com/shiro-wot-recipe): onion base and water followed by gradually incorporated legume flour and gentle stirring. Our short card uses a seasoned flour blend and omits some optional/variable additions.
- [Ethiopian Spices recipes](https://ethiopianspices.com/pages/recipes): red lentil stew ingredient family (onion, oil, garlic, berbere, lentils, water), plus gradual shiro incorporation. Their page also documents a turmeric lentil variation; the game chooses a berbere version.
- [University of Florida Center for African Studies, Doro Wot](https://africa.ufl.edu/doro-wot-%E1%8B%B6%E1%88%AE-%E1%8B%8D%E1%8C%A5-with-kyle-fahey/): layered onions, spice, chicken, clarified butter, finishing spice and boiled eggs. The game condenses the sequence rather than reproducing a complete cooking recipe.
