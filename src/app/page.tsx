import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { readArticles, readProjects } from "@/lib/content";

export default function HomePage() {
  const projects = readProjects();
  const articles = readArticles();

  return (
    <div className="bg-neutral-50 text-neutral-900">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 pb-16 pt-12 sm:px-10">
        <header className="flex flex-col gap-6 border-b border-neutral-200 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Vadim Axelrod – Software Engineer
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600">
              Building reliable solutions with TypeScript, Java, and modern web
              platforms. I enjoy shipping products, optimizing developer
              workflows, and writing about engineering practices.
            </p>
          </div>

          <dl className="grid gap-4 text-sm text-neutral-600 sm:text-right">
            <div>
              <dt className="font-medium text-neutral-900">GitHub</dt>
              <dd>
                <a
                  href="https://github.com/axelrodvl"
                  className="text-blue-600 transition hover:text-blue-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/axelrodvl
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Email</dt>
              <dd>
                <a
                  href="mailto:vadim@axelrod.co"
                  className="text-blue-600 transition hover:text-blue-500"
                >
                  vadim@axelrod.co
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">CV</dt>
              <dd>
                <a
                  href="/cv/CV-Axelrod_Vadim.pdf"
                  className="text-blue-600 transition hover:text-blue-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download PDF
                </a>
              </dd>
            </div>
          </dl>
        </header>

        <main className="mt-12 flex flex-1 flex-col gap-16">
          <section>
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Projects
              </h2>
              <span className="hidden h-px flex-1 bg-neutral-200 sm:block" aria-hidden />
              <Link
                href="/project"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-500"
              >
                View all projects
              </Link>
            </div>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <li
                  key={project.name}
                  className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-full flex-col"
                  >
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {project.description}
                    </p>
                    {project.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-blue-700">
                        {project.tags.map((tag) => (
                          <li
                            key={`${project.name}-${tag}`}
                            className="rounded-full bg-blue-50 px-3 py-1"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="mt-auto pt-6 text-sm font-semibold text-blue-600 transition group-hover:text-blue-500">
                      Visit project →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Articles
              </h2>
              <span className="hidden h-px flex-1 bg-neutral-200 sm:block" aria-hidden />
              <Link
                href="/article"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-500"
              >
                Browse all articles
              </Link>
            </div>
            <ul className="mt-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white">
              {articles.map((article) => (
                <li key={article.slug} className="border-b border-neutral-200 last:border-none">
                  <Link
                    href={`/article/${article.slug}`}
                    className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {article.title}
                      </h3>
                      {article.tagsList.length > 0 && (
                        <ul className="mt-2 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-blue-700">
                          {article.tagsList.map((tag) => (
                            <li
                              key={`${article.slug}-${tag}`}
                              className="rounded-full bg-blue-50 px-3 py-1"
                            >
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
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <footer className="mt-20 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Vadim Axelrod. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

