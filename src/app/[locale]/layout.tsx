import Link from "next/link";
import type { ReactNode } from "react";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <div className="bg-[#040609] text-[#e4f1ff]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60/80 bg-opacity-60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5 text-[#e4f1ff]">
          <Link
            href={`/${locale}`}
            className="text-sm font-semibold uppercase tracking-[0.6em] text-emerald-200 transition hover:text-emerald-100"
          >
            {dictionary.header.title}
          </Link>
          <LocaleSwitcher activeLocale={locale} />
        </div>
      </header>
      <main className="relative z-10">
        <div className="mx-auto min-h-screen max-w-4xl px-6 pb-6 pt-6">
          {children}
        </div>
      </main>
      <footer className="relative z-10 border-t border-white/10 bg-black/60/80 bg-opacity-60 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6 py-6 text-[10px] uppercase tracking-[0.4em] text-white/40">
          <p>© {new Date().getFullYear()} {dictionary.footer.name}</p>
          <p className="mt-2 text-white/30">{dictionary.footer.tagline}</p>
          <p className="mt-2 text-white/30">{dictionary.footer.tagline2}</p>
        </div>
      </footer>
    </div>
  );
}

