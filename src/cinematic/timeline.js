export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ramp = (p, start, end, from = 0, to = 1) =>
  from + clamp((p - start) / (end - start)) * (to - from);
// Chapter coordinates are independent of pixel height. These ranges follow the
// captured source choreography: brain / scattered / bulb / globe / scattered / D.
export function pose(p, mobile = false) {
  const x = mobile
    ? ramp(p, 0, 1, 1.5, 0)
    : ramp(p, 0, 1, 3, -4.5) +
      ramp(p, 1.25, 1.5, 0.905, 5) -
      ramp(p, 2.8, 3, 0.905, 3) +
      ramp(p, 3.3, 3.5, 0.905, 6) -
      clamp(ramp(p, 4.5, 5, 0.905, 5), 0.905, 4);
  return {
    x,
    y: mobile
      ? 2
      : ramp(p, 2.7, 3, 0, 0.5) -
        ramp(p, 3.3, 3.5, 0, 0.5) +
        ramp(p, 5.7, 6, 0, 1.75),
    rotationY:
      -Math.PI / 4 -
      ramp(p, 0, 1, 0, -Math.PI / 2) -
      ramp(p, 2.7, 3, 0, Math.PI / 2) -
      ramp(p, 3.3, 3.5, 0, Math.PI / 4) +
      ramp(p, 4.5, 5, 0, Math.PI * 1.25) -
      ramp(p, 5.7, mobile ? 5.8 : 6, 0, Math.PI),
    rotationZ: -ramp(p, 2.7, 3, 0, -0.489) - ramp(p, 3.3, 3.5, 0, 0.6),
    explode:
      ramp(p, mobile ? 1.4 : 1.1, mobile ? 1.7 : 2.2) -
      ramp(p, mobile ? 2.7 : 2.8, 3) +
      ramp(p, 4.5, 5) -
      ramp(p, 5.7, mobile ? 5.8 : 6),
    morph: ramp(p, 2.7, 3) + ramp(p, 3.3, 3.5) + ramp(p, 5.7, mobile ? 5.8 : 6),
    factor: mobile
      ? 2.5
      : 4.35 +
        ramp(p, 0, 1) -
        ramp(p, 1.25, 1.5) +
        ramp(p, 3.3, 3.5, 0, 0.3) -
        ramp(p, 5.7, 6),
  };
}
export function chapterAt(y, sections) {
  let i = 0;
  while (i < sections.length - 1 && y >= sections[i + 1].top) i++;
  return i + clamp((y - sections[i].top) / sections[i].height);
}
