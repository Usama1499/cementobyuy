import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { Download, Loader2, Sparkles, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/PageHero";
import { generateVisualization, getVisualizerQuota } from "@/lib/visualization.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/visualiser")({
  head: () => ({
    meta: [
      { title: "AI Wall Visualiser | Cemento Perth" },
      {
        name: "description",
        content:
          "Upload a photo of your room, pick a colour and texture, and see your walls re-rendered in real micro cement finishes.",
      },
      { property: "og:title", content: "AI Wall Visualiser | Cemento Perth" },
      { property: "og:description", content: "Upload a room photo and see your walls in real micro cement finishes." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VisualiserPage,
});

interface Color { id: string; name: string; hex: string; prompt_fragment: string }
interface Texture { id: string; name: string; description: string; swatch_color: string; prompt_fragment: string }

function VisualiserPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [colorId, setColorId] = useState<string>("");
  const [textureId, setTextureId] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useServerFn(generateVisualization);
  const quotaFn = useServerFn(getVisualizerQuota);

  const catalog = useQuery({
    queryKey: ["visualiser-catalog"],
    queryFn: async () => {
      const [c, t] = await Promise.all([
        supabase.from("colors").select("id,name,hex,prompt_fragment").order("sort_order"),
        supabase.from("textures").select("id,name,description,swatch_color,prompt_fragment").order("sort_order"),
      ]);
      if (c.error) throw c.error;
      if (t.error) throw t.error;
      return { colors: (c.data ?? []) as Color[], textures: (t.data ?? []) as Texture[] };
    },
  });

  const quota = useQuery({
    queryKey: ["visualiser-quota"],
    queryFn: () => quotaFn(),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!photo || !colorId || !textureId) throw new Error("Choose a photo, colour and texture.");
      const color = catalog.data?.colors.find((c) => c.id === colorId);
      const texture = catalog.data?.textures.find((t) => t.id === textureId);
      if (!color || !texture) throw new Error("Please make a selection.");
      return generate({
        data: {
          imageDataUrl: photo,
          colorId: color.id,
          colorPrompt: color.prompt_fragment,
          textureId: texture.id,
          texturePrompt: texture.prompt_fragment,
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

  const canRender = !!photo && !!colorId && !!textureId && !mutation.isPending;

  return (
    <>
      <PageHero
        eyebrow="AI wall visualiser"
        title="See your walls before you commit"
        intro="Upload a room photo, choose a colour and texture, and our AI re-renders the walls in real micro cement — same angle, same light, same room."
      />

      <section className="container-page py-12 md:py-16">
        {quota.data && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-border bg-secondary/50 px-4 py-3 text-sm">
            <span className="text-muted-foreground">
              Monthly renders used: <span className="font-semibold text-foreground">{quota.data.used}</span> of {quota.data.limit}
            </span>
            <span className="text-xs text-muted-foreground">Resets on the 1st of each month (UTC).</span>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* LEFT: Controls */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="surface-card rounded-sm p-6">
              <p className="eyebrow text-[0.6rem]">Step 1</p>
              <Label htmlFor="room-photo" className="mt-2 block font-display text-base">Upload your room photo</Label>
              <Input id="room-photo" ref={fileRef} type="file" accept="image/*" className="mt-3" onChange={(e) => onFile(e.target.files?.[0])} />
              {photo && (
                <img src={photo} alt="Your uploaded room" className="mt-4 w-full rounded-sm object-cover" />
              )}
            </div>

            {/* Step 2 */}
            <div className="surface-card rounded-sm p-6">
              <p className="eyebrow text-[0.6rem]">Step 2</p>
              <p className="mt-2 font-display text-base">Choose a colour</p>
              {catalog.isLoading ? (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="aspect-square animate-pulse rounded-sm bg-secondary" />
                  ))}
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {catalog.data?.colors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={colorId === c.id}
                      onClick={() => setColorId(c.id)}
                      className={cn(
                        "group flex flex-col items-center gap-1.5 rounded-sm p-1 text-[0.65rem] leading-tight transition-all",
                        colorId === c.id ? "ring-2 ring-clay ring-offset-2 ring-offset-background" : "opacity-80 hover:opacity-100",
                      )}
                    >
                      <span className="block aspect-square w-full rounded-sm border border-border" style={{ backgroundColor: c.hex }} />
                      <span className="text-center text-muted-foreground group-aria-pressed:text-foreground">{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Step 3 */}
            <div className="surface-card rounded-sm p-6">
              <p className="eyebrow text-[0.6rem]">Step 3</p>
              <p className="mt-2 font-display text-base">Pick a texture</p>
              {catalog.isLoading ? (
                <div className="mt-4 space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-16 animate-pulse rounded-sm bg-secondary" />
                  ))}
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {catalog.data?.textures.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={textureId === t.id}
                      onClick={() => setTextureId(t.id)}
                      className={cn(
                        "flex items-start gap-3 rounded-sm border p-3 text-left transition-all",
                        textureId === t.id ? "border-clay bg-clay/5" : "border-border hover:border-foreground/30",
                      )}
                    >
                      <span className="mt-0.5 block h-10 w-10 shrink-0 rounded-sm border border-border" style={{ backgroundColor: t.swatch_color }} />
                      <span>
                        <span className="block text-sm font-medium">{t.name}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{t.description}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <Label htmlFor="notes" className="mt-6 block">Optional notes</Label>
              <Input id="notes" value={notes} maxLength={200} onChange={(e) => setNotes(e.target.value)} placeholder="Keep the timber floor, matte sheen…" className="mt-1.5" />
            </div>

            <Button variant="clay" size="lg" className="w-full" disabled={!canRender} onClick={() => mutation.mutate()}>
              {mutation.isPending ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {mutation.isPending ? "Rendering…" : "Render my room"}
            </Button>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          {/* RIGHT: Result */}
          <div>
            {result ? (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <figure className="surface-card overflow-hidden rounded-sm">
                    <figcaption className="border-b border-border bg-secondary/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">Original</figcaption>
                    <img src={photo!} alt="Original room" className="w-full object-contain" />
                  </figure>
                  <figure className="surface-card overflow-hidden rounded-sm">
                    <figcaption className="border-b border-border bg-secondary/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">Rendered</figcaption>
                    <img src={result} alt="Rendered room" className="w-full object-contain" />
                  </figure>
                </div>
                <div className="flex justify-end">
                  <Button asChild variant="outline">
                    <a href={result} download={`cemento-visualisation-${Date.now()}.png`}>
                      <Download /> Download render
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="surface-card flex min-h-[420px] items-center justify-center rounded-sm bg-secondary/40 p-8">
                {mutation.isPending ? (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-clay" />
                    <p className="text-sm text-muted-foreground">Rendering your room… this usually takes 10–25 seconds.</p>
                  </div>
                ) : (
                  <div className="max-w-sm text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Your side-by-side render will appear here. Daylight photos, taken straight-on to the wall, give the most accurate result.
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
