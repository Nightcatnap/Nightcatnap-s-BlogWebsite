import rss from "@astrojs/rss";
import { getAllPosts, sortPosts } from "../utils/posts";

export async function GET(context) {
  const posts = sortPosts(await getAllPosts(), "date");
  return rss({
    title: "个人博客",
    description: "一个关于技术和生活的个人博客。",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary || "",
      pubDate: post.data.date,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
