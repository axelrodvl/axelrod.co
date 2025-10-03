"use client";

import { useEffect, useRef } from "react";

type ViewNamespace = "article" | "project" | "page";

type ViewTrackerProps = {
  namespace: ViewNamespace;
  locale: string;
  slug: string;
};

function buildViewsUrl(namespace: ViewNamespace, locale: string, slug: string) {
  const params = new URLSearchParams({ namespace, locale, slug });
  return `/api/views?${params.toString()}`;
}

export function ViewTracker({ namespace, locale, slug }: ViewTrackerProps) {
  const trackedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const key = `${namespace}:${locale}:${slug}`;

    if (trackedKeyRef.current === key) {
      return undefined;
    }

    trackedKeyRef.current = key;

    const controller = new AbortController();

    fetch(buildViewsUrl(namespace, locale, slug), {
      method: "POST",
      signal: controller.signal,
      keepalive: true,
    }).catch((error) => {
      if (!controller.signal.aborted) {
        console.error("Failed to track view", error);
      }
    });

    return () => {
      controller.abort();
    };
  }, [locale, namespace, slug]);

  return null;
}


