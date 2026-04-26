# Security policy

This is the source for [jattoabdul.com](https://jattoabdul.com), a personal
website. It has no user accounts, no payments, and no stored personal data
beyond newsletter emails (held by Resend, not by this app).

## Reporting a vulnerability

If you find a security issue — XSS, secret leak, dependency CVE that affects
production, or anything else that puts visitors at risk — please **email
me directly** at **me@jattoabdul.com** with:

- a description of the issue
- steps to reproduce (or a proof-of-concept)
- the affected URL or file path
- your name / handle for credit (optional)

Do **not** open a public GitHub issue for security-sensitive reports.

I will acknowledge receipt within 5 days and aim to ship a fix within 14 days
for confirmed issues. There is no bug bounty.

## Scope

In scope:

- This repository's source code
- The deployed site at `jattoabdul.com`
- The `/api/*` routes (`/api/health`, `/api/subscribe`)

Out of scope:

- Third-party services this site uses (Resend, YouTube, Medium RSS) — please
  report those directly to the vendor.
- Issues that require physical access to my devices.
- Best-practice recommendations that don't constitute a real vulnerability.

## Supported versions

Only the `main` branch is supported. There are no backported security fixes
for older deploys.
