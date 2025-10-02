"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { LikeButton } from "@/components/like-button";
import { LlmTags } from "@/components/llm-tags";

type ProjectSummary = {
  name: string;
  link: string;
  description: string;
  slug: string;
  tags: string[];
  llmTags: string[];
  llmTagsTranslated: string[];
  likes: number;
};

type ProjectsClientProps = {
  locale: string;
  projects: ProjectSummary[];
  initialTag?: string;
  labels: {
    stickyTitle: string;
    backToHome: string;
    tagCloudTitle: string;
    tagCloudAll: string;
  };
  homeHref: string;
};

export default function ProjectsClient({
  locale,
  projects,
  initialTag,
  labels,
  homeHref,
}: ProjectsClientProps) {
  const pathname = usePathname();
  const search = useSearchParams();
  const paramTag = search.get("tag") ?? initialTag;
  const normalizedParamTag = typeof paramTag === "string" ? paramTag : undefined;
  const [selectedTag, setSelectedTag] = useState<string | undefined>(normalizedParamTag);

  useEffect(() => {
    setSelectedTag((prev) => (prev === normalizedParamTag ? prev : normalizedParamTag));
  }, [normalizedParamTag]);

  const tagCounts = useMemo(
    () =>
      projects.reduce<Map<string, number>>((acc, project) => {
        project.tags.forEach((tag) => {
          acc.set(tag, (acc.get(tag) ?? 0) + 1);
        });
        return acc;
      }, new Map()),
    [projects],
  );

  const tagChipBaseClass =
    "rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 transition";

  const tags = useMemo(
    () =>
      Array.from(tagCounts.entries())
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => {
          if (b.count !== a.count) {
            return b.count - a.count;
          }
          return a.tag.localeCompare(b.tag, locale === "ru" ? "ru" : "en", {
            sensitivity: "base",
          });
        }),
    [tagCounts, locale],
  );

  const filteredProjects = useMemo(
    () =>
      selectedTag ? projects.filter((project) => project.tags.includes(selectedTag)) : projects,
    [projects, selectedTag],
  );

  const handleTagSelect = useCallback(
    (tag?: string) => {
      setSelectedTag(tag);

      if (typeof window === "undefined") {
        return;
      }

      const next = new URLSearchParams(window.location.search);

      if (!tag) {
        next.delete("tag");
      } else {
        next.set("tag", tag);
      }

      const query = next.toString();
      const nextUrl = query ? `${pathname}?${query}` : pathname;
      window.history.replaceState(window.history.state, "", nextUrl);
    },
    [pathname],
  );

  return (
    <main>
      <div className="sticky top-[60px] z-20 mb-4 border-b border-white/10 bg-black/60/80 bg-opacity-60 px-6 py-5 backdrop-blur-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold uppercase tracking-[0.4em] text-emerald-300/90 sm:text-2xl">
              {labels.stickyTitle}
            </h2>
          </div>
          <Link
            href={homeHref}
            className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
          >
            {labels.backToHome}
          </Link>
        </div>
      </div>
      {tags.length > 0 && (
        <div className="mb-8 space-y-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
              {labels.tagCloudTitle}
            </span>
            {selectedTag && filteredProjects.length === 0 && (
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-rose-300/80">
                {selectedTag}
              </span>
            )}
          </div>
          <ul className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-emerald-300/80">
            <li>
              <button
                type="button"
                onClick={() => handleTagSelect()}
                className={`${tagChipBaseClass} ${
                  selectedTag
                    ? "text-emerald-300/70 hover:border-emerald-300/60 hover:text-emerald-200"
                    : "border-emerald-300/70 bg-emerald-500/20 text-emerald-200"
                }`}
              >
                {labels.tagCloudAll}
              </button>
            </li>
            {tags.map(({ tag }) => (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => handleTagSelect(tag)}
                  className={`${tagChipBaseClass} ${
                    selectedTag === tag
                      ? "border-emerald-300/70 bg-emerald-500/20 text-emerald-200"
                      : "text-emerald-300/70 hover:border-emerald-300/60 hover:text-emerald-200"
                  }`}
                >
                  {tag.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedTag && filteredProjects.length === 0 && (
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white/40">
          {labels.tagCloudTitle}: {selectedTag}
        </p>
      )}
      <ul className="space-y-5">
        {filteredProjects.map((project) => (
          <li key={project.name}>
            <div className="group rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(16,185,129,0.05)] transition hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-white">{project.name}</h2>
                    <p className="text-sm leading-relaxed text-white/60">{project.description}</p>
                  </div>
                </div>
              </a>
              {(() => {
                const llmTags = locale === "ru" ? project.llmTagsTranslated : project.llmTags;
                const hasAny = llmTags.length > 0 || project.tags.length > 0;

                if (!hasAny) {
                  return null;
                }

                return (
                  <div className="mt-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      <LikeButton
                        namespace="project"
                        locale={locale}
                        slug={project.slug}
                        variant="compact"
                        wrapper="span"
                        initialLikes={project.likes}
                      />
                      <LlmTags locale={locale} tags={llmTags} entityId={project.slug} />
                      {project.tags.map((tag) => (
                        <span
                          key={`${project.slug}-${tag}`}
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
    </main>
  );
}


