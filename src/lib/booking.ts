import { z } from "zod";

/** Details captured by the training booking form, carried through to checkout. */
export const BookingSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(6, "Please enter a contact number").max(40),
  company: z.string().trim().max(120).optional(),
  preferredDate: z.string().trim().min(4, "Please choose a preferred date").max(40),
  participants: z.number().int().min(1).max(20),
  notes: z.string().trim().max(500).optional(),
});

export type BookingDetails = z.infer<typeof BookingSchema>;

const STORAGE_KEY = "cemento-training-booking-v1";

export function saveBooking(details: BookingDetails) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
  } catch {
    /* storage unavailable */
  }
}

export function readBooking(): BookingDetails | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = BookingSchema.safeParse(JSON.parse(raw) as unknown);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function clearBooking() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
}

/** Human-readable summary attached to the Stripe order notes. */
export function bookingSummary(b: BookingDetails): string {
  return [
    "DIY Training booking",
    `Name: ${b.fullName}`,
    `Email: ${b.email}`,
    `Phone: ${b.phone}`,
    b.company ? `Company: ${b.company}` : "",
    `Preferred date: ${b.preferredDate}`,
    `Participants: ${b.participants}`,
    b.notes ? `Notes: ${b.notes}` : "",
  ]
    .filter(Boolean)
    .join(" | ");
}
