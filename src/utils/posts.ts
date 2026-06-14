import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export function sortPosts(posts: Post[], by: "date" | "updated" = "date"): Post[] {
  return [...posts].sort((a, b) => {
    const aVal = by === "updated" && a.data.updated
      ? new Date(a.data.updated).valueOf()
      : new Date(a.data.date).valueOf();
    const bVal = by === "updated" && b.data.updated
      ? new Date(b.data.updated).valueOf()
      : new Date(b.data.date).valueOf();
    return bVal - aVal;
  });
}

export function getSeriesMap(posts: Post[]): Map<string, Post[]> {
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    if (post.data.series) {
      const existing = map.get(post.data.series) || [];
      existing.push(post);
      map.set(post.data.series, existing);
    }
  }
  return map;
}

export function getTagMap(posts: Post[]): Map<string, Post[]> {
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const existing = map.get(tag) || [];
      existing.push(post);
      map.set(tag, existing);
    }
  }
  return map;
}

export function getAdjacentPosts(
  posts: Post[],
  currentSlug: string
): { prev: Post | null; next: Post | null } {
  const sorted = sortPosts(posts, "date");
  const index = sorted.findIndex((p) => p.slug === currentSlug);
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  return getCollection("posts");
}
