import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PageHeaderProps = {
  backHref: string;
  backLabel: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  linkClassName?: string;
} & Omit<ComponentPropsWithoutRef<"header">, "children">;

export function PageHeader({
  backHref,
  backLabel,
  title,
  description,
  contentClassName = "mt-4 space-y-4",
  titleClassName = "text-3xl font-semibold tracking-tight text-white sm:text-4xl",
  descriptionClassName = "max-w-2xl text-base leading-relaxed text-white/60",
  linkClassName = "text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition hover:text-emerald-300/90",
  className = "",
  ...props
}: PageHeaderProps) {
  const rootClassName = className;

  return (
    <header className={rootClassName} {...props}>
      <Link href={backHref} className={linkClassName}>
        {backLabel}
      </Link>
      <div className={contentClassName}>
        <h1 className={titleClassName}>{title}</h1>
        {description ? <p className={descriptionClassName}>{description}</p> : null}
      </div>
    </header>
  );
}


