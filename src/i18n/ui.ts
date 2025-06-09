import { aboutTranslations } from './translations/aboutTranslations';
import { contactTranslations } from './translations/contactTranslations';
import { dialogTranslations } from './translations/dialogTranslations';
import { headerTranslations } from './translations/headerTranslations';
import { heroTranslations } from './translations/heroTranslations';
import { otherTranslations } from './translations/otherTranslations';
import { servicesTranslations } from './translations/servicesTranslations';
import { specialOfferTranslations } from './translations/specialOfferTranslations';

export const ui = {
	pl: {
		...headerTranslations.pl,
		...heroTranslations.pl,
		...aboutTranslations.pl,
		...servicesTranslations.pl,
		...contactTranslations.pl,
		...specialOfferTranslations.pl,
		...otherTranslations.pl,
		...dialogTranslations.pl,
	},
	en: {
		...headerTranslations.en,
		...heroTranslations.en,
		...aboutTranslations.en,
		...servicesTranslations.en,
		...specialOfferTranslations.en,
		...contactTranslations.en,
		...otherTranslations.en,
		...dialogTranslations.en,
	},
	uk: {
		...headerTranslations.uk,
		...heroTranslations.uk,
		...aboutTranslations.uk,
		...servicesTranslations.uk,
		...specialOfferTranslations.uk,
		...contactTranslations.uk,
		...otherTranslations.uk,
		...dialogTranslations.uk,
	},
	ru: {
		...headerTranslations.ru,
		...heroTranslations.ru,
		...aboutTranslations.ru,
		...servicesTranslations.ru,
		...specialOfferTranslations.ru,
		...contactTranslations.ru,
		...otherTranslations.ru,
		...dialogTranslations.ru,
	},
} as const;
