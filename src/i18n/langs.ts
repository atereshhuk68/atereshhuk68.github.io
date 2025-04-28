type Locales = 'en' | 'pl' | 'uk' | 'ru';

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
