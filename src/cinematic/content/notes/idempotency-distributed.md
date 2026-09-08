---
slug: "idempotency-distributed"
date: "2026-04-20"
title: "On idempotency in distributed systems"
tags: ["backend", "platform"]
published: true
---

Idempotency is the cheapest insurance you can buy for a distributed system. Every external write, whether a payment, email, or webhook, should accept an idempotency key. Every retry should reuse it.

When clients can't generate a stable key, generate one server-side from the request shape and a short window. Worse than a duplicate is a duplicate you can't explain.
