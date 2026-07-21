-- Aden Eats — cook_listings + menu_items (Phase 2, slice 1: browse-only
-- /order page)
--
-- IMPORTANT: a `public.cooks` table already exists in this Supabase project
-- (confirmed 2026-07-21 via the anon key: SELECT on `cooks` returns
-- `42501 permission denied`, i.e. the table exists but isn't granted to
-- anon — almost certainly the mobile app's backend). This file deliberately
-- does NOT touch `public.cooks` — its schema is unknown, and it's owned by
-- the app team. `cook_listings` below is a separate table for this
-- website's read-only preview, not a duplicate of the app's cook identity.
-- Reconciling the two (or merging them) is a follow-up once the app team's
-- actual `cooks` schema is available.
--
-- Run this whole file once in the Supabase SQL editor. Same conventions as
-- launch_waitlist.sql: RLS denies everything by default, and only the
-- narrowest policy needed for the website's anon key is added below.
--
-- No insert/update/delete policy is defined for `anon` on either table —
-- cook_listing/menu_item rows are created by whoever runs cook vetting, via
-- the Supabase dashboard or SQL editor (service_role bypasses RLS), until
-- an admin UI exists.

create table public.cook_listings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text,
  city text,
  cuisine_specialty text,
  photo_url text, -- populated later, once cook photos exist; null shows a placeholder
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  cook_listing_id uuid not null references public.cook_listings(id) on delete cascade,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  fasting_friendly boolean not null default false,
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.cook_listings enable row level security;
alter table public.menu_items enable row level security;

create policy "Anon can view published cook listings"
  on public.cook_listings
  for select
  to anon
  using (is_published);

create policy "Anon can view available items from published cook listings"
  on public.menu_items
  for select
  to anon
  using (
    is_available
    and exists (
      select 1 from public.cook_listings
      where cook_listings.id = menu_items.cook_listing_id
      and cook_listings.is_published
    )
  );
