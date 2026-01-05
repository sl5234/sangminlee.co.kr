import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

async function getPost(slug: string) {
  const filePath = join(process.cwd(), "content/blog", `${slug}.md`);
  
  try {
    const fileContents = await readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      title: data.title || "Untitled",
      date: data.date ? (data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date)) : "",
      content: contentHtml,
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const postsDirectory = join(process.cwd(), "content/blog");
  const filenames = await readdir(postsDirectory);
  
  return filenames
    .filter((name) => name.endsWith(".md"))
    .map((filename) => ({
      slug: filename.replace(".md", ""),
    }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{post.title}</h1>
      {post.date && <p style={{ color: "#666" }}>{post.date}</p>}
      <div
        style={{ marginTop: "2rem" }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <p style={{ marginTop: "2rem" }}>
        <a href="/blog">← Back to blog</a>
      </p>
    </main>
  );
}

