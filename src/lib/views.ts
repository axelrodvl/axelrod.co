import fs from "node:fs/promises";
import path from "node:path";

import { isLocale, locales } from "./i18n";

const ROOT_PATH = process.cwd();
const VIEWS_DATA_PATH = path.join(ROOT_PATH, "data", "views");

const SEGMENT_REGEX = /^[a-z0-9-]+$/i;
const NAMESPACES = ["article", "project", "page"] as const;

export type ViewNamespace = (typeof NAMESPACES)[number];

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

function assertValidNamespace(namespace: string): asserts namespace is ViewNamespace {
  if (!(NAMESPACES as readonly string[]).includes(namespace)) {
    throw new Error(`Invalid namespace: ${namespace}`);
  }
}

function getNamespacePath(namespace: ViewNamespace) {
  return path.join(VIEWS_DATA_PATH, namespace);
}

function getSharedViewFilePath(namespace: ViewNamespace, slug: string) {
  return path.join(getNamespacePath(namespace), `${slug}.json`);
}

function getLegacyViewFilePath(namespace: ViewNamespace, locale: string, slug: string) {
  return path.join(getNamespacePath(namespace), locale, `${slug}.json`);
}

async function ensureNamespaceDirectory(namespace: ViewNamespace) {
  await fs.mkdir(getNamespacePath(namespace), { recursive: true });
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

type ViewFile = {
  views: number;
};

async function readViewFile(filePath: string): Promise<number> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed: ViewFile = JSON.parse(raw);

    if (typeof parsed.views === "number" && Number.isFinite(parsed.views) && parsed.views >= 0) {
      return Math.floor(parsed.views);
    }

    return 0;
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return 0;
    }

    throw error;
  }
}

async function readCombinedViews(namespace: ViewNamespace, slug: string): Promise<number> {
  const sharedPath = getSharedViewFilePath(namespace, slug);

  if (await fileExists(sharedPath)) {
    return readViewFile(sharedPath);
  }

  const aggregated = await Promise.all(
    locales.map((locale) => readViewFile(getLegacyViewFilePath(namespace, locale, slug)))
  );

  return aggregated.reduce((total, value) => total + value, 0);
}

async function writeViewFile(filePath: string, views: number) {
  const payload: ViewFile = { views };
  await fs.writeFile(filePath, `${JSON.stringify(payload)}\n`, "utf8");
}

async function getViews(namespace: ViewNamespace, locale: string, slug: string): Promise<number> {
  assertValidNamespace(namespace);
  assertValidLocale(locale);
  assertValidSlug(slug);

  return readCombinedViews(namespace, slug);
}

async function incrementViews(namespace: ViewNamespace, locale: string, slug: string): Promise<number> {
  assertValidNamespace(namespace);
  assertValidLocale(locale);
  assertValidSlug(slug);

  await ensureNamespaceDirectory(namespace);
  const filePath = getSharedViewFilePath(namespace, slug);

  const current = await readCombinedViews(namespace, slug);
  const next = current + 1;
  await writeViewFile(filePath, next);

  return next;
}

export function isViewNamespace(value: string): value is ViewNamespace {
  return (NAMESPACES as readonly string[]).includes(value);
}

export async function getArticleViews(locale: string, slug: string): Promise<number> {
  return getViews("article", locale, slug);
}

export async function incrementArticleViews(locale: string, slug: string): Promise<number> {
  return incrementViews("article", locale, slug);
}

export async function getProjectViews(locale: string, slug: string): Promise<number> {
  return getViews("project", locale, slug);
}

export async function incrementProjectViews(locale: string, slug: string): Promise<number> {
  return incrementViews("project", locale, slug);
}

export async function getPageViews(locale: string, slug: string): Promise<number> {
  return getViews("page", locale, slug);
}

export async function incrementPageViews(locale: string, slug: string): Promise<number> {
  return incrementViews("page", locale, slug);
}


