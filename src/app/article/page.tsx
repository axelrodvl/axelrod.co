import Link from "next/link";

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
      <header className="border-b border-white/10 pb-8">
        <Link
          href="/"
          className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
        >
          ← Back to home
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Articles
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
          Stories and engineering notes from the projects I build and the systems
          I maintain. Everything is written in plain Markdown and rendered on the fly.
        </p>
      </header>

      <main>
        <div className="sticky top-[60px] z-20 mb-4 border-b border-white/10 bg-black/60/80 bg-opacity-60 px-6 py-5 backdrop-blur-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold uppercase tracking-[0.4em] text-emerald-300/90 sm:text-2xl">
                Articles
              </h1>
            </div>
            <Link
              href="/"
              className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
            >
              ← Back to home
            </Link>
          </div>
        </div>
        <ul className="space-y-5">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/article/${article.slug}`}
                className="group block rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(16,185,129,0.05)] transition hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <div>
                      <time
                        dateTime={article.publishedAt.toISOString()}
                        className="text-xs font-medium uppercase tracking-[0.3em] text-white/40"
                      >
                        {article.date}
                      </time>
                      <h2 className="mt-1 text-lg font-semibold text-white">
                        {article.title}
                      </h2>
                    </div>
                    {article.tagsList.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-emerald-300/80">
                        {article.tagsList.map((tag) => (
                          <li
                            key={`${article.slug}-${tag}`}
                            className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>                  
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

