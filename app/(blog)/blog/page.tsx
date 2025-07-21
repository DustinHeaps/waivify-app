"use client";

import { useEffect, useState } from "react";

import BlogCard from "./components/BlogCard";
import { fetchAllPosts } from "@/app/actions/post";
import { Post } from "@/types";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetchAllPosts();
        setPosts(posts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    getPosts();
  }, []);
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  // const filteredPosts = selectedTag
  //   ? posts.filter((post) => post.tags.includes(selectedTag))
  //   : posts;

  const filteredPosts = posts.filter((post) => {
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    const matchesSearch = searchTerm
      ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    return matchesTag && matchesSearch;
  });

  // const filteredPosts = posts.filter((post) => {
  //   const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
  //   const matchesSearch =
  //     post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

  //   return matchesTag && matchesSearch;
  // });
  return (
    <div className='max-w-5xl mx-auto px-6 py-12'>
      <h1 className='text-4xl font-bold mb-6'>The Waivify Blog</h1>
      <p className='text-lg text-muted-foreground mb-8'>
        Waivers, workflows & wins — made simple.
      </p>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search blog posts...'
        className='w-full sm:w-1/2 mb-6 px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
      />
      <div className='flex flex-wrap gap-2 mb-8'>
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded text-sm ${
            selectedTag === null ? "bg-primary text-white" : "bg-muted"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded text-sm ${
              selectedTag === tag ? "bg-primary text-white" : "bg-muted"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className='grid gap-8 sm:grid-cols-2'>
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
