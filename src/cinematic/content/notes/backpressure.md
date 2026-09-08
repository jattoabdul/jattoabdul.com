---
slug: "backpressure"
date: "2026-02-14"
title: "A small note on backpressure"
tags: ["backend"]
published: true
---

If you don't reject load when the system is stressed, the system rejects load for you, usually by falling over. Backpressure is the polite version of saying no.

Surface it everywhere there's a queue. A bounded channel that drops or rejects beats an unbounded one that quietly fills memory until OOM. Same for HTTP: return 429 with a useful Retry-After before the latency tail eats everyone.
