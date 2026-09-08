---
slug: "codify-before-it-matters"
date: "2026-05-15"
title: "Codify before it matters"
tags: ["platform", "career"]
published: true
---

jattoabdul.com is two DNS records and one Railway service. I codified them in OpenTofu anyway. There is no team that needs the audit trail, no scale that needs the repeatability; at this size, click-ops in the Cloudflare dashboard would work fine.

I'm doing it for the muscle. The first time you reach for OpenTofu in anger is the wrong time to learn its diff semantics or how its state file behaves under a rushed typo. Personal infra is low-stakes practice with real consequences: real DNS, real deploys, real state, real mistakes that only affect me.

It is a broader pattern. The branch protection on this repo, the CI that runs lint and type-check on every PR, a CODEOWNERS file with one name on it: none of it is load-bearing today. All of it is enforcing on myself, at small scale, the rules I want enforced at work. The discipline you practice when nothing depends on it is the discipline you keep when everything does.
