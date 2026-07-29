# Aden Eats — marketing site

Marketing site for [adeneats.com](https://adeneats.com). Next.js
(App Router) + TypeScript + Tailwind CSS v4 + Framer Motion, deployed on
Vercel. Talks to Supabase only to insert into `public.launch_waitlist` —
there is no ordering flow yet (that's Phase 2).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Supabase values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example`.

| Variable                        | Used                                    | Required to run locally |
| -------------------------------- | ---------------------------------------- | ------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`       | Supabase API URL                          | yes                      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | read-only public ordering preview         | yes                      |
| `SUPABASE_SERVICE_ROLE_KEY`      | server-only waitlist insert route         | yes for waitlist         |
| `ADMIN_EMAILS`                   | comma-separated `/admin` allowlist       | yes for admin            |
| `APP_STORE_URL`                  | server-rendered into "Get the app" links | no — falls back to the waitlist form until it's set |

## Supabase setup

Apply `supabase/launch_waitlist.sql` in the Supabase SQL editor. The migration
is repeatable: it creates or updates the table, preserves the unique
`(email, role)` rule, enables RLS, and removes the legacy anonymous insert
policy. `POST /api/waitlist` validates submissions and writes with the
server-only service-role key. Never expose that key in browser code.

## Deploying (Vercel)

1. Import this repo into Vercel.
2. Framework preset: Next.js (auto-detected). No build command overrides
   needed.
3. Add the four environment variables above in Project Settings →
   Environment Variables (for Production/Preview/Development as
   appropriate).
4. `vercel.json` sets baseline security response headers
   (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) — no
   other Vercel config is required for this app.

### Custom domain (adeneats.com)

Both `adeneats.com` and `www.adeneats.com` are attached to the
`adeneats-web-okda` Vercel project (done 2026-07-21 via `vercel domains
add`). That's only half the setup — the domain's nameservers are
Cloudflare's (`lucy.ns.cloudflare.com` / `howard.ns.cloudflare.com`), so
DNS itself is still managed in Cloudflare's dashboard, not this repo or
Vercel. Confirmed intent (2026-07-21): point straight at Vercel, not
proxied through Cloudflare. One of:

- **Hand DNS to Vercel entirely (simplest):** at the registrar, change
  the nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`.
- **Keep Cloudflare as DNS host:** in Cloudflare's DNS panel, set `@` and
  `www` to `CNAME` records pointing at the target `vercel domains verify
  adeneats.com` reports (it's signed per-request, so re-run rather than
  hardcoding it here) — proxy status must be **DNS only** (grey cloud),
  not proxied (orange cloud), or Vercel's TLS handshake fails.

After either change, run `vercel domains verify adeneats.com` (and the
`www` variant) to confirm — Vercel provisions and renews the TLS
certificate automatically once verification passes, no manual
certificate steps.

## Artwork and future photography

The hero, dish grid, and cook feature use project-local optimized WebP
photography under `public/images/`. Dish paths, alt text, and tap-to-reveal
stories live in `data/dishes.ts`.

## Project structure notes for Phase 2

Routes and components are split by page (`app/`, `app/cooks/`) rather than
folded into one monolith, specifically so an `/order` flow can be added
later without restructuring what's here.

## Ordering data (Phase 2, slice 1)

`/order` is an interactive marketplace preview with menu search, fasting
filters, public cook profiles, and a browser-persisted basket. No payment is
captured on the website; final ordering and pickup confirmation remain in the
app. The
site's own copy already positions the app as where ordering and cook menu
management happen ("manage your kitchen from the app"), so this slice only
gives cook listings a home in Supabase and lets the website show them.

**`public.cooks` already exists** in this Supabase project — confirmed
2026-07-21 (the anon key gets `42501 permission denied` on it, not a
missing-table error), almost certainly the mobile app's backend. Its schema
is unknown from this repo. To avoid guessing at — or colliding with — a
table another team owns, `/order` reads from a separate table,
`public.cook_listings`, not `public.cooks`. Reconciling or merging the two
is a follow-up once the app team's actual `cooks` schema is available; until
then, treat `cook_listings` as this website's own preview data, not a
mirror of the app's real cook records.

Run `supabase/ordering.sql` once, in full, in the Supabase SQL editor. It
creates `public.cook_listings` and `public.menu_items`, with RLS that lets
the anon key `SELECT` published listings and their available items only —
same insert/update/delete-denied-by-default pattern as `launch_waitlist.sql`.

The `/admin` kitchen desk uses Supabase passwordless email authentication.
Every admin API call verifies the access token and requires the authenticated
email to appear in the server-only `ADMIN_EMAILS` allowlist. Listings are
created as drafts and can be published only by an authorized administrator.
Apply `supabase/ordering.sql` before using either marketplace or admin route.

## Copy decisions

See `COPY.md` for the headline options considered and why the current one
was chosen, plus notes on the Amharic accent text used across the site.
