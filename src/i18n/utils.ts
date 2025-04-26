import { defaultLang } from './langs.ts';
import { ui } from './ui.ts';

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function getTranslatedURL(currentLocale: string, currentPathname: string) {
	let basePath = currentPathname ?? '';

	const localePrefix = currentLocale ? `/${currentLocale}` : '';

	if (currentLocale && basePath.startsWith(localePrefix + '/')) {
		basePath = basePath.substring(localePrefix.length);
	} else if (currentLocale && basePath === localePrefix) {
		basePath = '/';
	}

	return (basePath = basePath || '/');
}
