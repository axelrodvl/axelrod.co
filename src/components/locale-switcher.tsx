"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

function buildLocalizedPath(pathname: string | null, locale: Locale): string {
  if (!pathname || pathname === "/") {
    return `/${locale}`;
  }

  const segments = pathname
    .split("/")
    .filter(Boolean);

  if (segments.length === 0) {
    return `/${locale}`;
  }

  if (locales.includes(segments[0] as Locale)) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  return `/${segments.join("/")}`;
}

type LocaleSwitcherProps = {
  activeLocale: Locale;
};

export function LocaleSwitcher({ activeLocale }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams?.toString();

  return (
    <nav className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/40">
      {locales.map((locale) => {
        const href = buildLocalizedPath(pathname, locale as Locale);
        const isActive = locale === activeLocale;
        const fullHref = queryString ? `${href}?${queryString}` : href;

        return (
          <Link
            key={locale}
            href={fullHref}
            className={`transition hover:text-emerald-300/90 ${isActive ? "text-emerald-200" : "text-white/40"}`}
            prefetch={false}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}


