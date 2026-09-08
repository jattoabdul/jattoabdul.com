# Portrait icons and BIMI asset

September 8, 2026, America/Toronto. Owner requested the approved portrait favicon, retained signature wordmark, and a hosted portrait SVG for BIMI.

## Sources and outputs

Approved sources are the September 4 website exports in `/Users/jatto/Media-Work/jatto-abdul/brand/exports/website/`:

- `website-favicon-32x32-v1-20260904.png` → `src/app/icon.png`.
- `website-apple-touch-icon-180x180-v1-20260904.png` → `src/app/apple-icon.png`.
- `website-favicon-v1-20260904.ico` → `public/favicon.ico`.
- `website-icon-512x512-v1-20260904.png` → `public/brand/jatto-abdul-portrait.png`.

These are unchanged exports of the approved face-only portrait on navy. Static Next.js image conventions replace the previous programmatic letter-j icons. The signature logo and its animation are unchanged.

The owner-supplied portrait SVGs under `portraits/source/2026-09-03-owner-supplied-set/jatto_pics_transparent_svgs` embed raster images and filters. They are not BIMI-ready vector files and were not published as such.

## BIMI vector

Public URL: https://jattoabdul.com/brand/jatto-abdul-portrait-bimi.svg

A stylized vector tracing of the approved 512px portrait, without generative face replacement. Conversion used Pillow (256px Lanczos, 16-color quantization), VTracer 0.6.12 (stacked color splines; filter_speckle 5, color_precision 8, layer_difference 16, path_precision 1), and SVGO 4.1.0 (multipass, precision 0). Root version/profile and title were added after optimization.

The file is square, has an opaque navy background, contains vector paths rather than embedded photographs, and is below 32,000 bytes. It passes the BIMI Group SVG Tiny-PS Relax NG schema using lxml/rnc2rng. It contains no external image references, scripts, animation, CSS, masks or filters. The vector intentionally has simplified shading; photographic detail remains in the favicon PNGs.

Schema validation establishes the asset format, not mailbox-provider certification or guaranteed display. No BIMI TXT record, DMARC policy, certificate, or other mail setting was changed.

Sources: https://bimigroup.org/creating-bimi-svg-logo-files/ and https://bimigroup.org/resources/SVG_PS-latest.rnc.txt

## Live verification

Published September 8, 2026 (America/Toronto), Worker version `5e883d9f-defe-4004-b93c-0ec27f6aecee`. Live HTML advertises the portrait `/icon.png` and `/apple-icon.png` with fresh cache-busting hashes. Both responses match the approved source files byte-for-byte. `/favicon.ico` and the signature SVG also match their respective local files. The hosted BIMI SVG returns HTTP 200, `image/svg+xml`, and matches the schema-validated 28,979-byte file. Lint, TypeScript, production Workers build, and all four live migration test groups passed.
