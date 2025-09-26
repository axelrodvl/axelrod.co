import Link from "next/link";

import { readArticles, readProjects } from "@/lib/content";

export default function HomePage() {
  const projects = readProjects();
  const articles = readArticles();

  return (
    <div className="relative bg-[#040609] text-[#e4f1ff]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500/40 via-sky-500/60 to-emerald-500/40" aria-hidden />
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 pb-6 pt-6">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Vadim Axelrod – Software Engineer
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              Building reliable solutions with Java, TypeScript, and modern web platforms. I enjoy
              shipping products, optimizing developer workflows, and writing about engineering practices.
            </p>
          </div>

          <dl className="grid gap-4 text-xs uppercase tracking-[0.3em] text-white/40 sm:text-right">
            <div className="transition hover:text-emerald-300/90">
              <dt>github</dt>
              <dd>
                <a href="https://github.com/axelrodvl" target="_blank" rel="noreferrer" className="text-sm tracking-normal text-white/80">
                  github.com/axelrodvl
                </a>
              </dd>
            </div>
            <div className="transition hover:text-emerald-300/90">
              <dt>e-mail</dt>
              <dd>
                <a href="mailto:vadim@axelrod.co" className="text-sm tracking-normal text-white/80">
                  vadim@axelrod.co
                </a>
              </dd>
            </div>
            <div className="transition hover:text-emerald-300/90">
              <dt>cv</dt>
              <dd>
                <a
                  href="/cv/CV-Axelrod_Vadim.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm tracking-normal text-white/80"
                >
                  CV-Axelrod_Vadim.pdf
                </a>
              </dd>
            </div>
          </dl>
        </header>

        <main className="mt-4 flex flex-1 flex-col gap-12">
          <section className="relative">
            <div className="sticky top-[60px] z-20 flex flex-wrap items-center gap-4 border-b border-white/10 bg-black/60/80 bg-opacity-60 px-6 py-5 backdrop-blur-sm">
              <h2 className="text-xl font-semibold uppercase tracking-[0.4em] text-emerald-300/90 sm:text-2xl">
                Projects
              </h2>
              <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden />
              <Link
                href="/project"
                className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
              >
                View all projects
              </Link>
            </div>
            <ul className="mt-3 grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <li
                  key={project.name}
                  className="group rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(16,185,129,0.05)] transition hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-full flex-col"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {project.description}
                    </p>
                    {project.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-emerald-300/80">
                        {project.tags.map((tag) => (
                          <li
                            key={`${project.name}-${tag}`}
                            className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="relative">
            <div className="sticky top-[60px] z-20 flex flex-wrap items-center gap-4 border-b border-white/10 bg-black/60/80 bg-opacity-60 px-6 py-5 backdrop-blur-sm">
              <h2 className="text-xl font-semibold uppercase tracking-[0.4em] text-emerald-300/90 sm:text-2xl">
                Articles
              </h2>
              <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden />
              <Link
                href="/article"
                className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
              >
                Browse all articles
              </Link>
            </div>
            <ul className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-black/30">
              {articles.map((article) => (
                <li key={article.slug} className="border-b border-white/10 last:border-none">
                  <Link
                    href={`/article/${article.slug}`}
                    className="flex flex-col gap-3 border-white/10 bg-black/40 px-6 py-5 transition hover:border-emerald-400/40 hover:bg-black/60 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-2">
                      <div>
                        <time
                          dateTime={article.publishedAt.toISOString()}
                          className="text-xs font-medium uppercase tracking-[0.3em] text-white/40"
                        >
                          {article.date}
                        </time>
                        <h3 className="mt-1 text-lg font-semibold text-white">
                          {article.title}
                        </h3>
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
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

