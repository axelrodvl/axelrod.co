import type { ReactNode } from "react";

export default function ArticleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-[#040609] text-[#e4f1ff]">
      <div className="mx-auto min-h-screen max-w-5xl px-6 pb-6 pt-6">
        {children}
      </div>
    </div>
  );
}

