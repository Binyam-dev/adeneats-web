-- Aden Eats — launch_waitlist table
--
-- Confirmed 2026-07-19: this table does not exist yet (the app-side
-- waitlist session hasn't run). Run this whole file once in the Supabase
-- SQL editor. If the table turns out to already exist by the time you run
-- this, drop the CREATE TABLE block below and ask for ALTER statements
-- instead — don't run CREATE TABLE against an existing table.

create table public.launch_waitlist (
  id uuid primary key default gen_random_uuid(), -- pgcrypto, enabled by default on Supabase
  email text not null,
  region text, -- reserved for the app's own DMV sub-region picker; this site only ever writes city
  role text not null check (role in ('client', 'cook')),
  city text,
  name text, -- cook signups only
  cuisine_specialty text, -- cook signups only
  created_at timestamptz not null default now(),
  constraint launch_waitlist_email_role_key unique (email, role)
);

alter table public.launch_waitlist enable row level security;

-- Anon (the site's NEXT_PUBLIC_SUPABASE_ANON_KEY) may only insert.
-- No select/update/delete policy is defined, so RLS denies those by
-- default for anon; service_role (used server-side, e.g. an admin view)
-- bypasses RLS entirely.
create policy "Anon can join the waitlist"
  on public.launch_waitlist
  for insert
  to anon
  with check (true);
