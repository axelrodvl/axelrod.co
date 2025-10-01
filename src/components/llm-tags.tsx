import type { JSX } from "react";
import Link from "next/link";

import type { Locale } from "@/lib/i18n";

type LlmTagsProps = {
  locale: Locale | string;
  tags: string[];
  entityId: string;
  wrapper?: WrapperElement;
  wrapperClassName?: string;
  linkClassName?: string;
};

const DEFAULT_LINK_CLASS = "rounded-full border border-white/40 bg-white/10 px-3 py-1 text-white transition hover:border-emerald-300/70";
const DEFAULT_WRAPPER_CLASS = "inline-flex";
type WrapperElement = keyof JSX.IntrinsicElements;

export function LlmTags({
  locale,
  tags,
  entityId,
  wrapper = "span",
  wrapperClassName,
  linkClassName,
}: LlmTagsProps) {
  if (tags.length === 0) {
    return null;
  }

  const Wrapper = wrapper as WrapperElement;
  const finalWrapperClass = wrapperClassName ? `${DEFAULT_WRAPPER_CLASS} ${wrapperClassName}` : DEFAULT_WRAPPER_CLASS;
  const finalLinkClass = linkClassName ? `${DEFAULT_LINK_CLASS} ${linkClassName}` : DEFAULT_LINK_CLASS;

  return (
    <>
      {tags.map((tag) => (
        <Wrapper key={`${entityId}-llm-${tag}`} className={finalWrapperClass}>
          <Link href={`/${locale}/llm-disclosure`} className={finalLinkClass}>
            {tag}
          </Link>
        </Wrapper>
      ))}
    </>
  );
}


