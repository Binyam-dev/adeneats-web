-- Aden Eats — repeatable launch_waitlist migration
--
-- Apply in the Supabase SQL editor before enabling the server waitlist route.
-- The route writes with SUPABASE_SERVICE_ROLE_KEY. The service role bypasses
-- RLS; browser/anon users intentionally receive no table policies.

create table if not exists public.launch_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  region text,
  role text not null,
  city text,
  name text,
  cuisine_specialty text,
  created_at timestamptz not null default now()
);

alter table public.launch_waitlist add column if not exists email text;
alter table public.launch_waitlist add column if not exists normalized_email text;
alter table public.launch_waitlist add column if not exists region text;
alter table public.launch_waitlist add column if not exists role text;
alter table public.launch_waitlist add column if not exists city text;
alter table public.launch_waitlist add column if not exists name text;
alter table public.launch_waitlist add column if not exists cuisine_specialty text;
alter table public.launch_waitlist add column if not exists created_at timestamptz default now();

-- Some earlier versions of the mobile backend introduced normalized_email.
-- Keep it populated so this migration works with that schema as well as a
-- fresh table. The API writes both email fields on every new submission.
update public.launch_waitlist
set normalized_email = lower(trim(email))
where normalized_email is null and email is not null;

alter table public.launch_waitlist alter column normalized_email set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.launch_waitlist'::regclass
      and conname = 'launch_waitlist_role_check'
  ) then
    alter table public.launch_waitlist
      add constraint launch_waitlist_role_check
      check (role in ('client', 'cook')) not valid;
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.launch_waitlist'::regclass
      and contype = 'u'
      and conname = 'launch_waitlist_email_role_key'
  ) then
    alter table public.launch_waitlist
      add constraint launch_waitlist_email_role_key unique (email, role);
  end if;
end
$$;

alter table public.launch_waitlist enable row level security;

-- Remove the legacy direct-browser insert path. This is idempotent and leaves
-- anon with no SELECT/INSERT/UPDATE/DELETE policy on this table.
drop policy if exists "Anon can join the waitlist" on public.launch_waitlist;
revoke all on table public.launch_waitlist from anon;
