import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { parseDate } from "./utils";

const ROOT_PATH = process.cwd();
const PROJECTS_PATH = path.join(ROOT_PATH, "public", "project");
const ARTICLES_PATH = path.join(ROOT_PATH, "public", "article");

export type Project = {
  name: string;
  link: string;
  description: string;
  tags: string[];
};

type ArticleFrontmatter = {
  title: string;
  date: string;
  tags?: string;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  tagsList: string[];
  publishedAt: Date;
};

export type ArticleDetail = {
  slug: string;
  frontmatter: ArticleFrontmatter;
  tagsList: string[];
  content: string;
  publishedAt: Date;
};

export function readProjects(locale: string): Project[] {
  const filePath = path.join(PROJECTS_PATH, locale, "projects.md");
  const file = fs.readFileSync(filePath, "utf8");
  const entries = file
    .split(/\n---\n+/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  return entries.map((entry) => {
    const { data } = matter(`---\n${entry}\n---\n`);
    return {
      name: data.name ?? "",
      link: data.link ?? "#",
      description: data.description ?? "",
      tags: normaliseTags(data.tags),
    } satisfies Project;
  });
}

export function readArticles(locale: string): Article[] {
  const files = fs
    .readdirSync(path.join(ARTICLES_PATH, locale))
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      file,
      content: fs.readFileSync(path.join(ARTICLES_PATH, locale, file), "utf8"),
    }));

  return files
    .map(({ file, content }) => {
      const { data } = parseMarkdown(content);
      const publishedAt = parseDate(data.date ?? "01.01.1970");

      return {
        title: data.title ?? file,
        date: data.date ?? "01.01.1970",
        tags: data.tags ?? "",
        tagsList: normaliseTags(data.tags),
        slug: file.replace(/\.md$/, ""),
        publishedAt,
      } satisfies Article;
    })
    .sort((a, b) => Number(b.publishedAt) - Number(a.publishedAt));
}

export function readArticle(locale: string, slug: string): ArticleDetail | null {
  const fullPath = path.join(ARTICLES_PATH, locale, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = parseMarkdown(raw);
  const publishedAt = parseDate(data.date ?? "01.01.1970");

  return {
    slug,
    frontmatter: {
      title: data.title ?? slug,
      date: data.date ?? "01.01.1970",
      tags: data.tags ?? "",
    },
    tagsList: normaliseTags(data.tags),
    content,
    publishedAt,
  };
}

function normaliseTags(input: unknown): string[] {
  if (!input) return [];

  if (Array.isArray(input)) {
    return input.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (typeof input === "string") {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function parseMarkdown(raw: string) {
  const trimmed = raw.trimStart();

  if (trimmed.startsWith("---")) {
    return matter(raw);
  }

  const delimiterIndex = raw.indexOf("\n---");

  if (delimiterIndex === -1) {
    return matter(`---\n---\n${raw}`);
  }

  const frontmatter = raw.slice(0, delimiterIndex).trim();
  let remainderStart = delimiterIndex + 4; // skip "\n---"

  while (remainderStart < raw.length && /\s/.test(raw[remainderStart])) {
    remainderStart += 1;
  }

  const body = raw.slice(remainderStart);
  const synthetic = `---\n${frontmatter}\n---\n${body}`;

  return matter(synthetic);
}

