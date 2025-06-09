import type { Locales } from '@/types';

export const DEFAULT_LANG = 'pl' as const;

export const DEFAULT_LOCALE = 'pl-PL' as const;

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
