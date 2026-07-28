import { createFileRoute } from "@tanstack/react-router";

const FINISH_PROMPTS: Record<string, string> = {
  fino:
    "an ultra-smooth fine-grain micro cement (Microestil Fino) finish in a pale warm grey, subtle cloudy trowel movement, matte sealed sheen",
  medio:
    "a medium-grain micro cement (Microestil Medio) finish in a sandy beige tone, visible trowel texture and gentle mottling, matte sealed sheen",
  charcoal:
    "a deep charcoal micro cement finish with cloudy tonal variation and a soft satin sealed sheen",
  cream:
    "a soft cream limestone-toned micro cement finish with delicate trowel movement and a matte sealed sheen",
  marron:
    "a warm earthy brown terracotta-leaning micro cement finish with organic mottling and a matte sealed sheen",
};

const SURFACES: Record<string, string> = {
  walls: "the walls only",
  "walls-floor": "the walls and the floor",
  floor: "the floor only",
  feature: "the main feature wall only",
};

export const Route = createFileRoute("/api/visualise")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Visualiser is not configured", { status: 500 });

        let body: { image?: unknown; finish?: unknown; surface?: unknown; notes?: unknown };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return new Response("Invalid request body", { status: 400 });
        }

        const image = typeof body.image === "string" ? body.image : "";
        if (!image.startsWith("data:image/") || image.length > 8_000_000) {
          return new Response("A valid room photo is required (max ~6MB)", { status: 400 });
        }

        const finishKey = typeof body.finish === "string" ? body.finish : "fino";
        const finish = FINISH_PROMPTS[finishKey] ?? FINISH_PROMPTS.fino;
        const surfaceKey = typeof body.surface === "string" ? body.surface : "walls";
        const surface = SURFACES[surfaceKey] ?? SURFACES.walls;
        const notes =
          typeof body.notes === "string" ? body.notes.replace(/[\r\n]+/g, " ").slice(0, 240) : "";

        const prompt = [
          `Photorealistically re-render this exact room photo so that ${surface} are finished in ${finish}.`,
          "Keep the original camera angle, perspective, room geometry, window positions, furniture, fixtures and lighting exactly as they are.",
          "Only change the surface material: seamless, joint-free micro cement with realistic soft trowel movement, correct reflections and shadows.",
          notes ? `Client note: ${notes}.` : "",
          "The result must look like a real photograph of the same room after the micro cement was applied.",
        ]
          .filter(Boolean)
          .join(" ");

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-3.1-flash-image",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: prompt },
                  { type: "image_url", image_url: { url: image } },
                ],
              },
            ],
            modalities: ["image", "text"],
            stream: true,
          }),
        });

        if (!upstream.ok || !upstream.body) {
          return new Response(await upstream.text().catch(() => "Visualisation failed"), {
            status: upstream.status,
          });
        }

        return new Response(upstream.body, {
          headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
        });
      },
    },
  },
});
