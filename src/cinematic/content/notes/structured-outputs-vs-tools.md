---
slug: "structured-outputs-vs-tools"
date: "2026-03-30"
title: "Structured outputs vs function calling"
tags: ["applied-ai"]
published: true
---

These get conflated, but they answer different questions. Function calling is the model deciding what to do: pick a tool, fill its arguments. Structured outputs is the model deciding how to shape an answer you've already decided you want.

Use function calling when there's branching: search vs respond, fetch vs compute, escalate vs resolve. Use structured outputs when the path is fixed and you need parseable JSON downstream.

Most teams I see reach for tools when they actually wanted a schema. The result is a bag of one-tool 'pseudo-functions' that always get called, which is just a clumsier way to ask for JSON.
