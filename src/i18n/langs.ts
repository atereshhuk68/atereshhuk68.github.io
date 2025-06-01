import type { Locales } from 'src/types';

export const defaultLang = 'pl';

export const Languages: Map<Locales, string> = new Map([
	['pl', 'Polski'],
	['en', 'English'],
	['uk', 'Українська'],
	['ru', 'Русский'],
]);

export const ISOLocales = new Map([
	['pl', 'pl-PL'],
	['en', 'en-US'],
	['uk', 'uk-UA'],
	['ru', 'ru-RU'],
]);
