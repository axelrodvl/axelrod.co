import { NextResponse } from "next/server";

import {
  getArticleLikes,
  getProjectLikes,
  incrementArticleLikes,
  incrementProjectLikes,
  isLikeNamespace,
} from "@/lib/likes";

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

  if (!isLikeNamespace(namespace)) {
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = getParams(searchParams);

    if ("error" in result) {
      return result.error;
    }

    const likes = result.namespace === "article"
      ? await getArticleLikes(result.locale, result.slug)
      : await getProjectLikes(result.locale, result.slug);

    return NextResponse.json({ likes });
  } catch (error) {
    console.error("Failed to fetch likes", error);
    return buildErrorResponse("Failed to fetch likes.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = getParams(searchParams);

    if ("error" in result) {
      return result.error;
    }

    const likes = result.namespace === "article"
      ? await incrementArticleLikes(result.locale, result.slug)
      : await incrementProjectLikes(result.locale, result.slug);

    return NextResponse.json({ likes });
  } catch (error) {
    console.error("Failed to update likes", error);
    return buildErrorResponse("Failed to update likes.", 500);
  }
}

