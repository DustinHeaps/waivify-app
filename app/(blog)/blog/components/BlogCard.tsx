
import { Post } from '@/types';
import Link from "next/link";

export default function BlogCard( post: Post) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="border border-border p-4 rounded hover:shadow transition">
        <h2 className="text-2xl font-semibold">{post.title}</h2>
        <p className="text-muted-foreground mt-1">{post.description}</p>
        <span className="text-sm text-muted-foreground mt-2 block">
          {post.date}
        </span>
      </div>
    </Link>
  );
}
