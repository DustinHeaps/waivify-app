import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/api"],
      },
    ],
    sitemap: [
      "https://www.waivify.com/sitemap.xml",
      "https://waivify.com/blog/rss.xml",
    ],
  };
}
