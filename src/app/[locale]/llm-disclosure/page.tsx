import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";

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
      <PageHeader
        backHref={`/${locale}`}
        backLabel={disclosure.backToHome}
        title={disclosure.title}
        description={disclosure.intro}
        titleClassName="text-3xl font-semibold text-white"
        contentClassName="mt-4 space-y-4"
      />

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

