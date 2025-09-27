export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

const translations: Record<Locale, {
  header: {
    title: string;
    subtitle: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    contacts: {
      github: string;
      email: string;
      cv: string;
    };
    sections: {
      projects: {
        title: string;
        cta: string;
      };
      articles: {
        title: string;
        cta: string;
      };
    };
  };
  footer: {
    name: string;
    tagline: string;
  };
  articles: {
    title: string;
    description: string;
    backToHome: string;
    stickyTitle: string;
    tagCloudTitle: string;
    tagCloudAll: string;
  };
  projects: {
    title: string;
    description: string;
    backToHome: string;
    stickyTitle: string;
    tagCloudTitle: string;
    tagCloudAll: string;
  };
  articleDetail: {
    backToArticles: string;
    previousArticle: string;
    nextArticle: string;
  };
}> = {
  en: {
    header: {
      title: "Vadim Axelrod",
      subtitle: "Software Engineer",
    },
    home: {
      heroTitle: "Vadim Axelrod – Software Engineer",
      heroSubtitle:
        "Building reliable solutions with Java, TypeScript, and modern web platforms. I enjoy shipping products, optimizing developer workflows, and writing about engineering practices.",
      contacts: {
        github: "github",
        email: "e-mail",
        cv: "cv",
      },
      sections: {
        projects: {
          title: "Projects",
          cta: "View all projects",
        },
        articles: {
          title: "Articles",
          cta: "Browse all articles",
        },
      },
    },
    footer: {
      name: "Vadim Axelrod",
      tagline:
        "gpt-5-codex created this entire website, and all it received in return was a fleeting mention in the footer.",
    },
    articles: {
      title: "Articles",
      description:
        "Stories and engineering notes from the projects I build and the systems I maintain. Everything is written in plain Markdown and rendered on the fly.",
      backToHome: "← Back to home",
      stickyTitle: "Articles",
      tagCloudTitle: "Filter by tag",
      tagCloudAll: "All",
    },
    projects: {
      title: "Projects",
      description:
        "A selection of client work and personal initiatives spanning web platforms, automation, and integrations.",
      backToHome: "← Back to home",
      stickyTitle: "Projects",
      tagCloudTitle: "Filter by tag",
      tagCloudAll: "All",
    },
    articleDetail: {
      backToArticles: "\u2190 Back to articles",
      previousArticle: "\u2190 Previous article",
      nextArticle: "Next article \u2192",
    },
  },
  ru: {
    header: {
      title: "Вадим Аксельрод",
      subtitle: "Инженер-программист",
    },
    home: {
      heroTitle: "Вадим Аксельрод — инженер-программист",
      heroSubtitle:
        "Создаю надёжные решения на Java, TypeScript и современных веб-платформах. Запускаю продукты, улучшаю процессы разработки и делюсь инженерными практиками.",
      contacts: {
        github: "github",
        email: "e-mail",
        cv: "резюме",
      },
      sections: {
        projects: {
          title: "Проекты",
          cta: "Все проекты",
        },
        articles: {
          title: "Статьи",
          cta: "Все статьи",
        },
      },
    },
    footer: {
      name: "Вадим Аксельрод",
      tagline:
        "gpt-5-codex сделал весь этот сайт и получил за это лишь короткое упоминание в футере.",
    },
    articles: {
      title: "Статьи",
      description:
        "Истории и инженерные заметки о проектах и системах, над которыми я работаю. Всё написано в Markdown и рендерится на лету.",
      backToHome: "← На главную",
      stickyTitle: "Статьи",
      tagCloudTitle: "Фильтр по тегам",
      tagCloudAll: "Все",
    },
    projects: {
      title: "Проекты",
      description:
        "Подборка клиентских и личных инициатив: веб-платформы, автоматизация и интеграции.",
      backToHome: "← На главную",
      stickyTitle: "Проекты",
      tagCloudTitle: "Фильтр по тегам",
      tagCloudAll: "Все",
    },
    articleDetail: {
      backToArticles: "\u2190 \u041d\u0430\u0437\u0430\u0434 \u043a \u0441\u0442\u0430\u0442\u044c\u044f\u043c",
      previousArticle: "\u2190 \u041f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0430\u044f \u0441\u0442\u0430\u0442\u044c\u044f",
      nextArticle: "\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0430\u044f \u0441\u0442\u0430\u0442\u044c\u044f \u2192",
    },
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale) {
  return translations[locale];
}

