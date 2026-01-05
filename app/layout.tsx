import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sangmin Lee",
  description: "Personal resume and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <a href="/" style={{ marginRight: "1rem" }}>Home</a>
          <a href="/resume" style={{ marginRight: "1rem" }}>Resume</a>
          <a href="/blog">Blog</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
