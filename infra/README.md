# jattoabdul.com — infra

Production infrastructure for [jattoabdul.com](https://jattoabdul.com).

Mirrors the pattern used by `trustkarry_infra` (sibling repo): Railway hosts
the Next.js app; Cloudflare manages DNS, TLS, and proxy. OpenTofu codifies
the Cloudflare side.

## Layout

```
infra/
├── README.md                        ← you are here
├── opentofu/
│   └── cloudflare/                  ← DNS for jattoabdul.com (apex + www)
│       ├── versions.tf
│       ├── variables.tf
│       ├── dns.tf
│       ├── outputs.tf
│       └── terraform.tfvars.example
├── railway/
│   └── env/
│       └── production.env.example   ← env vars to set on the Railway service
├── docs/
│   └── deployment-runbook.md        ← step-by-step launch runbook
└── scripts/
    └── production-smoke.sh          ← post-deploy health probe
```

## Quick path to launch

1. **Create the Railway project + service** (manual, via CLI or web UI). See
   `docs/deployment-runbook.md`.
2. **Set production env vars** on the Railway service from the example in
   `railway/env/production.env.example`.
3. **Add the custom domains** (`jattoabdul.com` + `www.jattoabdul.com`) on the
   Railway service. Railway returns a CNAME target and a verification token
   for each.
4. **Fill `opentofu/cloudflare/terraform.tfvars`** with those values.
5. **Apply OpenTofu** to provision Cloudflare DNS:

   ```bash
   cd infra/opentofu/cloudflare
   tofu init
   tofu plan -out=plan.out
   tofu apply plan.out
   ```

6. **Smoke test** from `infra/scripts/production-smoke.sh`.

## Auth

Both providers use locally-cached CLI auth — no secrets live in this repo.

- Cloudflare: `CLOUDFLARE_API_TOKEN` env var (read from the workspace `.env`
  by the OpenTofu provider).
- Railway: `railway login` (browser flow) or `RAILWAY_TOKEN` for CI.
