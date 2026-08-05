# Cemento — running locally (no Lovable required)

This is a **Vite + TanStack Start** app (React 19, Tailwind v4). It talks to
your own Supabase project, Stripe, and Google Gemini directly — nothing here
depends on Lovable at runtime.

## 1. Install

```bash
bun install     # or: npm install
```

## 2. Environment

```bash
cp .env.example .env
```

Then fill in the blanks in `.env`:

| Variable | Where to get it | Scope |
| --- | --- | --- |
| `VITE_SUPABASE_URL` / `SUPABASE_URL` | Supabase → Project Settings → API | client / server |
| `VITE_SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_PUBLISHABLE_KEY` | same page (`sb_publishable_…`) | client / server |
| `SUPABASE_SERVICE_ROLE_KEY` | same page (`sb_secret_…`) | **server only** |
| `GOOGLE_AI_API_KEY` | Google AI Studio (`AIza…`) | server only |
| `STRIPE_SECRET_KEY` | Stripe dashboard (`sk_live_…` / `sk_test_…`) | server only |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe dashboard (`pk_live_…`) | client |

> The error `Missing Supabase environment variable(s): SUPABASE_URL,
> SUPABASE_PUBLISHABLE_KEY` means the **server-side** twins are missing —
> the `VITE_` ones alone are not enough. Both sets are in `.env.example`.

`NEXT_PUBLIC_*` variable names do nothing here — this is not Next.js.

## 3. Database

In your Supabase SQL editor, run in order:

1. `supabase/export/01_schema.sql` — tables, indexes, triggers, GRANTs, RLS
2. `supabase/export/02_seed.sql` — catalog (16 colours, 12 textures, products)

Then, in Authentication → Providers → Email, enable email/password (the app
assumes auto-confirm), and add `http://localhost:8080` plus your production
URL under Authentication → URL Configuration.

## 4. Run

```bash
bun run dev      # http://localhost:8080
bun run build    # production build
```

## Notes

- **Images**: every image is a real `.jpg` / `.png` inside `src/assets/`
  (`finishes/`, `site/`) and is imported by Vite — no CDN, no JSON pointers.
- **Visualiser colours**: 16 MCT base colours × 10 shades each are derived at
  runtime in `src/lib/shades.ts`, so no 160-row table is needed.
- **Stripe**: the secret key is only ever read server-side in
  `src/lib/stripe.server.ts`; checkout sessions are created in
  `src/lib/checkout.functions.ts`.
