
# Cemento Complete Upgrade — Plan

This is a large multi-part rebuild. Before I start, a few important decisions and warnings.

## ⚠️ Important notes

1. **Your Google API key was pasted in chat.** That exposes it publicly. I will store it as a secret via the secure form (`GOOGLE_AI_API_KEY`) and **strongly recommend you rotate/regenerate it in Google AI Studio afterwards**. I will not hardcode it.
2. **Gemini 3.1 Flash Lite Image (Nano Banana 2 Lite)** — the official Google AI Studio API for this model requires the Vertex `generateContent` shape. I'll build a thin server-side adapter so the model can be swapped later.
3. **Lovable Cloud (Supabase)** must be enabled for auth, database, and RLS. I'll enable it as step 1.
4. **Stripe**: using your test publishable key + the already-stored `STRIPE_TEST_API_KEY`. This will be a BYOK Stripe integration (not Lovable's managed payments) since you supplied your own keys.
5. **Email verification disabled** — I will note this in code, but the actual toggle lives in the Cloud Auth settings; I'll configure it programmatically.

## Scope & phases

### Phase 1 — Backend foundation
- Enable Lovable Cloud.
- Store `GOOGLE_AI_API_KEY` (secure form).
- Migrations: `profiles`, `products`, `textures`, `orders`, `order_items`, `visualization_history` + RLS + GRANTs.
- Trigger: auto-create profile on signup (`monthly_visualizations_used=0`, `last_reset_date=today`).
- SQL function `consume_visualization(user_id)`: atomically resets counter if month changed, checks < 10, increments, returns `{allowed, remaining}`. Enforced server-side.
- Seed products + textures from current `src/lib/products.ts`.

### Phase 2 — Auth
- `/auth` route: login + register tabs (email/password, autoconfirm).
- Session hydration via existing `_authenticated` gate.
- Move `/visualiser`, `/cart` checkout, `/account` under `_authenticated`.
- Header shows account menu / sign out when signed in.

### Phase 3 — Gemini integration (replaces Lovable AI Gateway)
- Delete `src/routes/api/visualise.ts` streaming Lovable path + `src/lib/stream-visualisation.ts`.
- New server fn `generateVisualization` (authenticated):
  1. Calls `consume_visualization` RPC — if not allowed, returns the exact quota message.
  2. Builds prompt via `buildVisualizationPrompt({color?, texture?})` per your rules.
  3. POSTs to `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-image:generateContent` with image + prompt.
  4. Stores row in `visualization_history` (base64 → returned as data URL; images stored inline for now — can move to Storage later).
  5. Returns `{ imageBase64, remaining }`.
- Model id/endpoint isolated in `src/lib/ai/gemini.server.ts` for easy swap.

### Phase 4 — Visualiser redesign
- Steps: Upload → Color swatches → Texture cards (both optional, at least one required).
- Remove finish/surface/notes fields.
- Result view: side-by-side Original ↔ Generated with **Download** and **Generate Again** buttons.
- Shows remaining/10 for the month; friendly error on quota.

### Phase 5 — Stripe checkout (replaces WhatsApp order)
- Server fn `createCheckoutSession` (authenticated): creates order (status=pending), builds Stripe Checkout Session with line items, returns URL.
- Public webhook `/api/public/webhooks/stripe`: verifies signature, marks order paid, writes `order_items`.
- Routes: `/checkout/success`, `/checkout/cancel`.
- Cart page: "Checkout" button (redirects to `/auth?next=/cart` if not signed in).
- Adds `STRIPE_WEBHOOK_SECRET` (I'll walk you through creating the webhook in Stripe dashboard after deploy).

### Phase 6 — Product/texture management
- `src/config/products.ts` + `src/config/textures.ts` as typed source-of-truth used by seed migration. Adding a product = add object + image, no UI edits.
- Product cards → click opens `ProductDetailDialog` (shadcn Dialog) with large image, full description, texture, color, add-to-cart.

### Phase 7 — UI polish
- Skeleton loaders (product grid, visualiser result).
- Empty/error states across cart, store, visualiser, account.
- Sonner success/error toasts already wired — extend usage.
- Tighten spacing, typography, hover states, mobile breakpoints.

### Phase 8 — Account page
- `/account`: email, plan, "X of 10 visualizations used this month", order history.

## Technical details

**Prompt builder** (server-only):
```ts
buildVisualizationPrompt({ color, texture }) → string
// only color / only texture / both — hardcoded per your spec
```

**Gemini adapter shape:**
```ts
generateWallImage({ imageDataUrl, prompt }): Promise<{ base64: string; mimeType: string }>
```
All model/URL config in one file; switching to another model = edit one constant.

**RLS summary:**
- `profiles`: user reads/updates own row only.
- `orders`, `order_items`, `visualization_history`: user reads own only; writes done via service role in server fns.
- `products`, `textures`: public SELECT (`TO anon, authenticated`).

**Files removed:** `src/routes/api/visualise.ts`, `src/lib/stream-visualisation.ts`, WhatsApp order flow in `src/routes/cart.tsx` (keeping `WhatsAppFloat` for general contact — confirm if you want that gone too).

**Not in scope unless you confirm:** removing the floating WhatsApp contact button, moving images from base64 to Supabase Storage, admin dashboard for managing products/textures via UI, custom domain email templates.

## Confirmations I need before building

1. Rotate the Google API key you pasted, after I store it? (recommended — say yes and I'll continue)
2. Keep the floating WhatsApp contact button for general enquiries, or remove it entirely?
3. OK to store generated images inline in `visualization_history` (base64/data URL) for v1 rather than Supabase Storage?

Reply "go" (plus answers to 2 & 3) and I'll execute all 8 phases.
