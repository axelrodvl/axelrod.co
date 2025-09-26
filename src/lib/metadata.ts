import type { Locale } from "./i18n";

const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Vadim Axelrod — Software Engineer",
    description:
      "Personal website of Vadim Axelrod, showcasing software projects, articles, and contact information.",
  },
  ru: {
    title: "Вадим Аксельрод — инженер-программист",
    description:
      "Личный сайт Вадима Аксельрода: проекты, статьи и контактная информация.",
  },
};

export function getMetadata(locale: Locale) {
  return metadataByLocale[locale];
}

