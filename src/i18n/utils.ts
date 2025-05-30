import type { Locales } from 'src/types.ts';
import { defaultLang } from './langs.ts';
import { ui } from './ui.ts';

export const useTranslations = (locale: Locales) => {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[locale][key] || ui[defaultLang][key];
	};
};

export function getTranslatedURL(pathname: string, locale: Locales) {
	if (locale && pathname.startsWith(`/${locale}/`)) {
		return pathname.substring(`/${locale}/`.length);
	}

	return '/';
}
