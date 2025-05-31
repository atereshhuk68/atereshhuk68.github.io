import type { Locales } from 'src/types.ts';
import { defaultLang } from './langs.ts';
import { ui } from './ui.ts';

/**
 * Creates a translation function for the specified locale.
 * @param locale - The target locale for translations
 * @returns Translation function that retrieves localized strings with fallback to default language
 */
export const useTranslations = (locale: Locales) => {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[locale][key] || ui[defaultLang][key];
	};
};

/**
 * Generates a localized URL by converting any existing locale prefix to the target locale.
 * @param basePath - The current path (may contain existing locale prefix)
 * @param locale - The target locale to convert to
 * @returns The URL with the correct locale prefix
 *
 * Examples:
 * - getTranslatedURL('/en/about', 'uk') -> '/uk/about'
 * - getTranslatedURL('/about', 'uk') -> '/uk/about'
 * - getTranslatedURL('/uk/about', 'en') -> '/about' (if 'en' is default)
 */
export function getTranslatedURL(basePath: string, locale: Locales) {
	let pathname = basePath.startsWith('/') ? basePath.slice(1) : basePath;

	const localePrefix = `${locale}/`;

	if (pathname.startsWith(localePrefix)) {
		pathname = pathname.substring(localePrefix.length);
	}

	if (locale === defaultLang) {
		return pathname ? `/${pathname}` : '/';
	}

	return pathname ? `/${locale}/${pathname}` : `/${locale}`;
}
