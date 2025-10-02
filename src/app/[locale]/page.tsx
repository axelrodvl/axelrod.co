import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { readArticles, readProjects } from "@/lib/content";
import { getArticleLikes, getProjectLikes } from "@/lib/likes";
import { formatDate } from "@/lib/utils";
import { LikeButton } from "@/components/like-button";
import { LlmTags } from "@/components/llm-tags";

type HomePageProps = {
  params: {
    locale: Locale;
  };
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = params;
  const t = getDictionary(locale);
  const projectEntries = readProjects(locale).slice(0, 6);
  const articleEntries = readArticles(locale).slice(0, 6);

  const [projects, articles] = await Promise.all([
    Promise.all(
      projectEntries.map(async (project) => ({
        ...project,
        likes: await getProjectLikes(locale, project.slug),
      })),
    ),
    Promise.all(
      articleEntries.map(async (article) => ({
        ...article,
        likes: await getArticleLikes(locale, article.slug),
      })),
    ),
  ]);

  return (
    <div className="relative bg-[#040609] text-[#e4f1ff]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500/40 via-sky-500/60 to-emerald-500/40" aria-hidden />
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col pb-6 pt-6">
        <header className="flex flex-col gap-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              {t.home.heroTitle}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              {t.home.heroSubtitle}
            </p>
          </div>

          <dl className="grid gap-4 text-xs uppercase tracking-[0.3em] text-white/40 sm:text-right">
            <div className="transition hover:text-emerald-300/90">
              <dt>{t.home.contacts.github}</dt>
              <dd>
                <a href="https://github.com/axelrodvl" target="_blank" rel="noreferrer" className="text-sm tracking-normal text-white/80">
                  github.com/axelrodvl
                </a>
              </dd>
            </div>
            <div className="transition hover:text-emerald-300/90">
              <dt>{t.home.contacts.email}</dt>
              <dd>
                <a href="mailto:vadim@axelrod.co" className="text-sm tracking-normal text-white/80">
                  vadim@axelrod.co
                </a>
              </dd>
            </div>
            <div className="transition hover:text-emerald-300/90">
              <dt>{t.home.contacts.cv}</dt>
              <dd>
                <a
                  href="/cv/CV-Vadim_Axelrod.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm tracking-normal text-white/80"
                >
                  CV-Vadim_Axelrod.pdf
                </a>
              </dd>
            </div>            
          </dl>
        </header>

        <main className="mt-4 flex flex-1 flex-col gap-12">
          <Link
            href={`/${locale}/llm-disclosure`}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-emerald-400/40 bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-purple-500/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-white/80 transition hover:scale-[1.01] hover:border-emerald-300/60 hover:text-emerald-100"
          >
            <span className="relative z-10 flex items-center gap-3 leading-none transition group-hover:text-white px-3 py-1">
              <span className="tracking-normal text-center">
                {t.home.llmPolicyBanner}
              </span>
            </span>
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/30 via-sky-500/30 to-purple-500/30 opacity-0 transition group-hover:opacity-100" aria-hidden />
          </Link>
          <section className="relative">
            <div className="sticky top-[60px] z-20 flex flex-wrap items-center gap-4 border-b border-white/10 bg-black/60/80 bg-opacity-60 px-6 py-5 backdrop-blur-sm">
              <h2 className="text-xl font-semibold uppercase tracking-[0.4em] text-emerald-300/90 sm:text-2xl">
                {t.home.sections.projects.title}
              </h2>
              <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden />
              <Link
                href={`/${locale}/project`}
                className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
              >
                {t.home.sections.projects.cta}
              </Link>
            </div>
            <ul className="mt-3 grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <li
                  key={project.name}
                  className="group rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(16,185,129,0.05)] transition hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                >
                  <div className="flex h-full flex-col">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 flex-col"
                    >
                      <h3 className="text-lg font-semibold text-white">
                        {project.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/60">
                        {project.description}
                      </p>
                    </a>
                    {(() => {
                      const llmTags = locale === "ru" ? project.llmTagsTranslated : project.llmTags;
                      const hasAny = llmTags.length > 0 || project.tags.length > 0;

                      if (!hasAny) {
                        return null;
                      }

                      return (
                        <div className="mt-4">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide">
                            <LikeButton
                              namespace="project"
                              locale={locale}
                              slug={project.slug}
                              variant="compact"
                              wrapper="span"
                              initialLikes={project.likes}
                            />
                            <LlmTags locale={locale} tags={llmTags} entityId={project.slug} wrapper="span" />
                            {project.tags.map((tag) => (
                              <span
                                key={`${project.name}-${tag}`}
                                className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-emerald-300/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="relative">
            <div className="sticky top-[60px] z-20 flex flex-wrap items-center gap-4 border-b border-white/10 bg-black/60/80 bg-opacity-60 px-6 py-5 backdrop-blur-sm">
              <h2 className="text-xl font-semibold uppercase tracking-[0.4em] text-emerald-300/90 sm:text-2xl">
                {t.home.sections.articles.title}
              </h2>
              <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden />
              <Link
                href={`/${locale}/article`}
                className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
              >
                {t.home.sections.articles.cta}
              </Link>
            </div>
            <ul className="mt-3 space-y-5">
              {articles.map((article) => (
                <li key={article.slug}>
                  <div className="group rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(16,185,129,0.05)] transition hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                    <Link
                      href={`/${locale}/article/${article.slug}`}
                      className="block"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                          <div>
                            <time
                              dateTime={article.publishedAt.toISOString()}
                              className="text-xs font-medium uppercase tracking-[0.3em] text-white/40"
                            >
                              {formatDate(article.publishedAt, locale === "ru" ? "ru-RU" : "en-GB")}
                            </time>
                            <h3 className="mt-1 text-lg font-semibold text-white">
                              {article.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                    {(() => {
                      const llmTags = locale === "ru" ? article.llmTagsTranslated : article.llmTags;
                      const hasAny = llmTags.length > 0 || article.tagsList.length > 0;

                      if (!hasAny) {
                        return null;
                      }

                      return (
                        <div className="mt-3">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide">
                            <LikeButton
                              namespace="article"
                              locale={locale}
                              slug={article.slug}
                              variant="compact"
                              wrapper="span"
                              initialLikes={article.likes}
                            />
                            <LlmTags locale={locale} tags={llmTags} entityId={article.slug} wrapper="span" />
                            {article.tagsList.map((tag) => (
                              <span
                                key={`${article.slug}-${tag}`}
                                className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-emerald-300/80"
                              >
                                {tag.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

