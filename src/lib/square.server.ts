// lib/square.server.ts
import { z } from "zod";

// Helper to get Square config from environment
export function getSquareConfig() {
  // Try multiple environment variable patterns
  const appId = 
    process.env.VITE_SQUARE_APP_ID || 
    process.env.SQUARE_APP_ID || 
    "sandbox-sq0idb-X2D0KHqEMd5fPMkAy598Sw";
  
  const accessToken = 
    process.env.VITE_SQUARE_ACCESS_TOKEN || 
    process.env.SQUARE_ACCESS_TOKEN || 
    "EAAAl1X8kNkTslEuAkl5dzXaevex39jm-Eo4g1ZCkF9Y2mVN8F0kRA8RPY7i9kHw";
  
  const locationId = 
    process.env.VITE_SQUARE_LOCATION_ID || 
    process.env.SQUARE_LOCATION_ID || 
    "L32Z1PY3P905Q";
  
  const environment = 
    process.env.VITE_SQUARE_ENVIRONMENT || 
    process.env.SQUARE_ENVIRONMENT || 
    "sandbox";

  return {
    appId,
    accessToken,
    locationId,
    environment: environment as "sandbox" | "production",
    apiUrl: environment === "production" 
      ? "https://connect.squareup.com" 
      : "https://connect.squareupsandbox.com",
    configured: !!(appId && accessToken && locationId),
  };
}

// Public config (safe to send to client)
export function squarePublicConfig() {
  const config = getSquareConfig();
  return {
    appId: config.appId,
    locationId: config.locationId,
    environment: config.environment,
    configured: config.configured,
  };
}

// Square payment creation
export async function createSquarePayment(params: {
  sourceId: string;
  verificationToken?: string;
  amountCents: number;
  currency: string;
  idempotencyKey: string;
  referenceId: string;
  note?: string;
  buyerEmail?: string;
}) {
  const config = getSquareConfig();
  
  if (!config.configured) {
    throw new Error("Square is not configured. Please check your environment variables.");
  }

  const { sourceId, verificationToken, amountCents, currency, idempotencyKey, referenceId, note, buyerEmail } = params;

  const body: any = {
    source_id: sourceId,
    idempotency_key: idempotencyKey,
    amount_money: {
      amount: amountCents,
      currency: currency,
    },
    location_id: config.locationId,
    reference_id: referenceId,
    note: note || undefined,
    buyer_email_address: buyerEmail || undefined,
  };

  // Add verification token if provided (for 3DS)
  if (verificationToken) {
    body.verification_token = verificationToken;
  }

  const response = await fetch(`${config.apiUrl}/v2/payments`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
      "Square-Version": "2023-09-25",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("Square API error:", errorData);
    throw new Error(
      errorData?.errors?.[0]?.detail || 
      errorData?.errors?.[0]?.message || 
      `Square payment failed with status ${response.status}`
    );
  }

  const data = await response.json();
  return data.payment;
}