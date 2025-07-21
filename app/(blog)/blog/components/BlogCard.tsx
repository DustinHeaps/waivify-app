import { Post } from '@/types';
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export default function BlogCard(props: Post) {
  const { slug, title, description, date, image, tags, featured } = props;

  return (
    <Link href={`/blog/${slug}`}>
      <div
        className={clsx(
          "border border-border rounded overflow-hidden hover:shadow transition",
          featured && "ring-2 ring-primary"
        )}
      >
        {image && (
          <div className="relative w-full h-48">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-muted-foreground mt-1">{description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="bg-muted text-xs px-2 py-0.5 rounded text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-muted-foreground mt-2 block">
            {date}
          </span>
        </div>
      </div>
    </Link>
  );
}
