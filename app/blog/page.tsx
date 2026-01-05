import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import Link from "next/link";

async function getPosts() {
  const postsDirectory = join(process.cwd(), "content/blog");
  const filenames = await readdir(postsDirectory);
  
  const posts = await Promise.all(
    filenames
      .filter((name) => name.endsWith(".md"))
      .map(async (filename) => {
        const filePath = join(postsDirectory, filename);
        const fileContents = await readFile(filePath, "utf8");
        const { data } = matter(fileContents);
        return {
          slug: filename.replace(".md", ""),
          title: data.title || "Untitled",
          date: data.date ? (data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date)) : "",
        };
      })
  );

  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Blog</h1>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: "1rem" }}>
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: "underline" }}>
              <h2 style={{ marginBottom: "0.5rem" }}>{post.title}</h2>
            </Link>
            {post.date && <p style={{ color: "#666" }}>{post.date}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}

