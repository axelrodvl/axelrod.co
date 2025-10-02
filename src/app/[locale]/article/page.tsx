import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { readArticles } from "@/lib/content";
import { getArticleLikes } from "@/lib/likes";
import { PageHeader } from "@/components/page-header";
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
      <PageHeader
        backHref={`/${locale}`}
        backLabel={t.articles.backToHome}
        title={t.articles.title}
        description={t.articles.description}
      />

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

