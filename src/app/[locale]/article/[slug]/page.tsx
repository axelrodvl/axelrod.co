import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Locale } from "@/lib/i18n";
import { getDictionary, locales } from "@/lib/i18n";
import { Markdown } from "@/components/markdown";
import { readArticle, readArticles } from "@/lib/content";
import { formatDate } from "@/lib/utils";


type ArticlePageProps = {
  params: {
    locale: Locale;
    slug: string;
  };
};


export function generateStaticParams() {
  return locales.flatMap((locale) =>
    readArticles(locale).map((article) => ({
      locale,
      slug: article.slug,
    })),
  );
}


export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = readArticle(params.locale, params.slug);

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
      canonical: `/${params.locale}/article/${article.slug}`,
    },
  } satisfies Metadata;
}


export default function ArticlePage({ params }: ArticlePageProps) {
  const article = readArticle(params.locale, params.slug);

  if (!article) {
    notFound();
  }

  const { frontmatter, content, tagsList, publishedAt } = article;
  const t = getDictionary(params.locale);

  return (
    <article className="space-y-8">
      <header className="space-y-4 border-b border-white/10 pb-6">
        <Link
          href={`/${params.locale}/article`}
          className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
        >
          {t.articleDetail.backToArticles}
        </Link>
        <div className="mt-4 space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            {formatDate(publishedAt, params.locale === "ru" ? "ru-RU" : "en-GB")}
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

      <Markdown baseImagePath={`/article/image/${params.slug}/`}>
        {content}
      </Markdown>
    </article>
  );
}
