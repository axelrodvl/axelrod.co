import type { Metadata } from "next";
import { headers } from "next/headers";
import { IBM_Plex_Mono } from "next/font/google";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { getMetadata } from "@/lib/metadata";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axelrod.co"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") ?? "";
  const [, potentialLocale] = pathname.split("/");
  const locale = isLocale(potentialLocale) ? potentialLocale : defaultLocale;
  const meta = getMetadata(locale);

  return (
    <html lang={locale}>
      <head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </head>
      <body className={`${plexMono.variable} antialiased`}>
        <div className="noise" aria-hidden />
        {children}
      </body>
    </html>
  );
}
