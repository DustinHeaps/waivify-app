import { PostHog } from "posthog-node";

export const posthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY as string,
  {
    host: "https://app.posthog.com",
  }
);

export async function trackEvent({
  event,
  distinctId = "server",
  properties = {},
}: {
  event: string;
  distinctId?: string;
  properties?: Record<string, any>;
}) {
  try {
    await posthog.capture({
      distinctId,
      event,
      properties,
    });
  } catch (err) {
    console.error("PostHog track error:", err);
  }

  await posthog.shutdown();
}
