"use client";

import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";

type LikeNamespace = "article" | "project";

type WrapperElement = keyof JSX.IntrinsicElements;

type LikeButtonProps = {
  namespace: LikeNamespace;
  locale: string;
  slug: string;
  className?: string;
  variant?: "compact" | "default";
  wrapper?: WrapperElement;
};

type LikeResponse = {
  likes: number;
};

function buildLikesUrl(namespace: LikeNamespace, locale: string, slug: string) {
  const params = new URLSearchParams({ namespace, locale, slug });
  return `/api/likes?${params.toString()}`;
}

async function fetchLikes(namespace: LikeNamespace, locale: string, slug: string, signal?: AbortSignal) {
  const response = await fetch(buildLikesUrl(namespace, locale, slug), { method: "GET", signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch likes: ${response.status}`);
  }

  const data = (await response.json()) as LikeResponse;
  return data.likes;
}

async function postLike(namespace: LikeNamespace, locale: string, slug: string, signal?: AbortSignal) {
  const response = await fetch(buildLikesUrl(namespace, locale, slug), { method: "POST", signal });

  if (!response.ok) {
    throw new Error(`Failed to update likes: ${response.status}`);
  }

  const data = (await response.json()) as LikeResponse;
  return data.likes;
}

async function deleteLike(namespace: LikeNamespace, locale: string, slug: string, signal?: AbortSignal) {
  const response = await fetch(buildLikesUrl(namespace, locale, slug), { method: "DELETE", signal });

  if (!response.ok) {
    throw new Error(`Failed to remove like: ${response.status}`);
  }

  const data = (await response.json()) as LikeResponse;
  return data.likes;
}

export function LikeButton({ namespace, locale, slug, className, variant = "default", wrapper = "div" }: LikeButtonProps) {
  const [likes, setLikes] = useState<number | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);

  const storageKey = useMemo(() => `like:${namespace}:${locale}:${slug}`, [locale, namespace, slug]);

  const canInteract = likes !== null && isLiked !== null && !isPending;

  useEffect(() => {
    const controller = new AbortController();

    fetchLikes(namespace, locale, slug, controller.signal)
      .then((value) => {
        setLikes(value);
        setError(null);
      })
      .catch((fetchError) => {
        if (controller.signal.aborted) {
          return;
        }
        console.error(fetchError);
        setError("Не удалось загрузить лайки");
      });

    return () => {
      controller.abort();
    };
  }, [locale, namespace, slug]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      setIsLiked(stored === "1");
    } catch (localStorageError) {
      console.error(localStorageError);
      setIsLiked(false);
    }
  }, [storageKey]);

  const handleClick = useCallback((event?: MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (!canInteract) {
      return;
    }

    const previousLikes = likes;
    const previousLiked = isLiked;
    const nextLiked = !previousLiked;
    const optimisticLikes = previousLiked ? Math.max((likes ?? 0) - 1, 0) : (likes ?? 0) + 1;

    setLikes(optimisticLikes);
    setIsLiked(nextLiked);
    setIsPending(true);

    const controller = new AbortController();

    const request = nextLiked
      ? postLike(namespace, locale, slug, controller.signal)
      : deleteLike(namespace, locale, slug, controller.signal);

    request
      .then((value) => {
        setLikes(value);
        setError(null);
        try {
          if (nextLiked) {
            window.localStorage.setItem(storageKey, "1");
          } else {
            window.localStorage.removeItem(storageKey);
          }
        } catch (localStorageError) {
          console.error(localStorageError);
        }
      })
      .catch((postError) => {
        if (controller.signal.aborted) {
          return;
        }
        console.error(postError);
        setError(nextLiked ? "Не удалось сохранить лайк" : "Не удалось убрать лайк");
        setLikes(previousLikes);
        setIsLiked(previousLiked);
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [canInteract, isLiked, likes, locale, namespace, slug, storageKey]);

  const formatLocale = useMemo(() => (locale === "ru" ? "ru-RU" : "en-GB"), [locale]);

  const buttonLabel = useMemo(() => {
    if (likes == null) {
      return "…";
    }

    return likes.toLocaleString(formatLocale);
  }, [formatLocale, likes]);

  const baseClasses =
    "inline-flex items-center gap-2 rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80 disabled:cursor-not-allowed disabled:opacity-70";

  const styles =
    variant === "compact"
      ? "border-white/40 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white hover:border-emerald-300/60 hover:text-emerald-100"
      : "group border-emerald-400/40 bg-black/60 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200 hover:border-emerald-300/70";

  const Wrapper = wrapper as keyof JSX.IntrinsicElements;

  return (
    <Wrapper className={className}>
      <button
        type="button"
        onClick={handleClick}
        disabled={!canInteract}
        className={`${baseClasses} ${styles}`}
        aria-live="polite"
        aria-label={isLiked ? "Убрать лайк" : "Поставить лайк"}
      >
        <span
          aria-hidden="true"
          className={
            variant === "compact"
              ? "text-lg leading-none text-emerald-200"
              : "flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200 transition group-hover:bg-emerald-400/40 group-hover:text-emerald-100"
          }
        >
          {"\u2665"}
        </span>
        <span>{buttonLabel}</span>
      </button>
      {variant !== "compact" && error && <p className="mt-2 text-xs uppercase tracking-[0.3em] text-rose-300/80">{error}</p>}
    </Wrapper>
  );
}


