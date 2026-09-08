---
slug: "check-the-setup-before-the-result"
title: "Before I trust the result, I check the setup"
date: "2026-08-21"
tags: ["engineering", "judgment"]
published: true
---

A warning around Pinnr sent me back to a distinction that is easy to overlook: the production service and a temporary development connection are not the same thing. The investigation pointed to a local endpoint whose tunnel was offline. Treating that warning as proof that production was broken would have sent the work in the wrong direction.

A performance investigation that week brought up a similar problem. One test setup did not have the product running correctly. Numbers from that setup could look precise without answering the question we actually needed to ask.

There is a temptation to move quickly from a result to a fix. An error appears, so change something. A score looks bad, so optimize something. But the first useful question may be much smaller: what exactly did we test?

The reminder I am taking from these investigations is to check the conditions before defending a conclusion. Evidence becomes useful when I understand how it was produced. Otherwise, I can work very hard at solving the wrong problem.
