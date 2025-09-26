import type { ReactNode } from "react";

export default function ArticleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-neutral-50 text-neutral-900">
      <div className="mx-auto min-h-screen max-w-4xl px-6 pb-16 pt-12 sm:px-10">
        {children}
      </div>
    </div>
  );
}

