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

`public.launch_waitlist` does not exist yet in the project as of 2026-07-19.
Run `supabase/launch_waitlist.sql` once, in full, in the Supabase SQL
editor. It creates the table and an RLS policy that allows the anon key to
`INSERT` only — no read/update/delete access. If the table has since been
created by another process (e.g. the app team's own waitlist work), don't
run the `CREATE TABLE` statement against it — ask for `ALTER TABLE`
statements instead so the two don't drift.

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
a caption (never a stock photo of non-Ethiopian food). Replace them with
real photography, ideally in this order:

1. Hero — table spread, shot from above (`components/Hero.tsx`)
2. Hands tearing injera (candidate for the "How it works" section)
3. Buna (coffee ceremony) — candidate for future storytelling content
4. Cook portrait (`components/CookTeaser.tsx`, and repeated on `/cooks`)
5. Dish close-ups, one per entry in `data/dishes.ts` (Doro Wat, Kitfo,
   Beyaynetu, Awaze Tibs, Shiro Wat, Gomen — 6 shots)

When photography lands, swap the gradient `<div>` placeholders for
`next/image`, and update `data/dishes.ts` with an `image` field per dish.

## Project structure notes for Phase 2

Routes and components are split by page (`app/`, `app/cooks/`) rather than
folded into one monolith, specifically so an `/order` flow can be added
later without restructuring what's here. Nothing for ordering has been
built yet.

## Copy decisions

See `COPY.md` for the headline options considered and why the current one
was chosen, plus notes on the Amharic accent text used across the site.
