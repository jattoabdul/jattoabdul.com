'use client';

import posthog from 'posthog-js';

type PostHogProperties = Record<string, string | number | boolean | null | undefined>;

const isPostHogEnabled = Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN);

export function captureEvent(eventName: string, properties?: PostHogProperties) {
  if (!isPostHogEnabled) return;
  posthog.capture(eventName, properties);
}

export function captureException(error: unknown) {
  if (!isPostHogEnabled) return;
  posthog.captureException(error);
}
