import { LikeButton } from "@/components/like-button";
import { LlmTags } from "@/components/llm-tags";

type LikeNamespace = "article" | "project";

type TagsProps = {
  namespace: LikeNamespace;
  locale: string;
  slug: string;
  tags?: string[];
  llmTags?: string[];
  initialLikes?: number;
};

const DEFAULT_CONTAINER_CLASSES = "flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide";
const DEFAULT_TAG_CLASSES = "rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-emerald-300/80";

export function Tags({
  namespace,
  locale,
  slug,
  tags = [],
  llmTags = [],
  initialLikes,
}: TagsProps) {
  if (llmTags.length === 0 && tags.length === 0) {
    return null;
  }

  return (
    <div className={DEFAULT_CONTAINER_CLASSES}>
      <LikeButton
        namespace={namespace}
        locale={locale}
        slug={slug}
        variant="compact"
        wrapper="span"
        initialLikes={initialLikes}
      />
      <LlmTags
        locale={locale}
        tags={llmTags}
        entityId={slug}
        wrapper="span"
      />
      {tags.map((tag) => (
        <span key={`${slug}-${tag}`} className={DEFAULT_TAG_CLASSES}>
          {tag.toUpperCase()}
        </span>
      ))}
    </div>
  );
}


