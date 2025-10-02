import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { readArticles, readProjects } from "@/lib/content";

const BASE_URL = "https://axelrod.co";

function buildUrl(...segments: Array<string | undefined>): string {
  const path = segments
    .filter(Boolean)
    .map((segment) => segment!.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");

  return path ? `${BASE_URL}/${path}` : BASE_URL;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: buildUrl(),
      lastModified: now,
      changeFrequency: "weekly",
    },
  ];

  for (const locale of locales) {
    const articles = readArticles(locale);
    const projects = readProjects(locale);
    const latestArticleDate = articles.reduce<Date | undefined>((latest, article) => {
      if (!latest) {
        return article.publishedAt;
      }

      return article.publishedAt > latest ? article.publishedAt : latest;
    }, undefined);

    const latestContentUpdate = latestArticleDate ?? now;

    entries.push(
      {
        url: buildUrl(locale),
        lastModified: latestContentUpdate,
        changeFrequency: "weekly",
      },
      {
        url: buildUrl(locale, "article"),
        lastModified: latestContentUpdate,
        changeFrequency: "weekly",
      },
      {
        url: buildUrl(locale, "project"),
        lastModified: projects.length > 0 ? now : latestContentUpdate,
        changeFrequency: "monthly",
      },
      {
        url: buildUrl(locale, "llm-disclosure"),
        lastModified: now,
        changeFrequency: "yearly",
      },
    );

    for (const article of articles) {
      entries.push({
        url: buildUrl(locale, "article", article.slug),
        lastModified: article.publishedAt,
        changeFrequency: "monthly",
      });
    }
  }

  return entries;
}


