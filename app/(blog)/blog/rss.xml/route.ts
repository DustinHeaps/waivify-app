import { fetchAllPosts } from "@/app/actions/post";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await fetchAllPosts();

  const siteUrl = "https://waivify.com";

  const escape = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const feed = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>The Waivify Blog</title>
        <link>${siteUrl}/blog</link>
         <description>Waivers, workflows &amp; wins &#8212; made simple.</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>

        ${posts
          .map(
            (post) => `
          <item>
            <title>${escape(post.title)}</title>
            <link>${siteUrl}/blog/${post.slug}</link>
            <guid>${siteUrl}/blog/${post.slug}</guid>
            <description>${escape(post.description)}</description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          </item>
        `
          )
          .join("")}
      </channel>
    </rss>
  `.trim();

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
