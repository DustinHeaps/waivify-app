// import { getAllPosts } from "@/lib/posts"; 
import BlogCard from "./components/BlogCard";

export const metadata = {
  title: "The Waivify Blog",
  description:
    "Waivers, workflows & wins — made simple. Learn how to scale your service with smart forms, automations, and compliance tips.",
  openGraph: {
    title: "The Waivify Blog",
    description: "Waivers, workflows & wins — made simple.",
    url: "https://waivify.com/blog",
    siteName: "Waivify",
    images: [
      {
        url: "https://waivify.com/BlogOG-Rectangle.png",
        width: 1200,
        height: 630,
        alt: "The Waivify Blog",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Waivify Blog",
    description: "Waivers, workflows & wins — made simple.",
    images: ["https://waivify.com/BlogOG-Square.png"],
  },
};



export default async function BlogPage() {
  // const posts = await getAllPosts();

  return (
    <div className='max-w-3xl mx-auto px-6 py-12'>
      <h1 className='text-4xl font-bold mb-6'>The Waivify Blog</h1>
      <p className='text-lg text-muted-foreground mb-12'>
        Waivers, workflows & wins — made simple.
      </p>
      <div className='space-y-8'>
        {/* {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))} */}
      </div>
    </div>
  );
}
