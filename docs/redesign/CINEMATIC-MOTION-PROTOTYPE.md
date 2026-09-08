# Cinematic motion prototype

2026-09-05, America/Toronto. Local prototype authorised by the owner after reviewing three visual studies. Route: `/prototype/cinematic`. Earlier homepage and its uncommitted source are preserved. No deployment or canonical promotion of the prototype visuals.

## What to try

Allow the short opening, then scroll. The door opens to reveal the existing portrait. The camera moves forward; the portrait fades before the close approach, and the doorway leaves the viewport. Writing comes into view and holds for reading. Further scrolling pulls back to five real scene-graph rooms on one shared slab. Reverse scroll retraces the camera path.

Motion controls: opening duration (0.7–3 seconds, use Replay to compare), camera travel (0.6–1.2×), story-position scrubber, named reading poses, Replay, and still/reduced-motion preview. Native scroll owns progress; no wheel interception. Header Contact and homepage calls use the existing door store and existing DoorRoom, rather than the separate contact sketch from the visual studies.

## Implementation and limits

- Three.js is dynamically imported only for the animated experience. The added dependency and types are recorded in the npm lockfile. No Next.js, React, or Tailwind upgrade.
- Door frame, hinged leaf, threshold, room frames, furniture and shared floor are actual 3D geometry. Lighting/materials and furniture are simplified motion-blocking assets, not final art direction.
- Writing uses the generated environment as a textured scene plane. The final material/camera treatment needs further development; this is not a fully modelled photographic room.
- The real portrait texture uses the existing approved source without facial generation. Writing excerpt is from `src/content/writing/audience-of-one.mdx`; the link resolves to that real article.
- The three still images come from Media-Work `brand/reviews/codex-2026-09-05-cinematic-studies/assets/`. They provide the initial and reduced-motion fallback. Provenance and exact generation prompts remain there.
- Text, navigation, reading links and contact remain HTML. Hidden story panels are inert; inactive text is removed from the accessibility tree. The complete static story is present before enhancement and if rendering fails. Reduced-motion preference changes are observed dynamically.
- Mobile uses less forward travel and a shorter story rail; the pullback is wider to fit the connected rooms. It is a distinct camera framing, not identical desktop movement scaled down.
- Renderer resolution is capped; GPU redraw stops at rest and while hidden. The lightweight progress observation loop remains active. Geometry, materials, textures and event listeners are disposed on unmount.
- The local prototype route is marked noindex. It is not linked from the main site navigation.

## Validation

Type-check and lint passed. Production build passed after separating it from the running development server: an initial concurrent build collided with Turbopack's output directory. Development output was moved to `/tmp/jatto-next-before-motion-build-20260905`; rebuilding without the dev process completed all 63 pages. The preview is served locally with `npm run start -- --port 3005`; restart in dev mode for subsequent source iteration.

Timeline checks covered settled arrival/Writing/foundation poses, bounded values, continuity at transitions, out-of-range clamping, and deterministic reverse traversal across 1,001 samples. Browser checks observed the closed/open door replay, movement through the threshold, and settled Writing and foundation states. A narrow-window doorway crop and missing notebook crop were corrected. No measured performance benchmark or comprehensive production accessibility certification is claimed.

Responsive browser emulation exposed screenshot corruption in the in-app capture path; discard corrupted captures rather than treating them as evidence. Device layout and normal-window review must be distinguished when reporting checks. The final owner review should focus on whether the threshold crossing feels natural and whether the pullback explains the connection.

## Next

Owner feedback on the motion and pacing, followed by lighting/material refinement and a more coherent modelled Writing room if the architecture earns its place. Keep particles as an alternative direction, not an additional effect layered into this prototype by default.

Final browser follow-through: existing Contact opened with its original copy, social destinations and wave/room implementation; focus moved to email after reveal. Escape restored focus to the header door. Both the manual still preview and an emulated `prefers-reduced-motion: reduce` produced the complete static story and disabled the scrubber; emulation was cleared afterwards. The final status-copy fix was included in a successful production build. A shell wrapper reported a read-only-variable error after that build had completed; the build log ends with the complete route table and no Next.js build error. Final preview uses the built output on port 3005.
