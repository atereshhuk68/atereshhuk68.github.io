import { getValidationMessages } from '@/constants/validation-messages';
import type { Locales } from '@/types';
import { z } from 'zod';

const getCurrentLanguage = (): Locales => (document.body.dataset.currentLocale ?? 'pl') as Locales;

const createOfferFormSchema = (locale: Locales) => {
	const messages = getValidationMessages(locale);

	return z.object({
		formTitle: z.string(),
		userName: z
			.string({ message: messages.NAME_REQUIRED })
			.min(1, { message: messages.NAME_SHORT })
			.regex(/^[\p{L}\s-]+$/u, {
				message: messages.NAME_INVALID,
			}),
		userPhone: z
			.string()
			.min(9, { message: messages.PHONE_TOO_SHORT })
			.max(15, { message: messages.PHONE_TOO_LONG })
			.regex(/^\+?[0-9\s\-()]+$/, { message: messages.PHONE_INVALID }),
	});
};

const createContactFormSchema = (locale: Locales) => {
	const messages = getValidationMessages(locale);

	return z.object({
		userName: z
			.string({ message: messages.NAME_REQUIRED })
			.min(2, { message: messages.NAME_SHORT })
			.regex(/^[\p{L}\s-]+$/u, {
				message: messages.NAME_INVALID,
			}),
		userPhone: z
			.string()
			.min(9, { message: messages.PHONE_TOO_SHORT })
			.max(15, { message: messages.PHONE_TOO_LONG })
			.regex(/^\+?[0-9\s\-()]+$/, { message: messages.PHONE_INVALID }),
		userEmail: z.string().email({ message: messages.EMAIL_INVALID }),
		userMessage: z.string().min(1, { message: messages.MESSAGE_REQUIRED }),
	});
};

// Export factory functions
export const getOfferFormSchema = () => createOfferFormSchema(getCurrentLanguage());

export const getContactFormSchema = () => createContactFormSchema(getCurrentLanguage());

// Export default schemas for backward compatibility
export const offerFormSchema = getOfferFormSchema();
export const contactFormSchema = getContactFormSchema();
