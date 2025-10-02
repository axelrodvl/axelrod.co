import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { readProjects } from "@/lib/content";
import { getProjectLikes } from "@/lib/likes";
import ProjectsClient from "./projects-client";

type ProjectsPageProps = {
  params: {
    locale: Locale;
  };
  searchParams?: {
    tag?: string | string[];
  };
};

export default async function ProjectsPage({ params, searchParams }: ProjectsPageProps) {
  const { locale } = params;
  const t = getDictionary(locale);
  const projectEntries = readProjects(locale);
  const projects = await Promise.all(
    projectEntries.map(async (project) => ({
      name: project.name,
      link: project.link,
      description: project.description,
      slug: project.slug,
      tags: project.tags,
      llmTags: project.llmTags,
      llmTagsTranslated: project.llmTagsTranslated,
      likes: await getProjectLikes(locale, project.slug),
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
          {t.projects.backToHome}
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {t.projects.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
          {t.projects.description}
        </p>
      </header>

      <ProjectsClient
        locale={locale}
        projects={projects}
        initialTag={initialTag}
        labels={{
          stickyTitle: t.projects.stickyTitle,
          backToHome: t.projects.backToHome,
          tagCloudTitle: t.projects.tagCloudTitle,
          tagCloudAll: t.projects.tagCloudAll,
        }}
        homeHref={`/${locale}`}
      />
    </div>
  );
}

