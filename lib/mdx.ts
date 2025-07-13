import fs from "fs/promises";
import path from "path";

import { compileMDX } from "next-mdx-remote/rsc";

import MdxImage from "@/app/(blog)/blog/components/MDXImage";

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
    tags: [string]
    image: string;
  }>({
    source,
    options: { parseFrontmatter: true },
    components: {
      Image: MdxImage,
    },
  });

  return { content, frontmatter };
}
