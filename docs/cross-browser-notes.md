# Cross-browser support notes

Last reviewed: April 2026 (against Baseline 2024 widely available).

## CSS features in use

| Feature | Where | Min support | Notes |
|---|---|---|---|
| `color-mix(in srgb, ...)` | `Hero` (terminal title bar tint), `VideoCard` (radial-gradient stop) | Chrome 111 / Safari 16.4 / Firefox 113 | Universally available since early 2023. Older browsers will see the unmixed background fallback (the variable resolves, just doesn't blend). |
| `text-wrap: balance` | All `<h1>`s, hero, ConnectSection | Chrome 114 / Safari 17.5 / Firefox 121 | Progressive enhancement — older browsers ignore the property and headlines wrap normally. |
| `backdrop-filter` | Header (sticky blur), CommandMenu overlay | Chrome 76 / Safari 9 (with prefix) / Firefox 103 | Tailwind emits the `-webkit-` prefix where needed. |
| `aspect-ratio` | Video / Short cards | All current browsers | Universal. |
| `clamp()` | All responsive headlines | Universal | — |
| CSS custom properties | All design tokens | Universal | — |
| `:focus-visible` | Global outline | Chrome 86 / Safari 15.4 / Firefox 85 | Older browsers get the same outline on all focus (slightly noisier but accessible). |
| `prefers-reduced-motion` | `globals.css` | Universal | — |

## Tested

Manual smoke matrix to run before launch (and after major UI changes):

- [ ] Chrome (latest) on macOS — desktop, light + dark, command menu, mobile nav (DevTools toolbar)
- [ ] Safari (latest) on macOS — same
- [ ] Firefox (latest) on macOS — same
- [ ] Mobile Safari on iOS 17+ — homepage, /writing, /writing/[slug], command menu open/close, hero terminal `color-mix`
- [ ] Mobile Chrome on Android — same

## Known caveats

1. **Hero terminal title bar tint** uses `color-mix()` inline. If you ever support a browser older than Safari 16.4 / Chrome 111, swap to a static color or the design loses the warm-tinted titlebar (no breakage).
2. **`text-wrap: balance`** is a progressive enhancement. Headlines wrap fine without it; they just look slightly less even on the older browsers.
3. **`<video>` autoplay-muted on Short cards** with `kind: 'video' + media`. iOS requires `muted` + `playsInline` (both set). Android Chrome requires user-gesture for any audio — we don't autoplay audio.
4. **`<audio controls>`** on `kind: 'audio'` Short cards renders the platform's native player UI — varies between browsers. Acceptable for a personal site.

## Routine to follow

After bumping Tailwind major or Next major:

1. Re-render the homepage in each browser above.
2. Open the command menu (⌘K / Ctrl+K), navigate with arrow keys, escape.
3. Toggle dark / light.
4. Switch hero variant via `?hero=editorial`.
5. Resize from desktop → tablet → mobile. Watch for overlapping or unintended wrapping.
6. Run Lighthouse mobile.
