---
slug: "kafka-rebalance-notes"
date: "2026-03-06"
title: "Notes on Kafka consumer rebalancing in the wild"
tags: ["platform", "kafka"]
published: true
---

Rebalances are usually fine. The bad ones are the ones nobody notices until lag spikes, caused by silent consumer death, slow message processing exceeding `max.poll.interval.ms`, or a deploy that thrashes group membership.

Three knobs that bought us most of the wins: cooperative-sticky assignor (no full stop-the-world), tuning `session.timeout.ms` and `heartbeat.interval.ms` for our actual processing time, and shipping a metric for partition-revoked count so a 'normal' deploy doesn't hide a leaking pod.

Static membership helps for stable consumer pools, at the cost of slower failover. Pick deliberately.
