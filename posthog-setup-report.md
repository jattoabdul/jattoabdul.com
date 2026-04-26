<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into jattoabdul.com. Here's a summary of everything that was set up:

**Infrastructure:**
- `instrumentation-client.ts` — client-side PostHog initialization using the Next.js 15.3+ instrumentation pattern. Includes session replay, error tracking (`capture_exceptions: true`), and a reverse proxy routing all PostHog requests through `/ingest`.
- `src/lib/posthog-server.ts` — singleton server-side PostHog client (posthog-node) for API route tracking.
- `next.config.ts` — reverse proxy rewrites added for `/ingest/static/*`, `/ingest/array/*`, and `/ingest/*` to improve ad-blocker resilience and data accuracy.
- `.env.local` — `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` set.

**New client component:** `src/components/site/TrackedLink.tsx` — a lightweight wrapper around `<a>` that fires `social_link_clicked` on click, used in the contact page without converting the entire server component.

**Event instrumentation across 6 files:**

| Event | Description | File |
|---|---|---|
| `newsletter_subscribed` | User successfully subscribed to the newsletter | `src/components/sections/NewsletterForm.tsx` |
| `newsletter_subscription_failed` | Subscription attempt failed (with exception capture) | `src/components/sections/NewsletterForm.tsx` |
| `newsletter_subscribed_server` | Server-side Resend API success confirmation | `src/app/api/subscribe/route.ts` |
| `command_menu_opened` | Command menu opened via button or ⌘K shortcut (with `trigger` property) | `src/components/site/CommandMenu.tsx` |
| `command_menu_item_selected` | Item selected from command menu (with `label`, `group`, `href`, `external` properties) | `src/components/site/CommandMenu.tsx` |
| `social_link_clicked` | Social/contact link clicked on the contact page (with `label` property) | `src/app/contact/page.tsx` |
| `video_clicked` | Video card clicked (with `title`, `platform`, `kind` properties) | `src/components/cards/VideoCard.tsx` |
| `project_card_clicked` | Project card clicked (with `slug`, `title`, `status` properties) | `src/components/cards/ProjectCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://us.posthog.com/project/398470/dashboard/1512513
- **Newsletter subscriptions over time:** https://us.posthog.com/project/398470/insights/UPe3hgU4
- **Newsletter signup funnel (success vs failure):** https://us.posthog.com/project/398470/insights/cqAL7kYT
- **Top command menu selections:** https://us.posthog.com/project/398470/insights/lYk5BGhj
- **Social link clicks by platform:** https://us.posthog.com/project/398470/insights/myW2asF4
- **Content engagement — projects vs videos:** https://us.posthog.com/project/398470/insights/YV3Cwi9a

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
