type Locales = 'en' | 'pl' | 'uk' | 'ru';

type ISOLanguageCodes = 'en-US' | 'pl-PL' | 'uk-UA' | 'ru-RU';

type browserLocalesTypes = {
	[key in Locales]: ISOLanguageCodes;
};

export const browserLocales: browserLocalesTypes = {
	en: 'en-US',
	pl: 'pl-PL',
	uk: 'uk-UA',
	ru: 'ru-RU',
};

export type LanguagesTypes = {
	[key in Locales]: string;
};

export const defaultLang = 'pl';

export const Languages: LanguagesTypes = {
	en: 'English',
	pl: 'Polski',
	uk: 'Українська',
	ru: 'Русский',
};

export type LanguageListTypes = {
	locale: Locales;
	href: string;
	name: string;
};

export type LanguagesListType = {
	locale: Locales;
	href: string;
	name: string;
};

export const LanguagesList = Object.entries(Languages).map(([key, value]) => ({
	locale: key,
	href: key === defaultLang ? '/' : `/${key}/`,
	name: value,
}));
