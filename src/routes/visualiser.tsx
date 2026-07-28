import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Loader2, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/PageHero";
import { streamVisualisation } from "@/lib/stream-visualisation";

export const Route = createFileRoute("/visualiser")({
  head: () => ({
    meta: [
      { title: "AI Micro Cement Visualiser | See Your Wall Before You Commit" },
      {
        name: "description",
        content:
          "Upload a photo of your room and see it re-rendered in real micro cement finishes — Fino, Medio, charcoal, cream or marron — with Cemento's AI visualiser.",
      },
      { property: "og:title", content: "AI Micro Cement Visualiser | Cemento Perth" },
      {
        property: "og:description",
        content: "Upload a room photo and preview real micro cement finishes on your own walls.",
      },
    ],
  }),
  component: Visualiser,
});

const FINISHES = [
  { id: "fino", label: "Fino — pale warm grey" },
  { id: "medio", label: "Medio — sandy beige" },
  { id: "charcoal", label: "Charcoal" },
  { id: "cream", label: "Cream limestone" },
  { id: "marron", label: "Marron — warm earth" },
] as const;

const SURFACES = [
  { id: "walls", label: "Walls" },
  { id: "walls-floor", label: "Walls + floor" },
  { id: "floor", label: "Floor" },
  { id: "feature", label: "Feature wall" },
] as const;

function Visualiser() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [finish, setFinish] = useState<string>("fino");
  const [surface, setSurface] = useState<string>("walls");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 6_000_000) {
      setError("That photo is over 6MB — please use a smaller image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(typeof reader.result === "string" ? reader.result : null);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  }

  async function render() {
    if (!photo) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setIsFinal(false);
    try {
      await streamVisualisation({ image: photo, finish, surface, notes }, (dataUrl, final) => {
        setResult(dataUrl);
        if (final) setIsFinal(true);
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="AI visualiser"
        title="See how your wall will look"
        intro="Upload a photo of the room, pick a finish, and we'll re-render your actual space with micro cement applied — same angle, same furniture, same light."
      />

      <section className="container-page grid gap-10 py-14 lg:grid-cols-[380px_1fr] lg:items-start md:py-20">
        <div className="surface-card rounded-sm p-6">
          <Label htmlFor="room-photo">1. Your room photo</Label>
          <Input
            id="room-photo"
            ref={fileRef}
            type="file"
            accept="image/*"
            className="mt-1.5"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          {photo && (
            <img
              src={photo}
              alt="Your uploaded room"
              className="mt-4 w-full rounded-sm object-cover"
            />
          )}

          <p className="mt-7 text-sm font-medium">2. Finish</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {FINISHES.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={finish === f.id}
                onClick={() => setFinish(f.id)}
                className={
                  finish === f.id
                    ? "rounded-full border border-clay bg-clay px-3 py-1.5 text-xs font-medium text-clay-foreground"
                    : "rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-clay hover:text-foreground"
                }
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="mt-7 text-sm font-medium">3. Surfaces</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SURFACES.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={surface === s.id}
                onClick={() => setSurface(s.id)}
                className={
                  surface === s.id
                    ? "rounded-full border border-clay bg-clay px-3 py-1.5 text-xs font-medium text-clay-foreground"
                    : "rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-clay hover:text-foreground"
                }
              >
                {s.label}
              </button>
            ))}
          </div>

          <Label htmlFor="vis-notes" className="mt-7 block">
            4. Anything else? (optional)
          </Label>
          <Input
            id="vis-notes"
            value={notes}
            maxLength={200}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Keep the timber floor, matte sheen…"
            className="mt-1.5"
          />

          <Button
            variant="clay"
            size="lg"
            className="mt-7 w-full"
            disabled={!photo || loading}
            onClick={render}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {loading ? "Rendering…" : "Render my room"}
          </Button>
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        </div>

        <div className="surface-card flex min-h-[420px] items-center justify-center overflow-hidden rounded-sm bg-secondary/50 p-4">
          {result ? (
            <img
              src={result}
              alt="Your room rendered with a micro cement finish"
              className={
                isFinal
                  ? "w-full rounded-sm object-contain blur-0 transition-[filter] duration-500"
                  : "w-full rounded-sm object-contain blur-2xl transition-[filter] duration-500"
              }
            />
          ) : (
            <div className="max-w-sm px-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                Your render will appear here. Photos taken in daylight, straight-on to the wall,
                give the most accurate result.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Renders are a guide only — see real{" "}
                <Link to="/textures" className="text-clay underline-offset-4 hover:underline">
                  texture samples
                </Link>{" "}
                before choosing a colour.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
