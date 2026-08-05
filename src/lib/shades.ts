/**
 * Every MCT colour ships as a ladder of 10 shades (10% .. 100% strength),
 * exactly like the printed CEMENTO colour card. Rather than storing 160 rows,
 * we derive the ladder from the base hex so the UI stays a compact
 * "colour → shade" picker.
 */

export const SHADE_LEVELS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const;
export type ShadeLevel = (typeof SHADE_LEVELS)[number];

function clamp(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [
    parseInt(full.slice(0, 2), 16) || 0,
    parseInt(full.slice(2, 4), 16) || 0,
    parseInt(full.slice(4, 6), 16) || 0,
  ];
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

/** Mixes the base colour with white; level 100 returns the base colour. */
export function shadeHex(baseHex: string, level: number): string {
  const ratio = Math.max(0.05, Math.min(1, level / 100));
  const [r, g, b] = hexToRgb(baseHex);
  return rgbToHex(255 + (r - 255) * ratio, 255 + (g - 255) * ratio, 255 + (b - 255) * ratio);
}

export function shadeLadder(baseHex: string) {
  return SHADE_LEVELS.map((level) => ({ level, hex: shadeHex(baseHex, level) }));
}

/** e.g. "Terra MCT-220 · Shade 40" */
export function shadeLabel(colourName: string, level: number) {
  return `${colourName} · Shade ${level}`;
}

/** Plain-English strength used in the AI prompt. */
export function shadeDescription(level: number) {
  if (level <= 20) return "a very pale, washed-out tint of";
  if (level <= 40) return "a light, soft tint of";
  if (level <= 60) return "a medium-strength tone of";
  if (level <= 80) return "a rich, deep tone of";
  return "the full-strength, most saturated version of";
}
