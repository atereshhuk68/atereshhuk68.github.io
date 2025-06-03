import { DEFAULT_LANG, ISOLocales } from '@/constants';
import { ui } from '@/i18n/ui';
import type { Locales } from '@/types';

/**
 * Creates a translation function for the specified locale.
 * @param locale - The target locale for translations
 * @returns Translation function that retrieves localized strings with fallback to default language
 */
export const useTranslations = (locale: Locales) => {
	return function t(key: keyof (typeof ui)[typeof DEFAULT_LANG]) {
		return ui[locale][key] || ui[DEFAULT_LANG][key];
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
	const localePrefix = locale ? `/${locale}` : '';
	let pathname = basePath;

	if (locale && basePath.startsWith(`${localePrefix}/`)) {
		pathname = basePath.substring(localePrefix.length);
	} else if (locale && basePath === localePrefix) {
		pathname = '/';
	}

	return (pathname = pathname || '/');
}

/**
 * Converts a locale to its ISO format, defaulting to 'pl-PL' if not found.
 * @param locale - The locale to convert
 * @returns The ISO locale string
 */
export const getISOLocale = (locale: Locales) => {
	if (!ISOLocales.has(locale)) return DEFAULT_LOCALE;

	return ISOLocales.get(locale);
};

/**
 * Gets alternative ISO locale codes excluding the provided locale.
 * @param locale - The locale to exclude from alternates
 * @returns Array of alternative ISO locale codes, defaults to ['pl-PL'] if no alternates found
 */
export const getISOLocaleAlternates = (locale: Locales) => {
	const alternates = ISOLocales.values().filter((ISOLocale) => ISOLocale !== getISOLocale(locale));

	return alternates ? alternates : [DEFAULT_LOCALE];
};
