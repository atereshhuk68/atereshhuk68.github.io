import type { Locales } from 'src/types/types.ts';
import { defaultLang } from './langs.ts';
import { ui } from './ui.ts';

export const useTranslations = (locale: Locales) => {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[locale][key] || ui[defaultLang][key];
	};
};

export function getTranslatedURL(basePath: string, locale: Locales) {
	const localePrefix = locale ? `/${locale}` : '';

	if (locale && basePath.startsWith(localePrefix + '/')) {
		basePath = basePath.substring(localePrefix.length);
	} else if (locale && basePath === localePrefix) {
		basePath = '/';
	}

	return (basePath = basePath || '/');
}
