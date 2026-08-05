import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, Loader2 } from "lucide-react";
import type { ZodError } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { BookingSchema, saveBooking } from "@/lib/booking";
import { TRAINING_PRODUCT_ID, formatPrice, products } from "@/lib/products";

const COURSE_DATE = "2026-08-22";
const PRICE = 770;

export function BookingDialog({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { setQty } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    preferredDate: COURSE_DATE,
    participants: "1",
    notes: "",
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const participants = Math.min(20, Math.max(1, Number(form.participants) || 1));



// In your BookingDialog
const { add } = useCart(); // Change from setQty to add

function submit(e: React.FormEvent) {
  e.preventDefault();
  const parsed = BookingSchema.safeParse({
    ...form,
    company: form.company || undefined,
    notes: form.notes || undefined,
    participants,
  });
  
  if (!parsed.success) {
    const flat: Record<string, string> = {};
    for (const issue of (parsed.error as ZodError).issues) {
      const key = String(issue.path[0]);
      if (!flat[key]) flat[key] = issue.message;
    }
    setErrors(flat);
    return;
  }
  
  setErrors({});
  saveBooking(parsed.data);
  
  console.log('=== Adding to cart ===');
  console.log('Product ID:', TRAINING_PRODUCT_ID);
  console.log('Quantity:', participants);
  
  // Use add instead of setQty
  add(TRAINING_PRODUCT_ID, participants);
  
  // Check localStorage directly
  const stored = localStorage.getItem('cemento-cart-v1');
  console.log('📦 localStorage after add:', stored);
  
  setOpen(false);
  navigate({ to: user ? "/checkout" : "/auth" });
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="clay" size="lg" className={className}>
            <CalendarDays /> Book now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Book your training place</DialogTitle>
          <DialogDescription>
            {formatPrice(PRICE)} per person, all materials included. Complete the form and you'll
            go straight to secure checkout.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="b-name">Full name</Label>
            <Input
              id="b-name"
              value={form.fullName}
              maxLength={100}
              onChange={(e) => set("fullName")(e.target.value)}
              className="mt-1.5"
              placeholder="Jane Smith"
            />
            {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="b-email">Email address</Label>
              <Input
                id="b-email"
                type="email"
                value={form.email}
                maxLength={255}
                onChange={(e) => set("email")(e.target.value)}
                className="mt-1.5"
                placeholder="jane@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="b-phone">Phone number</Label>
              <Input
                id="b-phone"
                type="tel"
                value={form.phone}
                maxLength={40}
                onChange={(e) => set("phone")(e.target.value)}
                className="mt-1.5"
                placeholder="0410 040 994"
              />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="b-company">
              Company <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="b-company"
              value={form.company}
              maxLength={120}
              onChange={(e) => set("company")(e.target.value)}
              className="mt-1.5"
              placeholder="Smith Renovations"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="b-date">Preferred training date</Label>
              <Input
                id="b-date"
                type="date"
                value={form.preferredDate}
                onChange={(e) => set("preferredDate")(e.target.value)}
                className="mt-1.5"
              />
              {errors.preferredDate && (
                <p className="mt-1 text-xs text-destructive">{errors.preferredDate}</p>
              )}
            </div>
            <div>
              <Label htmlFor="b-participants">Number of participants</Label>
              <Input
                id="b-participants"
                type="number"
                min={1}
                max={20}
                value={form.participants}
                onChange={(e) => set("participants")(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="b-notes">
              Notes <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="b-notes"
              rows={3}
              value={form.notes}
              maxLength={500}
              onChange={(e) => set("notes")(e.target.value)}
              className="mt-1.5"
              placeholder="Anything we should know — experience level, dietary needs…"
            />
          </div>

          <div className="flex items-center justify-between rounded-sm bg-secondary/60 px-4 py-3 text-sm">
            <span className="text-muted-foreground">{participants} × place</span>
            <span className="font-display text-lg font-semibold">
              {formatPrice(PRICE * participants)}
            </span>
          </div>

          <Button type="submit" variant="clay" size="lg" className="w-full">
            Continue to secure checkout
          </Button>
          {!user && (
            <p className="text-center text-xs text-muted-foreground">
              You'll be asked to sign in first so your booking is saved to your account.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
