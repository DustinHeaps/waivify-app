import fs from "fs/promises";

import path from "path";

import { compileMDX } from "next-mdx-remote/rsc";

import MdxImage from "@/app/(blog)/blog/components/MDXImage";

const POSTS_PATH = path.join(process.cwd(), "app/(blog)/blog/content/posts");

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

  return { content, frontmatter };
}

export async function getAllPosts() {
  const files = await fs.readdir(POSTS_PATH);

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
        }>({
          source,
          options: { parseFrontmatter: true },
          components: { Image: MdxImage },
        });

        return {
          ...frontmatter,
          slug,
        };
      })
  );

  // Optional: sort by date (latest first)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
