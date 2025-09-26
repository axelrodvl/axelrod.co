import Link from "next/link";

import { readProjects } from "@/lib/content";

export const metadata = {
  title: "Projects — Vadim Axelrod",
  description:
    "A selection of projects delivered by software engineer Vadim Axelrod, covering web platforms, automation, and integrations.",
};

export default function ProjectsPage() {
  const projects = readProjects();

  return (
    <div className="bg-neutral-50 text-neutral-900">
      <div className="mx-auto min-h-screen max-w-4xl px-6 pb-16 pt-12 sm:px-10">
        <header className="border-b border-neutral-200 pb-10">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            ← Back to home
          </Link>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            A mix of client work and personal initiatives spanning product development, integrations,
            and tooling across the web, mobile, and backend ecosystems.
          </p>
        </header>

        <main className="mt-10 space-y-6">
          {projects.map((project) => (
            <article
              key={project.name}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-neutral-300 hover:shadow-lg"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-4"
              >
                <header>
                  <h2 className="text-xl font-semibold text-neutral-900">
                    {project.name}
                  </h2>
                </header>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {project.description}
                </p>
                {project.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-blue-700">
                    {project.tags.map((tag) => (
                      <li key={`${project.name}-${tag}`} className="rounded-full bg-blue-50 px-3 py-1">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="text-sm font-semibold text-blue-600 transition group-hover:text-blue-500">
                  Visit project →
                </span>
              </a>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}

