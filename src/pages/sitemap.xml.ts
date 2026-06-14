import { getAllPosts, sortPosts, getTagMap } from "../utils/posts";

export async function GET() {
  const posts = sortPosts(await getAllPosts(), "date");
  const tagMap = getTagMap(posts);
  const tags = [...tagMap.keys()];

  const siteUrl = import.meta.env.SITE || "https://your-site.vercel.app";

  const pages = [
    { url: "", priority: "1.0" },
    { url: "about", priority: "0.8" },
    { url: "archive", priority: "0.7" },
    { url: "tags", priority: "0.7" },
    { url: "search", priority: "0.5" },
    ...tags.map((tag) => ({ url: `tags/${tag}`, priority: "0.6" })),
    ...posts.map((post) => ({ url: `posts/${post.slug}`, priority: "0.9" })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}/${page.url}</loc>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
