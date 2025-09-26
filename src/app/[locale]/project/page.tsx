import Link from "next/link";

import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { readProjects } from "@/lib/content";

type ProjectsPageProps = {
  params: {
    locale: Locale;
  };
};

export default function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = params;
  const t = getDictionary(locale);
  const projects = readProjects(locale);

  return (
    <div className="space-y-10">
      <header className="border-b border-white/10 pb-8">
        <Link
          href={`/${locale}`}
          className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
        >
          {t.projects.backToHome}
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {t.projects.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
          {t.projects.description}
        </p>
      </header>

      <main>
        <div className="sticky top-[60px] z-20 mb-4 border-b border-white/10 bg-black/60/80 bg-opacity-60 px-6 py-5 backdrop-blur-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold uppercase tracking-[0.4em] text-emerald-300/90 sm:text-2xl">
                {t.projects.stickyTitle}
              </h2>
            </div>
            <Link
              href={`/${locale}`}
              className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
            >
              {t.projects.backToHome}
            </Link>
          </div>
        </div>

        <ul className="space-y-5">
          {projects.map((project) => (
            <li key={project.name}>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(16,185,129,0.05)] transition hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-white">
                      {project.name}
                    </h2>
                    <p className="text-sm leading-relaxed text-white/60">
                      {project.description}
                    </p>
                    {project.tags.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-emerald-300/80">
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
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

