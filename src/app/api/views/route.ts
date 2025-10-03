import { NextResponse } from "next/server";

import {
  getArticleViews,
  getPageViews,
  getProjectViews,
  incrementArticleViews,
  incrementPageViews,
  incrementProjectViews,
  isViewNamespace,
} from "@/lib/views";

function buildErrorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function normalizeSegment(value: string | null) {
  if (!value || typeof value !== "string") {
    return null;
  }

  return value.trim().toLowerCase();
}

function getParams(searchParams: URLSearchParams) {
  const namespace = normalizeSegment(searchParams.get("namespace"));
  const locale = normalizeSegment(searchParams.get("locale"));
  const slug = normalizeSegment(searchParams.get("slug"));

  if (!namespace || !locale || !slug) {
    return {
      error: buildErrorResponse("Missing namespace, locale or slug."),
    } as const;
  }

  if (!isViewNamespace(namespace)) {
    return {
      error: buildErrorResponse("Invalid namespace."),
    } as const;
  }

  return {
    namespace,
    locale,
    slug,
  } as const;
}

function resolveGetter(namespace: "article" | "project" | "page") {
  switch (namespace) {
    case "article":
      return getArticleViews;
    case "project":
      return getProjectViews;
    default:
      return getPageViews;
  }
}

function resolveIncrement(namespace: "article" | "project" | "page") {
  switch (namespace) {
    case "article":
      return incrementArticleViews;
    case "project":
      return incrementProjectViews;
    default:
      return incrementPageViews;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = getParams(searchParams);

    if ("error" in result) {
      return result.error;
    }

    const getter = resolveGetter(result.namespace);
    const views = await getter(result.locale, result.slug);

    return NextResponse.json({ views });
  } catch (error) {
    console.error("Failed to fetch views", error);
    return buildErrorResponse("Failed to fetch views.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = getParams(searchParams);

    if ("error" in result) {
      return result.error;
    }

    const increment = resolveIncrement(result.namespace);
    const views = await increment(result.locale, result.slug);

    return NextResponse.json({ views });
  } catch (error) {
    console.error("Failed to update views", error);
    return buildErrorResponse("Failed to update views.", 500);
  }
}


