import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

type LlmDisclosurePageProps = {
  params: {
    locale: Locale;
  };
};

export default function LlmDisclosurePage({ params }: LlmDisclosurePageProps) {
  const { locale } = params;
  const dictionary = getDictionary(locale);
  const disclosure = dictionary.llmDisclosure;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 mb-4 text-white/90">
      <header>
        <Link
          href={`/${locale}`}
          className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
        >
          {disclosure.backToHome}
        </Link>
        <div className="mt-4 space-y-4">
          <h1 className="text-3xl font-semibold text-white">{disclosure.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">{disclosure.intro}</p>
        </div>
      </header>

      <section className="space-y-4">
        <ul className="space-y-4">
          {disclosure.items.map((item) => (
            <li
              key={item.label}
              className="rounded-3xl border border-white/10 bg-black/40 p-5 shadow-[0_0_30px_rgba(16,185,129,0.08)]"
            >
              <div className="text-lg font-semibold text-white">{item.label}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

