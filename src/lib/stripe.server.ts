// Minimal Stripe REST client using fetch (Workers-compatible).
// Reads the secret key from the environment only — never from client code.
// STRIPE_SECRET_KEY is the production/live variable; STRIPE_TEST_API_KEY is the fallback.
function key() {
  const k = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_TEST_API_KEY;
  if (!k) throw new Error("Stripe is not configured (set STRIPE_SECRET_KEY)");
  return k;
}


function form(obj: Record<string, string | number | undefined>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) if (v !== undefined) p.append(k, String(v));
  return p.toString();
}

export interface CheckoutLineItem {
  name: string;
  unitAmountCents: number;
  quantity: number;
  image?: string;
}

export async function createCheckoutSession(params: {
  lineItems: CheckoutLineItem[];
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}): Promise<{ id: string; url: string }> {
  const body: Record<string, string | number> = {
    mode: "payment",
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    "payment_method_types[0]": "card",
  };
  if (params.customerEmail) body.customer_email = params.customerEmail;
  params.lineItems.forEach((li, i) => {
    body[`line_items[${i}][quantity]`] = li.quantity;
    body[`line_items[${i}][price_data][currency]`] = "aud";
    body[`line_items[${i}][price_data][unit_amount]`] = li.unitAmountCents;
    body[`line_items[${i}][price_data][product_data][name]`] = li.name;
    if (li.image) body[`line_items[${i}][price_data][product_data][images][0]`] = li.image;
  });
  if (params.metadata) {
    for (const [k, v] of Object.entries(params.metadata)) body[`metadata[${k}]`] = v;
  }

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Stripe error [${res.status}]: ${text.slice(0, 400)}`);
  const data = JSON.parse(text) as { id: string; url: string };
  return { id: data.id, url: data.url };
}

export async function retrieveCheckoutSession(id: string): Promise<{
  id: string;
  payment_status: string;
  status: string;
  amount_total: number | null;
  customer_email: string | null;
}> {
  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${key()}` },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Stripe error [${res.status}]: ${text.slice(0, 400)}`);
  return JSON.parse(text);
}
