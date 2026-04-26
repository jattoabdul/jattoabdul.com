# jattoabdul.com — deployment runbook

End-to-end steps to take this from "merged to main" to "jattoabdul.com is
live with TLS". Mirrors the trustkarry pattern (Railway for compute,
Cloudflare for DNS, OpenTofu for Cloudflare).

---

## Prerequisites (one-time)

- [ ] Railway account with billing enabled
- [ ] Cloudflare account with `jattoabdul.com` zone set up
- [ ] GitHub repo (`jattoabdul/jattoabdul.com`) accessible to Railway
- [ ] `railway` CLI installed and `railway login` complete (or use the web UI)
- [ ] `tofu` CLI installed (`brew install opentofu`)
- [ ] Cloudflare API token in your shell:
      `export CLOUDFLARE_API_TOKEN=<token>` (token needs Zone:DNS:Edit on `jattoabdul.com`)
- [ ] Resend account (when newsletter is wired) — see env.example for setup

---

## Step 1 — Create the Railway project

Two services aren't needed (no separate API). One Next.js service is enough.

```bash
# from the repo root
railway init                       # name: jattoabdul-prod
railway link                       # link this directory to the new project
```

Or via web UI: Railway → New Project → Deploy from GitHub Repo → pick
`jattoabdul/jattoabdul.com` → branch `main`.

Railway auto-detects Next.js and uses the Railpack builder configured in
`railway.toml`.

## Step 2 — Set production env vars

Copy values from `infra/railway/env/production.env.example` into:

**Railway → Service → Variables**

The list (current as of this runbook):

| Var | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_ENABLE_MEDIUM_FEED` | `true` | Pulls Medium posts |
| `NEXT_PUBLIC_ENABLE_YOUTUBE_FEED` | `true` | Pulls YouTube videos |
| `YOUTUBE_CHANNEL_ID` | `UCJBv-...` | from your channel page source |
| `NEXT_PUBLIC_HERO_VARIANT` | `terminal` | or `editorial` |
| `RESEND_API_KEY` | `re_...` | server-only |
| `RESEND_AUDIENCE_ID` | `<uuid>` | from Resend → Audiences |

Don't set `PORT` — Railway injects it.

## Step 3 — First deploy

```bash
railway up                         # or push to main and let Railway auto-deploy
```

Railway gives you a generated URL like `jattoabdul-com-production.up.railway.app`.
Verify it works before touching DNS:

```bash
./infra/scripts/production-smoke.sh https://<generated-railway-url>
```

All probes should return 200.

## Step 4 — Add custom domains on Railway

**Railway → Service → Settings → Networking → Custom Domains** → Add Domain

Add both:

1. `jattoabdul.com`
2. `www.jattoabdul.com`

For each, Railway shows a CNAME target and a TXT verification token. Copy
all four into:

```bash
cp infra/opentofu/cloudflare/terraform.tfvars.example \
   infra/opentofu/cloudflare/terraform.tfvars

$EDITOR infra/opentofu/cloudflare/terraform.tfvars
```

Fill `apex_cname_target`, `www_cname_target`, `apex_railway_verification_token`,
`www_railway_verification_token`.

Also set `cloudflare_account_id` and `cloudflare_zone_id` from your
Cloudflare dashboard (or the workspace `.env`).

## Step 5 — Apply Cloudflare DNS via OpenTofu

```bash
cd infra/opentofu/cloudflare

tofu init
tofu plan -out=plan.out
tofu apply plan.out
```

This creates four Cloudflare records:

- `jattoabdul.com` CNAME → Railway
- `_railway-verify` TXT → ownership token (apex)
- `www` CNAME → Railway
- `_railway-verify.www` TXT → ownership token (www)

Cloudflare proxy is **off** by default (`proxied = false`). Recommended for
launch — Railway issues its own TLS cert and the renewal flow uses the
verification TXT record. Flip `proxied = true` later when you want the
orange-cloud benefits (WAF, caching) and have verified TLS is stable.

## Step 6 — Verify TLS + custom domains

Back on Railway, the custom domains will move from "pending verification" to
"active" within a few minutes. If they don't:

```bash
dig jattoabdul.com CNAME
dig _railway-verify.jattoabdul.com TXT
```

Both should return what OpenTofu set. If they do, the issue is on Railway's
side — try removing and re-adding the custom domain.

## Step 7 — Decide canonical: apex vs www

Railway will serve both. Pick one as canonical and 301 the other. Easiest
path: Railway → Custom Domain → set `www.jattoabdul.com` to redirect to
`jattoabdul.com` (or vice-versa). No code change needed.

## Step 8 — Final smoke

```bash
./infra/scripts/production-smoke.sh https://jattoabdul.com
```

Then in a browser:

- [ ] `/` renders the terminal hero, no console errors
- [ ] `/writing` lists Medium posts + the two promoted local posts
- [ ] `/writing/staff-judgment` and `/writing/writing-as-engineer` open
- [ ] `/notes` and a few note slugs open
- [ ] `/videos` shows YouTube-fetched videos with thumbnails
- [ ] Command menu opens via ⌘K, search works, navigates
- [ ] Light/dark toggle works, no flash
- [ ] Mobile viewport renders cleanly

## Step 9 — Submit to Search Console

1. Add `jattoabdul.com` as a property in Google Search Console.
2. Verify via Cloudflare TXT record (Search Console gives a token; add a
   DNS record in Cloudflare or via OpenTofu).
3. Submit `https://jattoabdul.com/sitemap.xml`.

## Step 10 — Watch the first 24 hours

- Railway → Deployments → check for any restart loops on the healthcheck
- Resend dashboard → first newsletter signups (if anyone subscribes)
- Cloudflare → Analytics → confirm DNS resolves and traffic flows

---

## Rollback

Railway keeps every deploy. To roll back: Railway → Deployments → pick a
previous successful deploy → "Redeploy". DNS doesn't need to change.

If DNS itself goes wrong: `tofu destroy` removes the records, but you'll
lose the site at that point. Safer is to fix forward by editing the
`terraform.tfvars` and re-applying.
