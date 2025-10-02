import Link from "next/link";

import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { readArticles } from "@/lib/content";
import { getArticleLikes } from "@/lib/likes";
import ArticlesClient from "./articles-client";

type ArticlesPageProps = {
  params: {
    locale: Locale;
  };
  searchParams?: {
    tag?: string | string[];
  };
};

export default async function ArticlesPage({ params, searchParams }: ArticlesPageProps) {
  const { locale } = params;
  const t = getDictionary(locale);
  const articleEntries = readArticles(locale);
  const articles = await Promise.all(
    articleEntries.map(async (article) => ({
      slug: article.slug,
      title: article.title,
      tagsList: article.tagsList,
      publishedAt: article.publishedAt.toISOString(),
      llmTags: article.llmTags,
      llmTagsTranslated: article.llmTagsTranslated,
      likes: await getArticleLikes(locale, article.slug),
    })),
  );
  const initialTag = typeof searchParams?.tag === "string" ? searchParams.tag : undefined;

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header className="border-b border-white/10 pb-8">
        <Link
          href={`/${locale}`}
          className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
        >
          {t.articles.backToHome}
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {t.articles.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
          {t.articles.description}
        </p>
      </header>

      <ArticlesClient
        locale={locale}
        articles={articles}
        initialTag={initialTag}
        labels={{
          stickyTitle: t.articles.stickyTitle,
          backToHome: t.articles.backToHome,
          tagCloudTitle: t.articles.tagCloudTitle,
          tagCloudAll: t.articles.tagCloudAll,
        }}
        homeHref={`/${locale}`}
      />
    </div>
  );
}

