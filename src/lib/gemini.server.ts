// Server-only Google Gemini image adapter.
// The user requested Gemini 3.1 Flash Lite Image. Override with GEMINI_MODEL if needed.

const DEFAULT_MODEL = "gemini-3.1-flash-lite-image";

interface GeminiPart {
  text?: string;
  inline_data?: { mime_type: string; data: string };
  inlineData?: { mimeType: string; data: string };
}

interface GeminiResponse {
  candidates?: Array<{ content?: { parts?: GeminiPart[] } }>;
  error?: { message?: string };
}

export async function generateRoomVisualization({
  imageBase64,
  mimeType,
  prompt,
}: {
  imageBase64: string;
  mimeType: string;
  prompt: string;
}): Promise<{ base64: string; mimeType: string }> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) throw new Error("Visualiser is not configured (missing API key)");

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            { inline_data: { mime_type: mimeType, data: imageBase64 } },
          ],
        },
      ],
      generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Gemini request failed [${res.status}]: ${text.slice(0, 500)}`);
  }

  let data: GeminiResponse;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Gemini returned invalid JSON");
  }

  if (data.error?.message) throw new Error(data.error.message);

  const parts = data.candidates?.[0]?.content?.parts ?? [];
  for (const p of parts) {
    const inline = p.inline_data ?? p.inlineData;
    if (inline?.data) {
      return {
        base64: inline.data,
        mimeType: (p.inline_data?.mime_type ?? p.inlineData?.mimeType) || "image/png",
      };
    }
  }
  throw new Error("No image returned from the model");
}
