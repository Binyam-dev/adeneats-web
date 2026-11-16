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
