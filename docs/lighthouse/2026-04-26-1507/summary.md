# Lighthouse baseline - jattoabdul.com

Run date: 2026-04-26
Target: https://jattoabdul.com
Lighthouse: 13.1.0

| Route | Mode | Perf | A11y | Best Practices | SEO | LCP | CLS | FCP | TBT | Speed Index |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | desktop | 99 | 96 | 100 | 100 | 0.9 s | 0 | 0.5 s | 0 ms | 0.5 s |
| `/` | mobile | 91 | 96 | 100 | 100 | 3.3 s | 0 | 1.1 s | 10 ms | 3.5 s |
| `/writing` | desktop | 100 | 94 | 96 | 100 | 0.5 s | 0 | 0.3 s | 0 ms | 0.3 s |
| `/writing` | mobile | 97 | 94 | 96 | 100 | 2.4 s | 0 | 0.9 s | 10 ms | 3.4 s |
| `/writing/staff-judgment` | desktop | 100 | 95 | 100 | 100 | 0.5 s | 0 | 0.3 s | 0 ms | 0.3 s |
| `/writing/staff-judgment` | mobile | 98 | 95 | 100 | 100 | 2.4 s | 0 | 0.9 s | 0 ms | 2.0 s |
| `/notes` | desktop | 100 | 95 | 96 | 100 | 0.5 s | 0 | 0.3 s | 0 ms | 0.3 s |
| `/notes` | mobile | 88 | 95 | 96 | 100 | 3.8 s | 0 | 1.0 s | 20 ms | 3.5 s |
| `/about` | desktop | 100 | 96 | 100 | 100 | 0.7 s | 0 | 0.4 s | 0 ms | 0.4 s |
| `/about` | mobile | 97 | 96 | 100 | 100 | 2.4 s | 0 | 0.9 s | 10 ms | 3.5 s |

## Findings

- SEO is 100 across all audited routes.
- CLS is 0 across all audited routes.
- `meta-description` passes across all audited routes.
- `unsized-images` passes across all audited routes.
- Mobile LCP is red on `/notes` at 3.8 s and yellow/red-adjacent on `/` at 3.3 s.
- Accessibility is mostly held down by repeated color contrast failures on `text-fg-3`/small mono metadata and by label/name mismatches on branded home links and the command menu button.
- Best Practices is 96 on `/writing` and `/notes` because Lighthouse logged React hydration error #418 in the browser console.
- `/writing` has a heading-order warning on the post row `h3` elements.
- Home desktop has an image delivery opportunity on YouTube thumbnails, about 16 KiB estimated savings.

## Report Files

- `/` desktop: `home-desktop.report.report.html` / `home-desktop.report.report.json`
- `/` mobile: `home-mobile.report.report.html` / `home-mobile.report.report.json`
- `/writing` desktop: `writing-desktop.report.report.html` / `writing-desktop.report.report.json`
- `/writing` mobile: `writing-mobile.report.report.html` / `writing-mobile.report.report.json`
- `/writing/staff-judgment` desktop: `staff-judgment-desktop.report.report.html` / `staff-judgment-desktop.report.report.json`
- `/writing/staff-judgment` mobile: `staff-judgment-mobile.report.report.html` / `staff-judgment-mobile.report.report.json`
- `/notes` desktop: `notes-desktop.report.report.html` / `notes-desktop.report.report.json`
- `/notes` mobile: `notes-mobile.report.report.html` / `notes-mobile.report.report.json`
- `/about` desktop: `about-desktop.report.report.html` / `about-desktop.report.report.json`
- `/about` mobile: `about-mobile.report.report.html` / `about-mobile.report.report.json`
