import { trackEvent } from '@/lib/posthog/posthog.server';

export async function log404(path: string) {
    trackEvent({
      event: "404_page_view",
      distinctId: "server",
      properties: {
        path,
      },
    });
  }