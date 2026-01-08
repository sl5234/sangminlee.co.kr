# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Architecture

This is a personal website built with Next.js 16 (App Router) containing a resume page and markdown-based blog.

### Key Structure

- `app/` - Next.js App Router pages
  - `layout.tsx` - Root layout with navigation
  - `page.tsx` - Homepage
  - `resume/page.tsx` - Resume page
  - `blog/page.tsx` - Blog listing (reads from content/blog/)
  - `blog/[slug]/page.tsx` - Individual blog post (dynamic route)
- `content/blog/` - Markdown blog posts with frontmatter (title, date)

### Blog System

Blog posts are markdown files in `content/blog/`. Each file uses gray-matter for frontmatter parsing and remark/remark-html for markdown-to-HTML conversion.

Frontmatter format:
```yaml
---
title: Post Title
date: 2024-01-01
---
```

### Path Aliases

`@/*` maps to the project root (configured in tsconfig.json).
