---
slug: "first-outage"
date: "2025-05-12"
title: "The first outage I owned end-to-end"
tags: ["career", "platform"]
published: true
---

Pager went off at 2am. By 3am the system was back up; by noon I had a postmortem draft. The technical fix was small. The hard part was writing the postmortem honestly, not 'we had an issue with our caching layer' but 'I shipped a config change without testing the cold-start path'.

The team was kinder about the postmortem than I expected. Honest writing earns trust faster than careful framing ever has.
