import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { readProjects } from "@/lib/content";
import { getProjectLikes } from "@/lib/likes";
import { PageHeader } from "@/components/page-header";
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
      <PageHeader
        backHref={`/${locale}`}
        backLabel={t.projects.backToHome}
        title={t.projects.title}
        description={t.projects.description}
      />

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

