import type { LanguagesTypes } from "src/types/types";

export const defaultLang = "pl";

export const Languages: LanguagesTypes = {
	en: "English",
	pl: "Polski",
	uk: "Українська",
	ru: "Русский",
};

export const LanguagesList = Object.entries(Languages).map(([key, value]) => ({
	locale: key,
	name: value,
}));
