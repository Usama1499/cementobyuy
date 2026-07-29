import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const MONTHLY_LIMIT = 10;

const InputSchema = z.object({
  imageDataUrl: z.string().min(64).max(9_000_000),
  colorId: z.string().min(1).max(64),
  colorPrompt: z.string().min(3).max(400),
  textureId: z.string().min(1).max(64),
  texturePrompt: z.string().min(3).max(400),
  notes: z.string().max(300).optional(),
});

function parseDataUrl(url: string): { mimeType: string; base64: string } {
  const m = /^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/.exec(url);
  if (!m) throw new Error("Invalid image data URL");
  return { mimeType: m[1], base64: m[2] };
}

export const generateVisualization = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // Enforce monthly quota via RLS-scoped count.
    const monthStart = new Date();
    monthStart.setUTCDate(1);
    monthStart.setUTCHours(0, 0, 0, 0);
    const { count, error: countErr } = await supabase
      .from("visualization_history")
      .select("id", { count: "exact", head: true })
      .gte("created_at", monthStart.toISOString());
    if (countErr) throw new Error(countErr.message);
    if ((count ?? 0) >= MONTHLY_LIMIT) {
      throw new Error(
        `Monthly limit reached (${MONTHLY_LIMIT} renders). Please try again next month.`,
      );
    }

    const { mimeType, base64 } = parseDataUrl(data.imageDataUrl);

    const prompt = [
      "Photorealistically re-render this exact room photo so the walls are painted and finished in",
      `${data.colorPrompt} using ${data.texturePrompt}.`,
      "Keep the original camera angle, perspective, room geometry, window positions, furniture, fixtures and lighting exactly as they are.",
      "Only change the wall surface material; preserve realistic reflections and shadows.",
      data.notes ? `Additional client note: ${data.notes.replace(/[\r\n]+/g, " ")}.` : "",
      "The result must look like a genuine photograph of the same room after application.",
    ]
      .filter(Boolean)
      .join(" ");

    const { generateRoomVisualization } = await import("./gemini.server");
    const result = await generateRoomVisualization({ imageBase64: base64, mimeType, prompt });

    await supabase.from("visualization_history").insert({
      user_id: userId,
      color_id: data.colorId,
      texture_id: data.textureId,
      notes: data.notes ?? null,
    });

    return {
      dataUrl: `data:${result.mimeType};base64,${result.base64}`,
      remaining: MONTHLY_LIMIT - (count ?? 0) - 1,
      limit: MONTHLY_LIMIT,
    };
  });

export const getVisualizerQuota = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const monthStart = new Date();
    monthStart.setUTCDate(1);
    monthStart.setUTCHours(0, 0, 0, 0);
    const { count } = await context.supabase
      .from("visualization_history")
      .select("id", { count: "exact", head: true })
      .gte("created_at", monthStart.toISOString());
    const used = count ?? 0;
    return { used, limit: MONTHLY_LIMIT, remaining: Math.max(0, MONTHLY_LIMIT - used) };
  });
