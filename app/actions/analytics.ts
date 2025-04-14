"use server";

import { trackEvent } from "@/lib/posthog/posthog.server";

export async function log404(path: string) {
  trackEvent({
    event: "404_page_view",
    distinctId: "server",
    properties: {
      path,
    },
  });
}

export async function markWaiverViewed(page: string) {
  await trackEvent({
    event: "waiver_viewed",
    distinctId: page,
  });

  //   await db.waiver.update({
  //     where: { id: waiverId },
  //     data: { viewedAt: new Date() },
  //   });

  return { success: true };
}
