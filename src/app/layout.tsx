import Link from "next/link";
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Vadim Axelrod — Software Engineer",
  description:
    "Personal website of Vadim Axelrod, showcasing software projects, articles, and contact information.",
  metadataBase: new URL("https://axelrod.co"),
  openGraph: {
    title: "Vadim Axelrod — Software Engineer",
    description:
      "Software engineer Vadim Axelrod shares projects, long-form writing, and ways to get in touch.",
    url: "https://axelrod.co",
    siteName: "axelrod.co",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadim Axelrod — Software Engineer",
    description:
      "Software engineer Vadim Axelrod shares projects, long-form writing, and ways to get in touch.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plexMono.variable} antialiased`}
      >
        <div className="noise" aria-hidden />
        <header className="relative z-10 border-b border-white/10 bg-black/60/80 bg-opacity-60 backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 text-[#e4f1ff] sm:px-12">
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-[0.6em] text-emerald-200 transition hover:text-emerald-100"
            >
              Vadim Axelrod
            </Link>
          </div>
        </header>
        <main className="relative z-10">{children}</main>
        <footer className="relative z-10 border-t border-white/10 bg-black/60/80 bg-opacity-60 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6 py-6 text-[10px] uppercase tracking-[0.4em] text-white/40 sm:px-12">
            <p>© {new Date().getFullYear()} Vadim Axelrod</p>
            <p className="mt-2 text-white/30">
            gpt-5-codex created this entire website, and all it received in return was a fleeting mention in the footer.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
