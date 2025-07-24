import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/billing(.*)",
  "/account(.*)",
  "/home(.*)",
  "/waiver(.*)",
  "/template(.*)",
  "/blogtools(.*)",

]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.pathname;

  // Skip confirmation page explicitly
  if (url.startsWith("/waiver/confirmation")) return;

  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
