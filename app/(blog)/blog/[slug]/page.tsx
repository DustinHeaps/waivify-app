import { getPost } from "@/lib/post";
import Image from "next/image";
import { BackToBlog } from "../components/BackToBlogButton";
type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props) {
  const mdxSource = await getPost((await params).slug);
  const { title, description, date, tags, author, image, publishedAt } =
    mdxSource.frontmatter;

    const realasedAt = new Date(publishedAt);
    const formattedDate = realasedAt.toISOString().split("T")[0]

  return {
    title,
    description,
    date,
    tags,
    author,
    openGraph: {
      title,
      description,
      date,
      tags,
      publishedTime: formattedDate,
      author,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      date,
      tags,
      author,
      images: [image],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const { content, frontmatter, readTime } = await getPost(slug);

  return (
    <article className='bg-muted px-4 pt-10 pb-20 max-w-3xl mx-auto'>
      <h1 className='text-[2rem] font-semibold tracking-tight leading-snug mb-2 text-neutral-900'>
        {frontmatter.title} 
      </h1>
      <BackToBlog />
      {/* Meta info section */}
      <div className='text-sm text-muted-foreground mb-8 space-y-1'>
        {frontmatter.description && (
          <p className='text-base text-neutral-600'>
            {frontmatter.description}
          </p>
        )}
        <div className='flex flex-wrap gap-4 items-center text-xs'>
          {frontmatter.date && (
            <span>📅 {new Date(frontmatter.publishedAt).toLocaleDateString()}</span>
          )}
          {frontmatter.author && <span>✍️ {frontmatter.author}</span>}
          {readTime && <span>⏱️ {readTime} min read</span>}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className='flex gap-2'>
              {frontmatter.tags.map((tag: string) => (
                <span
                  key={tag}
                  className='bg-muted px-2 py-1 rounded text-[10px] uppercase tracking-wider'
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {frontmatter.image && (
        <Image
          src={frontmatter.image}
          alt='Zapier x Waivify automation flow'
          width={1200}
          height={630}
          className='rounded-lg mb-10'
        />
      )}
      {/* <div className='prose prose-neutral prose-headings:font-semibold prose-headings:tracking-tight prose-headings:mb-3 prose-p:leading-relaxed prose-p:mb-4 prose-ul:pl-5 prose-ul:mb-4 prose-li:marker:text-neutral-400 prose-a:text-[#0D89EC] max-w-2xl mx-auto'>
        {content}
      </div> */}

      <div className='prose prose-blog max-w-2xl mx-auto'> {content}</div>
    </article>
  );
}
