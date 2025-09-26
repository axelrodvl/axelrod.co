import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
