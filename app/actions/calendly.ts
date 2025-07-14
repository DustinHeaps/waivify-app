"use server";
export async function checkCalendlyBooking(
  email: string,
  calendlyLink: string
) {
  const token = process.env.CALENDLY_API_KEY;
  if (!token) throw new Error("Missing Calendly API Key");


  const match = calendlyLink.match(/calendly\.com\/[^\/]+\/([^\/?#]+)/);

  if (!match) {
    console.error("❌ Invalid Calendly link:", calendlyLink);
    return false;
  }
  const userUri = process.env.CALENDLY_USER_URI as string; 
   
  const res = await fetch(
    `https://api.calendly.com/scheduled_events?invitee_email=${email}&user=${encodeURIComponent(
      userUri
    )}&status=active&sort=start_time:asc`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    const match = calendlyLink.match(/calendly\.com\/[^\/]+\/([^\/?#]+)/);
    const expectedSlug = match?.[1];

    const events = data.collection || [];
    const upcoming = events.filter((event: any) => {
      const isFuture = new Date(event.start_time) > new Date();
      const match = calendlyLink.match(/calendly\.com\/[^\/]+\/([^\/?#]+)/);
      const expectedSlug = match?.[1] as string;
      const expectedName = decodeURIComponent(expectedSlug.replace(/-/g, " "));
      const matchesSlug =
        event.name?.toLowerCase().trim() === expectedName.toLowerCase().trim();
      return isFuture && matchesSlug;
    });

    return upcoming.length > 0;
  } catch (e) {
    console.error("❌ Failed to parse Calendly response:", text);
    return false;
  }
}
