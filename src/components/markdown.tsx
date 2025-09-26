import { createElement } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  children: string;
  baseImagePath?: string;
};

export function Markdown({ children, baseImagePath = "" }: MarkdownProps) {
  return (
    <div className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={createComponents(baseImagePath)}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

function createComponents(baseImagePath: string): Components {
  return {
    h1: (props) => <Heading tag="h1" className="text-3xl font-semibold tracking-tight text-white" {...props} />, // biome-ignore lint/suspicious/noExplicitAny: React-markdown types include `any`
    h2: (props) => (
      <Heading
        tag="h2"
        className="mt-10 border-b border-white/10 pb-2 text-2xl font-semibold tracking-tight text-white"
        {...props}
      />
    ),
    h3: (props) => (
      <Heading
        tag="h3"
        className="mt-8 text-xl font-semibold tracking-tight text-emerald-200"
        {...props}
      />
    ),
    h4: (props) => (
      <Heading
        tag="h4"
        className="mt-6 text-lg font-semibold tracking-tight text-emerald-200/80"
        {...props}
      />
    ),
    p: (props) => <Element tag="p" className="mt-5 text-base leading-8 text-white/70 first:mt-0" {...props} />,
    a: (props) => (
      <Element
        tag="a"
        className="font-medium text-emerald-300 underline-offset-4 hover:text-emerald-200 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      />
    ),
    ul: (props) => <Element tag="ul" className="mt-5 list-disc space-y-2 pl-6 marker:text-emerald-400/60" {...props} />,
    ol: (props) => <Element tag="ol" className="mt-5 list-decimal space-y-2 pl-6 marker:text-emerald-400/60" {...props} />,
    li: (props) => <Element tag="li" className="text-base leading-7 text-white/70" {...props} />,
    blockquote: (props) => (
      <Element
        tag="blockquote"
        className="mt-6 border-l-2 border-emerald-400/40 bg-emerald-500/10 px-5 py-3 text-base italic text-white/70"
        {...props}
      />
    ),
    code: (props) => <Code {...props} />, // biome-ignore lint/suspicious/noExplicitAny: React-markdown types include `any`
    pre: (props) => <Pre {...props} />, // biome-ignore lint/suspicious/noExplicitAny: React-markdown types include `any`
    img: (props) => <MarkdownImage basePath={baseImagePath} {...props} />, // biome-ignore lint/suspicious/noExplicitAny: React-markdown types include `any`
    table: (props) => (
      <div className="mt-6 overflow-x-auto">
        <Element
          tag="table"
          className="w-full divide-y divide-neutral-200 text-left text-sm text-neutral-800"
          {...props}
        />
      </div>
    ),
    thead: (props) => <Element tag="thead" className="bg-neutral-100" {...props} />,
    tbody: (props) => <Element tag="tbody" className="divide-y divide-neutral-200" {...props} />,
    tr: (props) => <Element tag="tr" className="hover:bg-neutral-50" {...props} />,
    th: (props) => (
      <Element
        tag="th"
        className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-600"
        {...props}
      />
    ),
    td: (props) => <Element tag="td" className="px-4 py-3 align-top text-sm text-neutral-700" {...props} />,
  } satisfies Components;
}

type ElementProps<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T> & {
  node?: unknown;
};

function Heading<T extends keyof JSX.IntrinsicElements>({
  tag,
  className,
  ...props
}: ElementProps<T> & { tag: T }) {
  return Element({ tag, className, ...props });
}

function Element<T extends keyof JSX.IntrinsicElements>({
  tag,
  className,
  ...props
}: ElementProps<T> & { tag: T }) {
  const { node: _unusedNode, className: incoming, ...rest } = props;
  void _unusedNode;

  return createElement(tag, {
    ...rest,
    className: mergeClassNames(className, incoming),
  });
}

type CodeProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  node?: unknown;
  children: ReactNode;
};

function Code({ inline, className, children, node: _unusedNode, ...props }: CodeProps) {
  void _unusedNode;

  if (inline) {
    return (
      <code
        {...props}
          className={mergeClassNames(
            "rounded bg-black px-1 py-0.5 text-sm font-medium text-emerald-300",
            className,
          )}
      >
        {children}
      </code>
    );
  }

  return (
    <code {...props} className={mergeClassNames("font-mono text-sm", className)}>
      {children}
    </code>
  );
}

type ImageProps = ElementProps<"img"> & {
  basePath: string;
};

function MarkdownImage({ basePath, src, alt, className, node: _unusedNode, ...props }: ImageProps) {
  void _unusedNode;

  const resolvedSrc = resolveImageSrc(src, basePath);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={resolvedSrc}
      alt={alt ?? ""}
      loading="lazy"
      className={mergeClassNames(
        "mt-6 w-full rounded-2xl border border-white/10 bg-black/40 object-cover",
        className,
      )}
    />
  );
}

type PreProps = ComponentPropsWithoutRef<"pre"> & {
  node?: unknown;
};

function Pre({ className, node: _unusedNode, ...props }: PreProps) {
  void _unusedNode;

  return (
    <pre
      {...props}
      className={mergeClassNames(
        "mt-6 overflow-x-auto rounded-2xl border border-emerald-400/30 bg-black/60 p-5 text-sm text-emerald-100 shadow-[0_0_40px_rgba(16,185,129,0.08)]",
        className,
      )}
    />
  );
}

function resolveImageSrc(src: string | undefined, basePath: string) {
  if (!src) return "";

  const normalisedSrc = src.replace(/^\.\/+/, "");

  if (
    normalisedSrc.startsWith("http://") ||
    normalisedSrc.startsWith("https://") ||
    normalisedSrc.startsWith("/")
  ) {
    return normalisedSrc;
  }

  const cleanedSrc = normalisedSrc.replace(/^\/+/, "");

  if (!basePath) {
    return `/${cleanedSrc}`;
  }

  const baseWithSlash = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const baseSegments = baseWithSlash.split("/").filter(Boolean);
  const slug = baseSegments.at(-1) ?? "";

  let relativePath = cleanedSrc;

  if (slug && (relativePath === slug || relativePath.startsWith(`${slug}/`))) {
    relativePath = relativePath.slice(slug.length).replace(/^\/+/, "");
  }

  return `${baseWithSlash}${relativePath}`;
}

function mergeClassNames(...values: Array<string | undefined>) {
  const filtered = values.filter(Boolean);
  return filtered.length > 0 ? filtered.join(" ") : undefined;
}

