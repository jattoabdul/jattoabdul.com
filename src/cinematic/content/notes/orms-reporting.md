---
slug: "orms-reporting"
date: "2026-04-15"
title: "Why I stopped using ORMs for reporting queries"
tags: ["backend", "sql"]
published: true
---

ORMs are great for the 80% of CRUD that looks like CRUD. Reporting isn't CRUD.

Once a query touches three joins, a window function, and a CTE, the ORM expression is harder to read than the SQL it generates, and harder to optimise. I write the SQL by hand, version it like code, and let the ORM stay in its lane.
