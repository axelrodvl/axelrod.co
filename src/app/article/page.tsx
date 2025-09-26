import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { readArticles } from "@/lib/content";

export const metadata = {
  title: "Articles — Vadim Axelrod",
  description:
    "Long-form writing by software engineer Vadim Axelrod on technology, engineering practices, and side projects.",
};

export default function ArticlesPage() {
  const articles = readArticles();

  return (
    <div className="space-y-10">
      <header className="border-b border-neutral-200 pb-8">
        <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          ← Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Articles
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
          Stories and engineering notes from the projects I build and the systems
          I maintain. Everything is written in plain Markdown and rendered on the fly.
        </p>
      </header>

      <main>
        <ul className="space-y-6">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/article/${article.slug}`}
                className="group block rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-neutral-300 hover:shadow-lg"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-neutral-900">
                      {article.title}
                    </h2>
                    {article.tagsList.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-blue-700">
                        {article.tagsList.map((tag) => (
                          <li key={`${article.slug}-${tag}`} className="rounded-full bg-blue-50 px-3 py-1">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <time
                    dateTime={article.date}
                    className="text-sm font-medium text-neutral-500"
                  >
                    {formatDate(article.publishedAt)}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

