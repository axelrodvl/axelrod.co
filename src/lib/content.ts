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
  slug: string;
  tags: string[];
  llmTags: string[];
  llmTagsTranslated: string[];
};

type ArticleFrontmatter = {
  title: string;
  date: string;
  tags?: string;
  "llm-usage"?: number;
  "llm-translation"?: boolean;
  published?: boolean;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  tagsList: string[];
  publishedAt: Date;
  llmTags: string[];
  llmTagsTranslated: string[];
};

export type ArticleDetail = {
  slug: string;
  frontmatter: ArticleFrontmatter;
  tagsList: string[];
  content: string;
  publishedAt: Date;
  llmTags: string[];
  llmTagsTranslated: string[];
};

export function readProjects(locale: string): Project[] {
  const filePath = path.join(PROJECTS_PATH, locale, "projects.md");
  const file = fs.readFileSync(filePath, "utf8");
  const entries = file
    .split(/\n---\n+/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  return entries.map((entry, index) => {
    const { data } = matter(`---\n${entry}\n---\n`);
    const llmTagLocales = buildLlmTags(data);
    const explicitSlug = typeof data.slug === "string" ? data.slug : undefined;
    const rawSlugSource = explicitSlug && explicitSlug.trim().length > 0 ? explicitSlug : data.name ?? "";
    const slug = createSlug(rawSlugSource) || `project-${index + 1}`;

    return {
      name: data.name ?? "",
      link: data.link ?? "#",
      description: data.description ?? "",
      slug,
      tags: normaliseTags(data.tags),
      llmTags: llmTagLocales.map((tag) => tag.en),
      llmTagsTranslated: llmTagLocales.map((tag) => getTagByLocale(tag, locale)),
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

  const articles = files.reduce<Article[]>((acc, { file, content }) => {
    const { data } = parseMarkdown(content);
    if (isExplicitlyFalse(data.published)) {
      return acc;
    }
    const publishedAt = parseDate(data.date ?? "01.01.1970");

    const llmTagLocales = buildLlmTags(data);

    const article: Article = {
      title: data.title ?? file,
      date: data.date ?? "01.01.1970",
      tags: data.tags ?? "",
      tagsList: normaliseTags(data.tags),
      slug: file.replace(/\.md$/, ""),
      publishedAt,
      llmTags: llmTagLocales.map((tag) => tag.en),
      llmTagsTranslated: llmTagLocales.map((tag) => getTagByLocale(tag, locale)),
    };

    acc.push(article);
    return acc;
  }, []);

  return articles.sort((a, b) => Number(b.publishedAt) - Number(a.publishedAt));
}

export function readArticle(locale: string, slug: string): ArticleDetail | null {
  const fullPath = path.join(ARTICLES_PATH, locale, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = parseMarkdown(raw);
  if (isExplicitlyFalse(data.published)) {
    return null;
  }
  const publishedAt = parseDate(data.date ?? "01.01.1970");

  const llmTagLocales = buildLlmTags(data);

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
    llmTags: llmTagLocales.map((tag) => tag.en),
    llmTagsTranslated: llmTagLocales.map((tag) => getTagByLocale(tag, locale)),
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

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export { createSlug };

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

type LlmTag = {
  key: string;
  en: string;
  ru: string;
};

function buildLlmTags(data: Record<string, unknown>): LlmTag[] {
  const result: LlmTag[] = [];
  const usage = parseLlmUsage(data["llm-usage"]);

  if (usage != null) {
    const normalised = clampPercentage(usage);
    const formatted = formatPercentage(normalised);
    const icon = normalised >= 50 ? "🤖" : "🧠";
    const label = `${icon} ${formatted}% LLM`;

    result.push({
      key: "llm-usage",
      en: label,
      ru: label,
    });
  }

  if (isTruthy(data["llm-translation"])) {
    result.push({
      key: "llm-translation",
      en: "🤖 LLM translated",
      ru: "🤖 Переведено LLM",
    });
  }

  return result;
}

function getTagByLocale(tag: LlmTag, locale: string): string {
  if (locale === "ru") {
    return tag.ru;
  }

  return tag.en;
}

function parseLlmUsage(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
}

function clampPercentage(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}

function formatPercentage(value: number): string {
  const fixed = value.toFixed(1);
  return fixed.replace(/\.0$/, "");
}

function isTruthy(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.trim().toLowerCase() === "true";
  }

  return false;
}

function isExplicitlyFalse(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value === false;
  }

  if (typeof value === "string") {
    return value.trim().toLowerCase() === "false";
  }

  return false;
}

