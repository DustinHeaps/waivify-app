import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { publishToDevto } from '@/app/actions/post';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  const POSTS_PATH = path.join(process.cwd(), 'app/(blog)/blog/content/posts');
  const files = await fs.readdir(POSTS_PATH);

  const now = new Date();

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;

    const filePath = path.join(POSTS_PATH, file);
    const source = await fs.readFile(filePath, 'utf8');
    const { data } = matter(source);

    if (!data.publishedAt || data.devtoPublished) continue;

    const publishTime = new Date(data.publishedAt);
    if (publishTime > now) continue;

    const slug = file.replace(/\.mdx$/, '');

    try {
      await publishToDevto(slug, { publish: true });

      console.log(`✅ Published ${slug} to Dev.to`);
      // Optionally mark it as published in your metadata or DB
    } catch (err) {
      console.error(`❌ Failed to publish ${slug}:`, err);
    }
  }

  return NextResponse.json({ success: true });
}
