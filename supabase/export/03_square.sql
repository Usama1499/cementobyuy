-- Optional: track which provider settled each order.
alter table public.orders
  add column if not exists payment_provider text,
  add column if not exists square_payment_id text;
