import Link from "next/link";
import type { ReactNode } from "react";

import type { Locale } from "@/lib/i18n";
import { getDictionary, locales } from "@/lib/i18n";

type LocaleLayoutProps = {
  children: ReactNode;
  params: {
    locale: Locale;
  };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = params;
  const t = getDictionary(locale);

  return (
    <div className="bg-[#040609] text-[#e4f1ff]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60/80 bg-opacity-60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 text-[#e4f1ff]">
          <Link
            href={`/${locale}`}
            className="text-sm font-semibold uppercase tracking-[0.6em] text-emerald-200 transition hover:text-emerald-100"
          >
            {t.header.title}
          </Link>
          <nav className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/40">
            {locales.map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                className={`transition hover:text-emerald-300/90 ${code === locale ? "text-emerald-200" : "text-white/40"}`}
              >
                {code}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="relative z-10">
        <div className="mx-auto min-h-screen max-w-5xl px-6 pb-6 pt-6">
          {children}
        </div>
      </main>
      <footer className="relative z-10 border-t border-white/10 bg-black/60/80 bg-opacity-60 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 py-6 text-[10px] uppercase tracking-[0.4em] text-white/40">
          <p>© {new Date().getFullYear()} Vadim Axelrod</p>
          <p className="mt-2 text-white/30">{t.footer.tagline}</p>
        </div>
      </footer>
    </div>
  );
}

