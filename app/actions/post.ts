"use server";

import { getAllPosts } from "@/lib/post";
import { revalidatePath } from "next/cache";
import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

export async function fetchAllPosts() {
  const posts = await getAllPosts();
  return posts;
}

export async function publishToDevto(
  slug: string,
  options?: { publish?: boolean }
) {
  const DEVTO_API_KEY = process.env.DEVTO_API_KEY!;
  if (!DEVTO_API_KEY) throw new Error("Missing DEVTO_API_KEY");

  const filePath = path.join(
    process.cwd(),
    "app/(blog)/blog/content/posts",
    `${slug}.mdx`
  );
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);

  const cleanContent = content.replace(/<[^>]+>/g, "");
  const compiled = await compile(cleanContent, {
    outputFormat: "function-body",
  });

  const cleanTags = (data.tags || [])
  .slice(0, 4)
  .map((tag: string) =>
    tag
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "") 
  )
  .filter(Boolean);

  const markdown = content;

  const baseUrl = "https://waivify.com";

  const imageUrl = data.image?.startsWith("http")
    ? data.image
    : `${baseUrl}${data.image}`;

  const res = await fetch("https://dev.to/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": DEVTO_API_KEY,
    },
    body: JSON.stringify({
      article: {
        title: data.title || "Untitled",
        published: options?.publish ?? false,
        body_markdown: markdown,
        tags: cleanTags,
        canonical_url: `https://waivify.com/blog/${data.slug || slug}`,
        cover_image: imageUrl || undefined
      },
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Dev.to API error: ${error}`);
  }

  const json = await res.json();
  console.log("✅ Draft posted to Dev.to:", json.url);

  revalidatePath("/blog");
  return json;
}
