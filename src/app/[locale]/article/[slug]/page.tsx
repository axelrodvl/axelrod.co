import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Locale } from "@/lib/i18n";
import { getDictionary, locales } from "@/lib/i18n";
import { Markdown } from "@/components/markdown";
import { LikeButton } from "@/components/like-button";
import { LlmTags } from "@/components/llm-tags";
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

  const articles = readArticles(params.locale);
  const currentIndex = articles.findIndex((item) => item.slug === params.slug);
  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : undefined;
  const nextArticle = currentIndex !== -1 && currentIndex < articles.length - 1 ? articles[currentIndex + 1] : undefined;

  const { frontmatter, content, tagsList, llmTagsTranslated, publishedAt } = article;
  const t = getDictionary(params.locale);

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-4 pb-6">
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
        {(tagsList.length > 0 || llmTagsTranslated.length > 0) && (
          <ul className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide">
            <LikeButton
              namespace="article"
              locale={params.locale}
              slug={params.slug}
              variant="compact"
              wrapper="li"
            />
            <LlmTags
              locale={params.locale}
              tags={llmTagsTranslated}
              entityId={params.slug}
              wrapper="li"
              linkClassName="block"
            />
            {tagsList.map((tag) => (
              <li
                key={`${params.slug}-${tag}`}
                className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-emerald-300/80"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <Markdown baseImagePath={`/article/image/${params.slug}/`}>
        {content}
      </Markdown>

      <LikeButton
        namespace="article"
        locale={params.locale}
        slug={params.slug}
        className="mt-8 flex justify-center"
      />

      {(previousArticle || nextArticle) && (
        <nav className="mt-6 grid gap-4 pt-8 sm:grid-cols-2">        
          {nextArticle && (
            <Link
              href={`/${params.locale}/article/${nextArticle.slug}`}
              className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/40 p-6 transition hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]"
            >
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 group-hover:text-emerald-300/90">
                {t.articleDetail.nextArticle}
              </span>
              <div className="space-y-3">
                <time
                  dateTime={nextArticle.publishedAt.toISOString()}
                  className="text-xs font-medium uppercase tracking-[0.3em] text-white/40"
                >
                  {formatDate(nextArticle.publishedAt, params.locale === "ru" ? "ru-RU" : "en-GB")}
                </time>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {nextArticle.title}
                </h3>
                {(nextArticle.tagsList.length > 0 || nextArticle.llmTagsTranslated.length > 0) && (
                  <ul className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide">
                    <LlmTags
                      locale={params.locale}
                      tags={nextArticle.llmTagsTranslated}
                      entityId={nextArticle.slug}
                      wrapper="li"
                      linkClassName="block"
                    />
                    {nextArticle.tagsList.map((tag) => (
                      <li
                        key={`${nextArticle.slug}-${tag}`}
                        className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-emerald-300/80"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          )}
          {previousArticle && (
            <Link
              href={`/${params.locale}/article/${previousArticle.slug}`}
              className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/40 p-6 transition hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]"
            >
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 group-hover:text-emerald-300/90">
                {t.articleDetail.previousArticle}
              </span>
              <div className="space-y-3">
                <time
                  dateTime={previousArticle.publishedAt.toISOString()}
                  className="text-xs font-medium uppercase tracking-[0.3em] text-white/40"
                >
                  {formatDate(previousArticle.publishedAt, params.locale === "ru" ? "ru-RU" : "en-GB")}
                </time>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {previousArticle.title}
                </h3>
                {(previousArticle.tagsList.length > 0 || previousArticle.llmTagsTranslated.length > 0) && (
                  <ul className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide">
                    <LlmTags
                      locale={params.locale}
                      tags={previousArticle.llmTagsTranslated}
                      entityId={previousArticle.slug}
                      wrapper="li"
                      linkClassName="block"
                    />
                    {previousArticle.tagsList.map((tag) => (
                      <li
                        key={`${previousArticle.slug}-${tag}`}
                        className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-emerald-300/80"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
