import fs from "node:fs/promises";
import path from "node:path";

import { isLocale } from "./i18n";

const ROOT_PATH = process.cwd();
const LIKES_DATA_PATH = path.join(ROOT_PATH, "data", "likes");

const SEGMENT_REGEX = /^[a-z0-9-]+$/i;
const NAMESPACES = ["article", "project"] as const;

export type LikeNamespace = (typeof NAMESPACES)[number];

function assertValidLocale(locale: string) {
  if (!isLocale(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }
}

function assertValidSlug(slug: string) {
  if (!SEGMENT_REGEX.test(slug)) {
    throw new Error(`Invalid slug: ${slug}`);
  }
}

function assertValidNamespace(namespace: string): asserts namespace is LikeNamespace {
  if (!(NAMESPACES as readonly string[]).includes(namespace)) {
    throw new Error(`Invalid namespace: ${namespace}`);
  }
}

function getNamespacePath(namespace: LikeNamespace) {
  return path.join(LIKES_DATA_PATH, namespace);
}

function getLikeFilePath(namespace: LikeNamespace, locale: string, slug: string) {
  return path.join(getNamespacePath(namespace), locale, `${slug}.json`);
}

async function ensureLocaleDirectory(namespace: LikeNamespace, locale: string) {
  const target = path.join(getNamespacePath(namespace), locale);
  await fs.mkdir(target, { recursive: true });
}

type LikeFile = {
  likes: number;
};

async function readLikeFile(filePath: string): Promise<number> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed: LikeFile = JSON.parse(raw);

    if (typeof parsed.likes === "number" && Number.isFinite(parsed.likes) && parsed.likes >= 0) {
      return Math.floor(parsed.likes);
    }

    return 0;
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return 0;
    }

    throw error;
  }
}

async function writeLikeFile(filePath: string, likes: number) {
  const payload: LikeFile = { likes };
  await fs.writeFile(filePath, `${JSON.stringify(payload)}\n`, "utf8");
}

async function getLikes(namespace: LikeNamespace, locale: string, slug: string): Promise<number> {
  assertValidNamespace(namespace);
  assertValidLocale(locale);
  assertValidSlug(slug);

  const filePath = getLikeFilePath(namespace, locale, slug);
  return readLikeFile(filePath);
}

async function incrementLikes(namespace: LikeNamespace, locale: string, slug: string): Promise<number> {
  assertValidNamespace(namespace);
  assertValidLocale(locale);
  assertValidSlug(slug);

  await ensureLocaleDirectory(namespace, locale);
  const filePath = getLikeFilePath(namespace, locale, slug);

  const current = await readLikeFile(filePath);
  const next = current + 1;
  await writeLikeFile(filePath, next);

  return next;
}

export function isLikeNamespace(value: string): value is LikeNamespace {
  return (NAMESPACES as readonly string[]).includes(value);
}

export async function getArticleLikes(locale: string, slug: string): Promise<number> {
  return getLikes("article", locale, slug);
}

export async function incrementArticleLikes(locale: string, slug: string): Promise<number> {
  return incrementLikes("article", locale, slug);
}

export async function getProjectLikes(locale: string, slug: string): Promise<number> {
  return getLikes("project", locale, slug);
}

export async function incrementProjectLikes(locale: string, slug: string): Promise<number> {
  return incrementLikes("project", locale, slug);
}

