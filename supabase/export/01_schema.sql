-- ============================================================
-- Cemento — full schema for a fresh Supabase project
-- Run this FIRST in the SQL editor of the target project.
-- ============================================================

-- ---------- shared functions ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path to 'public'
as $$
begin new.updated_at = now(); return new; end; $$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end; $$;

-- ---------- profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();

-- auto-create a profile row on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- products (public catalog) ----------
create table if not exists public.products (
  id text primary key,
  name text not null,
  price numeric not null,
  category text not null,
  image text not null,
  description text not null,
  long_description text,
  coverage text,
  unit text,
  stock integer not null default 100,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "products_public_read" on public.products for select to anon, authenticated using (active = true);
create trigger trg_products_updated before update on public.products
  for each row execute function public.set_updated_at();

-- ---------- textures (public catalog) ----------
create table if not exists public.textures (
  id text primary key,
  name text not null,
  description text not null,
  swatch_color text not null,
  prompt_fragment text not null,
  image_url text not null default '',
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.textures to anon, authenticated;
grant all on public.textures to service_role;
alter table public.textures enable row level security;
create policy "textures_public_read" on public.textures for select to anon, authenticated using (active = true);

-- ---------- colors (public catalog) ----------
create table if not exists public.colors (
  id text primary key,
  name text not null,
  hex text not null,
  prompt_fragment text not null,
  sort_order integer not null default 0,
  active boolean not null default true
);
grant select on public.colors to anon, authenticated;
grant all on public.colors to service_role;
alter table public.colors enable row level security;
create policy "colors_public_read" on public.colors for select to anon, authenticated using (active = true);

-- ---------- orders ----------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending',
  subtotal numeric not null,
  currency text not null default 'AUD',
  stripe_session_id text unique,
  customer_email text,
  customer_name text,
  notes text,
  items jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists orders_user_idx on public.orders (user_id, created_at desc);
grant select, insert, update on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "orders_select_own" on public.orders for select to authenticated using (auth.uid() = user_id);
create policy "orders_insert_own" on public.orders for insert to authenticated with check (auth.uid() = user_id);
create policy "orders_update_own" on public.orders for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create trigger trg_orders_updated before update on public.orders
  for each row execute function public.set_updated_at();

-- ---------- visualization_history (AI visualiser quota) ----------
create table if not exists public.visualization_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  color_id text,
  texture_id text,
  notes text,
  created_at timestamptz not null default now()
);
create index if not exists viz_user_month_idx on public.visualization_history (user_id, created_at desc);
grant select, insert on public.visualization_history to authenticated;
grant all on public.visualization_history to service_role;
alter table public.visualization_history enable row level security;
create policy "viz_select_own" on public.visualization_history for select to authenticated using (auth.uid() = user_id);
create policy "viz_insert_own" on public.visualization_history for insert to authenticated with check (auth.uid() = user_id);
