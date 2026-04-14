import { getRelativeLocaleUrl } from "astro:i18n";

export const breadcrumbs = {
  home: {
    en: { text: "Home", href: getRelativeLocaleUrl("en") },
    uk: { text: "Головна", href: getRelativeLocaleUrl("uk") },
    ru: { text: "Главная", href: getRelativeLocaleUrl("ru") },
    pl: { text: "Strona główna", href: getRelativeLocaleUrl("pl") },
  },
  jobs: {
    en: { text: "Jobs", href: getRelativeLocaleUrl("en", "jobs") },
    uk: { text: "Вакансії", href: getRelativeLocaleUrl("uk", "jobs") },
    ru: { text: "Вакансии", href: getRelativeLocaleUrl("ru", "jobs") },
    pl: { text: "Oferty pracy", href: getRelativeLocaleUrl("pl", "jobs") },
  },
  privacyPolicy: {
    en: {
      text: "Privacy Policy",
      href: getRelativeLocaleUrl("en", "privacy-policy"),
    },
    uk: {
      text: "Політика конфіденційності",
      href: getRelativeLocaleUrl("uk", "privacy-policy"),
    },
    ru: {
      text: "Политика конфиденциальности",
      href: getRelativeLocaleUrl("ru", "privacy-policy"),
    },
    pl: {
      text: "Polityka prywatności",
      href: getRelativeLocaleUrl("pl", "privacy-policy"),
    },
  },
};
