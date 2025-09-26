import type { ReactNode } from "react";

export default function ArticleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-[#040609] text-[#e4f1ff]">
      <div className="mx-auto min-h-screen max-w-4xl px-6 pb-16 pt-14 sm:px-12">
        {children}
      </div>
    </div>
  );
}

