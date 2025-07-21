import { Post } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="mb-12">
      {/* <h2 className="text-2xl font-semibold mb-4">Featured</h2> */}
      <div className="grid sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {/* {post.image && (
              <div className="relative w-full h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )} */}
            <div className="p-4">
              <h3 className="text-lg font-semibold group-hover:underline">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
