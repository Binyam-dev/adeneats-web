-- Aden Eats — repeatable website marketplace migration
--
-- This intentionally uses public.cook_listings rather than the mobile app's
-- private public.cooks table. Apply in Supabase SQL Editor before enabling
-- public menus or the admin kitchen desk.

create table if not exists public.cook_listings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text,
  city text,
  cuisine_specialty text,
  photo_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  cook_listing_id uuid not null references public.cook_listings(id) on delete cascade,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  fasting_friendly boolean not null default false,
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.cook_listings add column if not exists bio text;
alter table public.cook_listings add column if not exists city text;
alter table public.cook_listings add column if not exists cuisine_specialty text;
alter table public.cook_listings add column if not exists photo_url text;
alter table public.cook_listings add column if not exists is_published boolean not null default false;
alter table public.menu_items add column if not exists description text;
alter table public.menu_items add column if not exists fasting_friendly boolean not null default false;
alter table public.menu_items add column if not exists is_available boolean not null default true;

create index if not exists cook_listings_published_idx
  on public.cook_listings (is_published, name);
create index if not exists menu_items_cook_available_idx
  on public.menu_items (cook_listing_id, is_available);

alter table public.cook_listings enable row level security;
alter table public.menu_items enable row level security;

drop policy if exists "Anon can view published cook listings" on public.cook_listings;
create policy "Anon can view published cook listings"
  on public.cook_listings for select to anon
  using (is_published);

drop policy if exists "Anon can view available items from published cook listings" on public.menu_items;
create policy "Anon can view available items from published cook listings"
  on public.menu_items for select to anon
  using (
    is_available
    and exists (
      select 1 from public.cook_listings
      where cook_listings.id = menu_items.cook_listing_id
      and cook_listings.is_published
    )
  );

grant select on table public.cook_listings to anon;
grant select on table public.menu_items to anon;

-- No anonymous write policies or grants are created. Admin API writes use
-- the server-only service role after token verification and email allowlist.
