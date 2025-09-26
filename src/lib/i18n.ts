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
    tagline: string;
  };
  articles: {
    title: string;
    description: string;
    backToHome: string;
    stickyTitle: string;
  };
  projects: {
    title: string;
    description: string;
    backToHome: string;
    stickyTitle: string;
  };
  articleDetail: {
    backToArticles: string;
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
      tagline:
        "gpt-5-codex created this entire website, and all it received in return was a fleeting mention in the footer.",
    },
    articles: {
      title: "Articles",
      description:
        "Stories and engineering notes from the projects I build and the systems I maintain. Everything is written in plain Markdown and rendered on the fly.",
      backToHome: "← Back to home",
      stickyTitle: "Articles",
    },
    projects: {
      title: "Projects",
      description:
        "A selection of client work and personal initiatives spanning web platforms, automation, and integrations.",
      backToHome: "← Back to home",
      stickyTitle: "Projects",
    },
    articleDetail: {
      backToArticles: "← Back to articles",
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
      tagline:
        "gpt-5-codex сделал весь этот сайт и получил за это лишь короткое упоминание в футере.",
    },
    articles: {
      title: "Статьи",
      description:
        "Истории и инженерные заметки о проектах и системах, над которыми я работаю. Всё написано в Markdown и рендерится на лету.",
      backToHome: "← На главную",
      stickyTitle: "Статьи",
    },
    projects: {
      title: "Проекты",
      description:
        "Подборка клиентских и личных инициатив: веб-платформы, автоматизация и интеграции.",
      backToHome: "← На главную",
      stickyTitle: "Проекты",
    },
    articleDetail: {
      backToArticles: "← Назад к статьям",
    },
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale) {
  return translations[locale];
}

