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
    <div className="bg-[#040609] text-[#e4f1ff]">
      <div className="mx-auto min-h-screen max-w-4xl px-6 pb-16 pt-14 sm:px-12">
        <header className="border-b border-white/10 pb-10">
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
          >
            ← Back to home
          </Link>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            A mix of client work and personal initiatives spanning product development, integrations,
            and tooling across the web, mobile, and backend ecosystems.
          </p>
        </header>

        <main className="mt-10 space-y-6">
          {projects.map((project) => (
            <article
              key={project.name}
              className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(16,185,129,0.05)] transition hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-4"
              >
                <header>
                  <h2 className="text-xl font-semibold text-white">
                    {project.name}
                  </h2>
                </header>
                <p className="text-sm leading-relaxed text-white/60">
                  {project.description}
                </p>
                {project.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-emerald-300/80">
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
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}

