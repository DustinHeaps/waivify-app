"use client";

import { useEffect, useState } from "react";

import BlogCard from "./components/BlogCard";
import { fetchAllPosts } from "@/app/actions/post";
import { Post } from "@/types";
import Pagination from "@/app/dashboard/components/Pagination";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
  const featuredPost = posts.find((post) => post.featured);

  const filteredPosts = posts.filter((post) => {
    // remove later when have enough posts
    // const isFeatured = featuredPost?.slug === post.slug;
    // if (isFeatured) return false;

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

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const getTopTags = (posts: Post[], limit = 10): string[] => {
    const tagCount: Record<string, number> = {};

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([tag]) => tag);
  };

  const topTags = getTopTags(posts);

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      {/* Hero Section */}
      <a href='/' className='text-sm text-blue-600 hover:underline'>
        ← Check out Waivify
      </a>
      <div className='bg-gradient-to-br from-teal-500 to-teal-400 text-white py-16 px-8 rounded-2xl text-center shadow-lg mb-12'>
        <h1 className='text-5xl font-bold mb-4 tracking-tight'>
          The Waivify Blog
        </h1>
        <p className='text-lg text-white/90 max-w-xl mx-auto'>
          Waivers, workflows & wins — all made simple.
        </p>
      </div>
      {featuredPost && (
        <div className='mb-12 border border-gray-200 rounded-xl overflow-hidden shadow-md'>
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className='w-full h-64 object-cover'
          />
          <div className='p-6 bg-white'>
            <span className='text-sm uppercase text-gray-500'>
              Featured Post
            </span>
            <h2 className='text-2xl font-bold mt-2 mb-2'>
              {featuredPost.title}
            </h2>
            <p className='text-gray-700 mb-4'>{featuredPost.description}</p>
            <a
              href={`/blog/${featuredPost.slug}`}
              className='text-blue-600 font-medium hover:underline'
            >
              Read more →
            </a>
          </div>
        </div>
      )}

      {/* Search + Tag Filter */}
      <div className='max-w-6xl mx-auto space-y-6'>
        <div className='w-full'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search blog posts...'
            className='mb-4 w-full sm:w-1/2 px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>

        {/* Tag Filter */}
        <div className='flex flex-wrap gap-2'>
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              selectedTag === null ? "bg-primary text-white" : "hover:bg-muted"
            }`}
          >
            All
          </button>
          {topTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                selectedTag === tag ? "bg-primary text-white" : "hover:bg-muted"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className='mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {paginatedPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
