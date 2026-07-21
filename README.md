# Aden Eats — marketing site

Phase 1 marketing site for [adeneats.com](https://adeneats.com). Next.js
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
| `NEXT_PUBLIC_SUPABASE_URL`       | client-side, waitlist insert             | yes                      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | client-side, waitlist insert             | yes                      |
| `APP_STORE_URL`                  | server-rendered into "Get the app" links | no — falls back to the waitlist form until it's set |

## Supabase setup

`public.launch_waitlist` was created as of 2026-07-20 by running
`supabase/launch_waitlist.sql` in the Supabase SQL editor. It creates the
table and an RLS policy that allows the anon key to `INSERT` only — no
read/update/delete access (confirmed: an anon-key `SELECT` correctly gets
rejected with `42501 permission denied`, not a missing-table error). If
you need to change the schema, use `ALTER TABLE` statements rather than
re-running the `CREATE TABLE` statement.

## Deploying (Vercel)

1. Import this repo into Vercel.
2. Framework preset: Next.js (auto-detected). No build command overrides
   needed.
3. Add the three environment variables above in Project Settings →
   Environment Variables (all three, for Production/Preview/Development as
   appropriate).
4. `vercel.json` sets baseline security response headers
   (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) — no
   other Vercel config is required for this app.

### Custom domain (adeneats.com)

1. Vercel dashboard → Project → Settings → Domains → add `adeneats.com`
   and `www.adeneats.com`.
2. At your DNS provider, point:
   - `adeneats.com` → `A` record to `76.76.21.21` (Vercel's anycast IP —
     confirm the current value shown in the Vercel dashboard, it's
     occasionally updated).
   - `www.adeneats.com` → `CNAME` to `cname.vercel-dns.com`.
3. Set the apex (`adeneats.com`) as the primary domain and redirect `www`
   to it (or vice versa — pick one canonical host) from the same Domains
   screen.
4. Vercel provisions and renews the TLS certificate automatically once DNS
   resolves — no manual certificate steps.

## Photography needed

Every photo panel on the site is currently a styled color placeholder with
a caption (never a stock photo of non-Ethiopian food). The Hero, dish
grid, and cook portrait panels already check for a real file at a fixed
path (`lib/media.ts`'s `publicImageExists`) and swap in `next/image`
automatically — **no code changes needed**, just drop the file in. Ideal
shot order:

1. Hero — table spread, shot from above → `public/images/hero.jpg`
2. Hands tearing injera (candidate for the "How it works" section — not
   wired up yet)
3. Buna (coffee ceremony) — candidate for future storytelling content —
   not wired up yet
4. Cook portrait (`components/CookTeaser.tsx`, and repeated on `/cooks`)
   → `public/images/cooks/portrait.jpg`
5. Dish close-ups, one per entry in `data/dishes.ts` (Doro Wat, Kitfo,
   Beyaynetu, Awaze Tibs, Shiro Wat, Gomen — 6 shots) →
   `public/images/dishes/<slug>.jpg`, e.g. `public/images/dishes/doro-wat.jpg`

## Project structure notes for Phase 2

Routes and components are split by page (`app/`, `app/cooks/`) rather than
folded into one monolith, specifically so an `/order` flow can be added
later without restructuring what's here.

## Ordering data (Phase 2, slice 1)

`/order` is a **read-only preview** — no cart, checkout, or payments. The
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

There's no admin UI yet, so listing/menu rows are entered manually
(Supabase dashboard or SQL editor, which bypasses RLS via `service_role`)
once a cook clears the vetting flow described on `/cooks`.

Cart, checkout, payments, and cook/customer accounts are explicitly out of
scope until there's a decision on whether any of that lives on the website
at all, versus staying app-exclusive.

## Copy decisions

See `COPY.md` for the headline options considered and why the current one
was chosen, plus notes on the Amharic accent text used across the site.
