import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { Download, Loader2, Sparkles, Upload, Check } from "lucide-react";
import { motion } from "motion/react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/PageHero";
import { generateVisualization, getVisualizerQuota } from "@/lib/visualization.functions";
import { finishes as localFinishes } from "@/lib/finishes";
import { shadeLadder, shadeHex } from "@/lib/shades";
import { cn } from "@/lib/utils";

/** Bundled swatch images so the visualiser never depends on a remote CDN. */
const FINISH_IMAGES: Record<string, string> = Object.fromEntries(
  localFinishes.map((f) => [f.id, f.image]),
);


export const Route = createFileRoute("/_authenticated/visualiser")({
  head: () => ({
    meta: [
      { title: "AI Wall Visualiser | Cemento Perth" },
      {
        name: "description",
        content:
          "Upload a photo of your room, pick one of our 12 premium micro cement finishes, and see your walls re-rendered instantly.",
      },
      { property: "og:title", content: "AI Wall Visualiser | Cemento Perth" },
      {
        property: "og:description",
        content: "Upload a room photo and see your walls in real micro cement finishes.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VisualiserPage,
});

interface Finish {
  id: string;
  name: string;
  description: string;
  swatch_color: string;
  image_url: string;
}

interface Colour {
  id: string;
  name: string;
  hex: string;
}

function VisualiserPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [finishId, setFinishId] = useState<string>("");
  const [colorId, setColorId] = useState<string>("");
  const [shadeLevel, setShadeLevel] = useState<number>(100);

  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useServerFn(generateVisualization);
  const quotaFn = useServerFn(getVisualizerQuota);

  const catalog = useQuery({
    queryKey: ["visualiser-finishes"],
    queryFn: async () => {
      const { data, error: err } = await supabase
        .from("textures")
        .select("id,name,description,swatch_color,image_url")
        .order("sort_order");
      if (err) throw err;
      return (data ?? []) as Finish[];
    },
  });

  const colours = useQuery({
    queryKey: ["visualiser-colours"],
    queryFn: async () => {
      const { data, error: err } = await supabase
        .from("colors")
        .select("id,name,hex")
        .order("sort_order");
      if (err) throw err;
      return (data ?? []) as Colour[];
    },
  });

  const quota = useQuery({ queryKey: ["visualiser-quota"], queryFn: () => quotaFn() });

  const selected = catalog.data?.find((f) => f.id === finishId);
  const selectedColour = colours.data?.find((c) => c.id === colorId);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!photo || !finishId) throw new Error("Upload a photo and choose a finish.");
      return generate({
        data: {
          imageDataUrl: photo,
          finishId,
          colorId: colorId || undefined,
          shadeLevel: colorId ? shadeLevel : undefined,

          notes: notes || undefined,
        },
      });
    },
    onSuccess: (r) => {
      setResult(r.dataUrl);
      setError(null);
      quota.refetch();
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Something went wrong."),
  });

  function onFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Please choose an image file.");
    if (file.size > 6_000_000) return setError("That photo is over 6MB — please use a smaller image.");
    const r = new FileReader();
    r.onload = () => {
      setPhoto(typeof r.result === "string" ? r.result : null);
      setResult(null);
      setError(null);
    };
    r.readAsDataURL(file);
  }

  const canRender = !!photo && !!finishId && !mutation.isPending;

  return (
    <>
      <PageHero
        eyebrow="AI wall visualiser"
        title="See your walls before you commit"
        intro="Upload a room photo, choose one of our twelve premium finishes, and our AI re-renders the walls in real micro cement — same angle, same light, same room."
      />

      <section className="container-page py-12 md:py-16">
        {quota.data && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-border bg-secondary/50 px-4 py-3 text-sm">
            <span className="text-muted-foreground">
              Monthly renders used:{" "}
              <span className="font-semibold text-foreground">{quota.data.used}</span> of{" "}
              {quota.data.limit}
            </span>
            <span className="text-xs text-muted-foreground">Resets on the 1st of each month (UTC).</span>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* LEFT: Controls */}
          <div className="space-y-6">
            <div className="surface-card rounded-sm p-6">
              <p className="eyebrow text-[0.6rem]">Step 1</p>
              <Label htmlFor="room-photo" className="mt-2 block font-display text-base">
                Upload your room photo
              </Label>
              <Input
                id="room-photo"
                ref={fileRef}
                type="file"
                accept="image/*"
                className="mt-3"
                onChange={(e) => onFile(e.target.files?.[0])}
              />
              {photo && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={photo}
                  alt="Your uploaded room"
                  className="mt-4 w-full rounded-sm object-cover"
                />
              )}
            </div>

            <div className="surface-card rounded-sm p-6">
              <p className="eyebrow text-[0.6rem]">Step 2</p>
              <p className="mt-2 font-display text-base">Choose your finish</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Twelve premium colours and textures from the CEMENTO range.
              </p>

              {catalog.isLoading ? (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="aspect-square animate-pulse rounded-sm bg-secondary" />
                  ))}
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {catalog.data?.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={finishId === f.id}
                      title={f.description}
                      onClick={() => setFinishId(f.id)}
                      className={cn(
                        "group relative overflow-hidden rounded-sm text-left transition-all duration-300",
                        finishId === f.id
                          ? "ring-2 ring-clay ring-offset-2 ring-offset-background"
                          : "opacity-90 hover:opacity-100",
                      )}
                    >
                      <img
                        src={f.image_url}
                        alt={`${f.name} micro cement finish`}
                        loading="lazy"
                        width={400}
                        height={400}
                        className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundColor: f.swatch_color }}
                      />
                      {finishId === f.id && (
                        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-clay text-clay-foreground">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                      <span className="absolute inset-x-0 bottom-0 bg-ink/70 px-1.5 py-1 text-[0.6rem] font-medium leading-tight text-ink-foreground">
                        {f.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {selected && (
                <motion.p
                  key={selected.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-sm bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground"
                >
                  <span className="font-semibold text-foreground">{selected.name}</span> —{" "}
                  {selected.description}
                </motion.p>
              )}

            </div>

            <div className="surface-card rounded-sm p-6">
              <p className="eyebrow text-[0.6rem]">Step 3</p>
              <p className="mt-2 font-display text-base">Choose your colour</p>
              <p className="mt-1 text-xs text-muted-foreground">
                The full MCT tint range — pick any colour to pair with your texture.
              </p>

              {colours.isLoading ? (
                <div className="mt-4 grid grid-cols-4 gap-2.5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="aspect-square animate-pulse rounded-sm bg-secondary" />
                  ))}
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-4 gap-2.5">
                  {colours.data?.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      title={c.name}
                      aria-label={c.name}
                      aria-pressed={colorId === c.id}
                      onClick={() => setColorId(colorId === c.id ? "" : c.id)}
                      className={cn(
                        "relative aspect-square overflow-hidden rounded-sm border border-border/60 transition-all duration-300",
                        colorId === c.id
                          ? "ring-2 ring-clay ring-offset-2 ring-offset-background"
                          : "hover:scale-105",
                      )}
                      style={{ backgroundColor: c.hex }}
                    >
                      {colorId === c.id && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check className="h-4 w-4 text-ink-foreground drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {selectedColour && (
                <p className="mt-4 rounded-sm bg-secondary/60 p-3 text-xs text-muted-foreground">
                  Colour: <span className="font-semibold text-foreground">{selectedColour.name}</span>
                </p>
              )}

              <Label htmlFor="notes" className="mt-6 block">
                Optional notes
              </Label>
              <Input
                id="notes"
                value={notes}
                maxLength={200}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Keep the timber floor, matte sheen…"
                className="mt-1.5"
              />
            </div>

            <Button
              variant="clay"
              size="lg"
              className="w-full"
              disabled={!canRender}
              onClick={() => mutation.mutate()}
            >
              {mutation.isPending ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {mutation.isPending ? "Rendering…" : "Render my room"}
            </Button>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          {/* RIGHT: Result */}
          <div>
            {result && photo ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <figure className="surface-card overflow-hidden rounded-sm">
                    <figcaption className="border-b border-border bg-secondary/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">
                      Original
                    </figcaption>
                    <img src={photo} alt="Original room" className="w-full object-cover" />
                  </figure>
                  <figure className="surface-card overflow-hidden rounded-sm">
                    <figcaption className="border-b border-border bg-clay/10 px-4 py-2 text-xs uppercase tracking-widest text-clay">
                      {[selected?.name, selectedColour?.name].filter(Boolean).join(" · ") || "Rendered"}
                    </figcaption>
                    <img src={result} alt="Rendered room" className="w-full object-cover" />
                  </figure>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="clay">
                    <a href={result} download={`cemento-${finishId || "render"}.png`}>
                      <Download /> Download render
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setResult(null)}>
                    Try another finish
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="surface-card flex min-h-[420px] items-center justify-center rounded-sm bg-secondary/40 p-8">
                {mutation.isPending ? (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-clay" />
                    <p className="text-sm text-muted-foreground">
                      Rendering your room… this usually takes 10–25 seconds.
                    </p>
                  </div>
                ) : (
                  <div className="max-w-sm text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Your side-by-side render will appear here. Daylight photos, taken straight-on
                      to the wall, give the most accurate result.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
