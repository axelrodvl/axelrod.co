"use client";

import { useEffect, useMemo, useState } from "react";

import { getDictionary, isLocale } from "@/lib/i18n";

type ViewNamespace = "article" | "project" | "page";

type ViewCounterProps = {
  namespace: ViewNamespace;
  locale: string;
  slug: string;
  className?: string;
  wrapper?: keyof JSX.IntrinsicElements;
};

type ViewResponse = {
  views: number;
};

function buildViewsUrl(namespace: ViewNamespace, locale: string, slug: string) {
  const params = new URLSearchParams({ namespace, locale, slug });
  return `/api/views?${params.toString()}`;
}

export function ViewCounter({
  namespace,
  locale,
  slug,
  className,
  wrapper = "div",
}: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dictionaryLocale = isLocale(locale) ? locale : "en";
  const dictionary = getDictionary(dictionaryLocale);

  const formatLocale = useMemo(() => (dictionaryLocale === "ru" ? "ru-RU" : "en-GB"), [dictionaryLocale]);
  const viewLabel = useMemo(() => {
    if (dictionaryLocale !== "ru" || views == null) {
      return dictionary.viewCounter.label;
    }

    const lastTwoDigits = Math.abs(views) % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return "просмотров";
    }

    const lastDigit = lastTwoDigits % 10;

    if (lastDigit === 1) {
      return "просмотр";
    }

    if ([2, 3, 4].includes(lastDigit)) {
      return "просмотра";
    }

    return "просмотров";
  }, [dictionaryLocale, dictionary.viewCounter.label, views]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(buildViewsUrl(namespace, locale, slug), {
      method: "GET",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch views: ${response.status}`);
        }

        const data = (await response.json()) as ViewResponse;
        setViews(data.views);
        setError(null);
      })
      .catch((fetchError) => {
        if (controller.signal.aborted) {
          return;
        }

        console.error(fetchError);
        setError(dictionary.viewCounter.error);
      });

    return () => {
      controller.abort();
    };
  }, [dictionary.viewCounter.error, dictionaryLocale, locale, namespace, slug]);

  const Wrapper = wrapper as keyof JSX.IntrinsicElements;

  if (error) {
    return (
      <Wrapper className={className}>
        <span className="text-xs uppercase tracking-[0.3em] text-rose-300/80">{error}</span>
      </Wrapper>
    );
  }

  if (views == null) {
    return (
      <Wrapper className={className}>
        <span className="text-xs uppercase tracking-[0.3em] text-white/40">…</span>
      </Wrapper>
    );
  }

  return (
    <Wrapper className={className}>
      <span className="text-xs uppercase tracking-[0.3em] text-white/60">
        {views.toLocaleString(formatLocale)} {viewLabel}
      </span>
    </Wrapper>
  );
}


