import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Markdown } from "@/components/markdown";
import { readArticle, readArticles } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  const articles = readArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = readArticle(params.slug);

  if (!article) {
    return {
      title: "Article not found — Vadim Axelrod",
    } satisfies Metadata;
  }

  const description = article.frontmatter.tags
    ? `Topics: ${article.frontmatter.tags}`
    : "Article from Vadim Axelrod's personal site.";

  return {
    title: `${article.frontmatter.title} — Vadim Axelrod`,
    description,
    alternates: {
      canonical: `/article/${article.slug}`,
    },
  } satisfies Metadata;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = readArticle(params.slug);

  if (!article) {
    notFound();
  }

  const { frontmatter, content, tagsList, publishedAt } = article;

  return (
    <article className="space-y-8">
      <header className="space-y-4 border-b border-white/10 pb-6">
        <Link
          href="/article"
          className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
        >
          ← Back to articles
        </Link>
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            {formatDate(publishedAt)}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {frontmatter.title}
          </h1>
        </div>
        {tagsList.length > 0 && (
          <ul className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-emerald-300/80">
            {tagsList.map((tag) => (
              <li key={`${params.slug}-${tag}`} className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <Markdown baseImagePath={`/article/${params.slug}/`}>{content}</Markdown>
    </article>
  );
}

