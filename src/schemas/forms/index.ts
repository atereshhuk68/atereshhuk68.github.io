import { getValidationMessages } from "@/constants/validation-messages";
import type { Locales } from "@/types";
import { z } from "astro/zod";

const getCurrentLanguage = (locale?: Locales): Locales => {
  if (locale) return locale;
  if (typeof document !== "undefined") {
    return (document.body.dataset.currentLocale ?? "pl") as Locales;
  }
  return "pl"; // fallback для SSR
};

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
      .string({ message: messages.PHONE_REQUIRED })
      .min(1, { message: messages.PHONE_REQUIRED })
      .regex(/^[0-9]+$/, { message: messages.PHONE_INVALID })
      .refine((phone) => phone.length === 11 && phone.startsWith("48"), {
        message: messages.PHONE_INCOMPLETE,
      }),
    userServiceCategory: z.string().min(1, {
      message: messages.SERVICE_CATEGORY_REQUIRED,
    }),
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
      .string({ message: messages.PHONE_REQUIRED })
      .min(1, { message: messages.PHONE_REQUIRED })
      .regex(/^[0-9]+$/, { message: messages.PHONE_INVALID })
      .refine((phone) => phone.length === 11 && phone.startsWith("48"), {
        message: messages.PHONE_INCOMPLETE,
      }),
    userEmail: z.string().email({ message: messages.EMAIL_INVALID }),
    userMessage: z.string().min(1, { message: messages.MESSAGE_REQUIRED }),
  });
};

// Export factory functions
export const getOfferFormSchema = (locale?: Locales) =>
  createOfferFormSchema(getCurrentLanguage(locale));

export const getContactFormSchema = (locale?: Locales) =>
  createContactFormSchema(getCurrentLanguage(locale));
