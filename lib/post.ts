import fs from "fs/promises";

import path from "path";

import { compileMDX } from "next-mdx-remote/rsc";

import MdxImage from "@/app/(blog)/blog/components/MDXImage";

const POSTS_PATH = path.join(process.cwd(), "app/(blog)/blog/content/posts");

const wordsPerMinute = 200;

export async function getPost(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "app/(blog)/blog/content/posts",
    `${slug}.mdx`
  );
  const source = await fs.readFile(filePath, "utf-8");

  const { content, frontmatter } = await compileMDX<{
    title: string;
    author: string;
    description: string;
    date: string;
    tags: [string];
    image: string;
    featured: boolean;
  }>({
    source,
    options: { parseFrontmatter: true },
    components: {
      Image: MdxImage,
    },
  });
  const wordCount = source.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return { content, frontmatter, readTime };
}

export async function getAllPosts() {
  const files = await fs.readdir(POSTS_PATH);
  const now = new Date();

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(POSTS_PATH, file);
        const source = await fs.readFile(filePath, "utf8");

        const { frontmatter } = await compileMDX<{
          title: string;
          author: string;
          description: string;
          date: string;
          tags: [string];
          image: string;
          featured: boolean;
          publishedAt: string;
        }>({
          source,
          options: { parseFrontmatter: true },
          components: { Image: MdxImage },
        });

        const wordCount = source.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return {
          ...frontmatter,
          slug,
          readTime,
        };
      })
  );

  // ✅ Filter by publish time
  const visiblePosts = posts.filter((post) => {
    const publishedAt = post.publishedAt;
    return new Date(publishedAt) <= now;
  });

  // ✅ Sort by publish date (latest first)
  return visiblePosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}


