---
slug: "prompt-caching-prod"
date: "2026-04-08"
title: "Prompt caching in production: what actually matters"
tags: ["applied-ai"]
published: true
---

Prompt caching is the lowest-effort, highest-impact optimisation in applied AI right now. The trick is putting the stable parts at the front: system prompt, tool definitions, retrieved context that rarely changes.

Variable user input goes last. Cache hit rate becomes a metric you watch the way you watch p99 latency. Mine sits above 80% on the hot paths. That's not a tuning win, that's just structure.
