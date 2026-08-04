# Migrating Cemento to your own Supabase project

Target project: `https://mudbizqkcldtskdtomkv.supabase.co`

## 1. Run the SQL

In your new project's SQL editor, run in order:

1. `01_schema.sql` — all tables, indexes, unique constraints, functions, triggers, GRANTs and RLS policies
   (`profiles`, `products`, `textures`, `colors`, `orders`, `visualization_history`).
   There are no database views in this app.
2. `02_seed.sql` — the catalog data (16 colours, 12 textures, 28 products). Idempotent (`ON CONFLICT DO NOTHING`).

User rows (`profiles`, `orders`, `visualization_history`) are per-user data created at runtime — they are not
exported. `profiles` rows are recreated automatically by the `on_auth_user_created` trigger when a user signs up.

## 2. Auth settings (Dashboard → Authentication)

- Enable **Email / Password**.
- The app currently relies on **auto-confirm** (no email verification step): Authentication → Providers → Email →
  turn off "Confirm email", or keep it on and the signup flow will require the emailed link.
- Add your production and preview URLs under Authentication → URL Configuration → Site URL / Redirect URLs.
- Recommended: turn on the leaked-password (HIBP) check.

Auth code needs no change — `src/lib/auth.tsx` and the `_authenticated` route gate use the standard
`@supabase/supabase-js` client, which is entirely driven by the env vars below.

## 3. Storage

This project currently has **no storage buckets** — all images are static files bundled from `src/assets/`
(`finishes/`, `site/`), so there is no bucket or object structure to copy. If you add uploads later:

```sql
-- after creating the bucket in Dashboard → Storage
create policy "own folder read"  on storage.objects for select to authenticated
  using (bucket_id = 'uploads' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "own folder write" on storage.objects for insert to authenticated
  with check (bucket_id = 'uploads' and (storage.foldername(name))[1] = auth.uid()::text);
```

## 4. Realtime

No Realtime channels or subscriptions are used in the codebase. If you enable Realtime later, add the table to
the publication: `alter publication supabase_realtime add table public.orders;`

## 5. Environment variables

Important: this is a **Vite / TanStack Start** app, not Next.js. Client-visible variables must be prefixed
`VITE_`, not `NEXT_PUBLIC_`. `NEXT_PUBLIC_*` names are ignored by the bundler.

### Vercel — Project Settings → Environment Variables

| Variable | Value | Scope |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | `https://mudbizqkcldtskdtomkv.supabase.co` | client + server |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_W43SaU3KlU5CxmhYM5xEhg_ZYupzRU4` | client + server |
| `VITE_SUPABASE_PROJECT_ID` | `mudbizqkcldtskdtomkv` | client |
| `SUPABASE_URL` | `https://mudbizqkcldtskdtomkv.supabase.co` | server (SSR / server functions) |
| `SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_W43SaU3KlU5CxmhYM5xEhg_ZYupzRU4` | server |
| `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_...` from your new project (API keys page) | server only — never expose |
| `SUPABASE_PROJECT_ID` | `mudbizqkcldtskdtomkv` | server |
| `GOOGLE_AI_API_KEY` | your Google AI Studio key (Gemini — AI visualiser) | server only |
| `STRIPE_SECRET_KEY` | `sk_live_...` / `sk_test_...` | server only |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_51OLHA3CDRVgaNqKh...` | client |

The publishable key (`sb_publishable_…`) replaces the legacy `anon` JWT. The generated clients in
`src/integrations/supabase/` already detect the new opaque key format and send it as the `apikey` header
instead of a bearer JWT, so RLS behaves identically (`anon` for logged-out, the user's JWT for logged-in).

## 6. Code changes required

None in application code — no Supabase URL or key is hardcoded anywhere in `src/`; every client reads the env
vars above. The only Lovable-specific artefact is `supabase/config.toml` (`project_id`), which is used solely by
Lovable's tooling and is ignored by Vercel and by the Supabase CLI unless you link the project. When you take the
repo out of Lovable, replace its contents with:

```toml
project_id = "mudbizqkcldtskdtomkv"
```

## 7. Verify

```bash
bun install
bun run build
```

Then smoke test: sign up, sign in, load `/store` and `/textures` (public reads via `anon`), run the visualiser
(authenticated server function + quota row), and complete a Stripe checkout (order row written as the user).
