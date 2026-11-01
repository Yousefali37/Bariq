-- ---------------------------------------------------------------------------
-- Bariq catalogue schema for Supabase
--
-- Run this in the Supabase SQL editor (or with the Supabase CLI) once. It is
-- idempotent: re-running it adds missing columns and refreshes policies.
--
-- The public site only needs the products table and the public `media` bucket.
-- The admin panel signs in with Supabase Auth; only authenticated users can
-- write products or upload media.
-- ---------------------------------------------------------------------------

create extension if not exists "uuid-ossp";

-- Products ------------------------------------------------------------------
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  category text not null default 'necklaces',
  category_label text,
  price numeric(10, 2) not null default 0,
  image text,
  gallery jsonb not null default '[]'::jsonb,
  availability text not null default 'in-stock',
  stock_note text,
  lead_time text,
  material_families jsonb not null default '[]'::jsonb,
  color_families jsonb not null default '[]'::jsonb,
  materials jsonb not null default '[]'::jsonb,
  color text,
  short text,
  description text,
  details jsonb not null default '[]'::jsonb,
  options jsonb not null default '[]'::jsonb,
  size_guide text default '',
  badge text,
  featured boolean not null default false,
  newest boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add columns that may be missing on an older installation.
alter table public.products
  add column if not exists materials jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists size_guide text default '';
alter table public.products
  add column if not exists gallery jsonb not null default '[]'::jsonb;
alter table public.products
  add column if not exists material_families jsonb not null default '[]'::jsonb;
alter table public.products
  add column if not exists color_families jsonb not null default '[]'::jsonb;
alter table public.products
  add column if not exists details jsonb not null default '[]'::jsonb;
alter table public.products
  add column if not exists options jsonb not null default '[]'::jsonb;

create index if not exists products_category_idx
  on public.products (category);
create index if not exists products_availability_idx
  on public.products (availability);
create index if not exists products_featured_idx
  on public.products (featured);

-- Keep updated_at current.
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists update_products_updated_at on public.products;
create trigger update_products_updated_at
  before update on public.products
  for each row execute procedure public.update_updated_at_column();

-- Row level security --------------------------------------------------------
alter table public.products enable row level security;

drop policy if exists "Public read products" on public.products;
create policy "Public read products"
  on public.products
  for select
  using (true);

drop policy if exists "Auth manage products" on public.products;
create policy "Auth manage products"
  on public.products
  for all
  to authenticated
  using (true)
  with check (true);

-- Media bucket --------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read media" on storage.objects;
create policy "Public read media"
  on storage.objects
  for select
  using (bucket_id = 'media');

drop policy if exists "Auth upload media" on storage.objects;
create policy "Auth upload media"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "Auth update media" on storage.objects;
create policy "Auth update media"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

drop policy if exists "Auth delete media" on storage.objects;
create policy "Auth delete media"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'media');
