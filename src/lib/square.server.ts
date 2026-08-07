// Square Payments — server-only REST client (Workers/Node compatible, no SDK
// native deps). The access token never leaves the server.
//
// Env:
//   SQUARE_ACCESS_TOKEN   (secret, server only)
//   SQUARE_LOCATION_ID
//   SQUARE_APPLICATION_ID (public app id, used by the browser Web Payments SDK)
//   SQUARE_ENVIRONMENT    "sandbox" (default) | "production"

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

export function squareEnvironment(): "sandbox" | "production" {
  const explicit = env("SQUARE_ENVIRONMENT") ?? env("VITE_SQUARE_ENVIRONMENT");
  if (explicit === "production") return "production";
  if (explicit === "sandbox") return "sandbox";
  const appId = env("SQUARE_APPLICATION_ID") ?? env("VITE_SQUARE_APP_ID") ?? "";
  return appId.startsWith("sandbox-") ? "sandbox" : "production";
}

function apiBase(): string {
  return squareEnvironment() === "production"
    ? "https://connect.squareup.com"
    : "https://connect.squareupsandbox.com";
}

function accessToken(): string {
  const token = env("SQUARE_ACCESS_TOKEN");
  if (!token) throw new Error("Square is not configured (set SQUARE_ACCESS_TOKEN)");
  return token;
}

export function squarePublicConfig(): {
  appId: string | null;
  locationId: string | null;
  environment: "sandbox" | "production";
  configured: boolean;
} {
  const appId = env("SQUARE_APPLICATION_ID") ?? env("VITE_SQUARE_APP_ID") ?? null;
  const locationId = env("SQUARE_LOCATION_ID") ?? env("VITE_SQUARE_LOCATION_ID") ?? null;
  return {
    appId,
    locationId,
    environment: squareEnvironment(),
    configured: Boolean(appId && locationId && env("SQUARE_ACCESS_TOKEN")),
  };
}

interface SquareErrorBody {
  errors?: { detail?: string; code?: string; category?: string }[];
}

async function squareFetch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${apiBase()}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken()}`,
      "Content-Type": "application/json",
      "Square-Version": "2025-01-23",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    let message = `Square error [${res.status}]`;
    try {
      const parsed = JSON.parse(text) as SquareErrorBody;
      const detail = parsed.errors?.map((e) => e.detail ?? e.code).filter(Boolean).join("; ");
      if (detail) message = detail;
    } catch {
      message = `${message}: ${text.slice(0, 300)}`;
    }
    throw new Error(message);
  }
  return JSON.parse(text) as T;
}

export interface SquarePaymentResult {
  id: string;
  status: string;
  receiptUrl: string | null;
  amountCents: number;
}

export async function createSquarePayment(params: {
  sourceId: string;
  amountCents: number;
  currency: string;
  idempotencyKey: string;
  referenceId?: string;
  note?: string;
  buyerEmail?: string;
  verificationToken?: string;
}): Promise<SquarePaymentResult> {
  const locationId = env("SQUARE_LOCATION_ID");
  if (!locationId) throw new Error("Square is not configured (set SQUARE_LOCATION_ID)");

  const payload: Record<string, unknown> = {
    source_id: params.sourceId,
    idempotency_key: params.idempotencyKey,
    amount_money: { amount: params.amountCents, currency: params.currency },
    location_id: locationId,
    autocomplete: true,
  };
  if (params.referenceId) payload.reference_id = params.referenceId.slice(0, 40);
  if (params.note) payload.note = params.note.slice(0, 500);
  if (params.buyerEmail) payload.buyer_email_address = params.buyerEmail;
  if (params.verificationToken) payload.verification_token = params.verificationToken;

  const data = await squareFetch<{
    payment: { id: string; status: string; receipt_url?: string; amount_money?: { amount: number } };
  }>("/v2/payments", payload);

  return {
    id: data.payment.id,
    status: data.payment.status,
    receiptUrl: data.payment.receipt_url ?? null,
    amountCents: data.payment.amount_money?.amount ?? params.amountCents,
  };
}
