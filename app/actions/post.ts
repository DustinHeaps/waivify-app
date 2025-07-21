"use server";

import { getAllPosts } from "@/lib/post";

export async function fetchAllPosts() {
  const posts = await getAllPosts();
  return posts;
}
