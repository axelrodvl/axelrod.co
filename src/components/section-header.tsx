import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type SectionHeaderProps = {
  title: string;
  ctaLabel: string;
  href: string;
} & ComponentPropsWithoutRef<"div">;

export function SectionHeader({ title, ctaLabel, href, className = "", ...props }: SectionHeaderProps) {
  return (
    <div
      className={`sticky top-[60px] z-20 flex flex-wrap items-center gap-4 border-b border-white/10 bg-black/60/80 bg-opacity-60 py-5 backdrop-blur-sm ${className}`}
      {...props}
    >
      <h3 className="font-semibold uppercase tracking-[0.4em] text-emerald-300/90">
        {title}
      </h3>
      <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden />
      <Link
        href={href}
        className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

