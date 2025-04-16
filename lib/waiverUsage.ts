import { getUserById, getUserBySlug, updateUser } from "@/app/actions/user";

// --- Configurable per plan ---
export const WAIVER_LIMITS: Record<string, number> = {
  free: 10,
  starter: 50,
  pro: Infinity,
};

// --- Get limit for given plan ---
export function getWaiverLimit(plan: string): number {
  return WAIVER_LIMITS[plan] ?? 0;
}

// --- Check if user has waivers left ---
export async function hasAvailableWaivers(userId: string): Promise<boolean> {
  const dbUser = await getUserById();
  if (!dbUser) return false;

  const waiversUsed = dbUser.waiverCount ?? 0;
  const plan = dbUser.plan ?? "free";
  const limit = getWaiverLimit(plan);

  return waiversUsed < limit;
}

// --- Increment usage ---
export async function incrementWaiverUsage(slug: string): Promise<void> {
  
  const dbUser = await getUserBySlug(slug)
  if (!dbUser) return;

  const currentCount = dbUser.waiverCount ?? 0;

  await updateUser(dbUser.clerkId, {
    waiverCount: currentCount + 1,
  });
}

// --- Reset usage (e.g., monthly cron job) ---
export async function resetWaiverUsage(userId: string): Promise<void> {
  await updateUser(userId, {
    waiverCount: 0,
  });
}
