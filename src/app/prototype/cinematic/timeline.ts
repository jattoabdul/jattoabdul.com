export const clamp = (v: number) => Math.min(1, Math.max(0, v));
export const segment = (p: number, start: number, end: number) =>
  clamp((p - start) / (end - start));
export const smooth = (t: number) => t * t * (3 - 2 * t);

/** Scroll position owns the whole story. No accumulating time-based camera movement. */
export function timeline(progress: number) {
  const p = clamp(progress);
  return {
    crossing: smooth(segment(p, 0.1, 0.38)),
    pullback: smooth(segment(p, 0.64, 0.88)),
    arrival: 1 - smooth(segment(p, 0.1, 0.22)),
    writing: smooth(segment(p, 0.35, 0.43)) * (1 - smooth(segment(p, 0.64, 0.72))),
    foundation: smooth(segment(p, 0.82, 0.9)),
    portrait: 1 - smooth(segment(p, 0.14, 0.28)),
  };
}
