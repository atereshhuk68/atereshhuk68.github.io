import type { Locales } from "@/types";

export const DEFAULT_LANG = "pl" as const;

export const DEFAULT_LOCALE = "pl-PL" as const;

export const Languages: Map<Locales, string> = new Map([
  ["pl", "Polski"],
  ["en", "English"],
  ["uk", "Українська"],
  ["ru", "Русский"],
]);

export const ISOLocales = new Map([
  ["pl", "pl-PL"],
  ["en", "en-US"],
  ["uk", "uk-UA"],
  ["ru", "ru-RU"],
]);

interface LocaleSetting {
  [key: Lowercase<string>]: {
    label: string;
    lang?: string;
    dir?: "rtl" | "ltr";
  };
}

export const LOCALES_SETTING: LocaleSetting = {
  pl: { label: "Polski", lang: "pl-PL", dir: "ltr" },
  en: { label: "English", lang: "en-US", dir: "ltr" },
  uk: { label: "Українська", lang: "uk-UA", dir: "ltr" },
  ru: { label: "Русский", lang: "ru-RU", dir: "ltr" },
};
