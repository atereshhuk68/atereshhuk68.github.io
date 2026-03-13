import type { Locales } from "@/types";

export const ValidationMessages = {
  en: {
    NAME_REQUIRED: "Enter your name",
    NAME_INVALID: "Only letters, spaces, and hyphens are allowed",
    NAME_SHORT: "Name too short",
    PHONE_REQUIRED: "Enter your phone number",
    PHONE_TOO_SHORT: "Phone too short",
    PHONE_TOO_LONG: "Phone too long",
    PHONE_INVALID: "Invalid phone number",
    PHONE_INCOMPLETE: "Phone number does not match the format +48 XXX XXX XXX",
    EMAIL_INVALID: "Invalid email",
    MESSAGE_REQUIRED: "Enter a message",
    SERVICE_CATEGORY_REQUIRED: "Select a service category",
  },
  uk: {
    NAME_REQUIRED: "Введіть ім'я",
    NAME_INVALID: "Лише літери, пробіли та дефіси",
    NAME_SHORT: "Занадто коротке ім'я",
    PHONE_REQUIRED: "Введіть номер телефону",
    PHONE_TOO_SHORT: "Занадто короткий телефон",
    PHONE_TOO_LONG: "Занадто довгий телефон",
    PHONE_INVALID: "Невірний телефон",
    PHONE_INCOMPLETE: "Телефон не відповідає формату +48 XXX XXX XXX",
    EMAIL_INVALID: "Невірний email",
    MESSAGE_REQUIRED: "Введіть повідомлення",
    SERVICE_CATEGORY_REQUIRED: "Виберіть категорію послуги",
  },
  pl: {
    NAME_REQUIRED: "Podaj imię",
    NAME_INVALID: "Tylko litery i spacje",
    NAME_SHORT: "Imię za krótkie",
    PHONE_REQUIRED: "Podaj numer telefonu",
    PHONE_TOO_SHORT: "Telefon za krótki",
    PHONE_TOO_LONG: "Telefon za długi",
    PHONE_INVALID: "Nieprawidłowy telefon",
    PHONE_INCOMPLETE: "Telefon nie odpowiada formatowi +48 XXX XXX XXX",
    EMAIL_INVALID: "Nieprawidłowy email",
    MESSAGE_REQUIRED: "Podaj wiadomość",
    SERVICE_CATEGORY_REQUIRED: "Wybierz kategorię usługi",
  },
  ru: {
    NAME_REQUIRED: "Введите имя",
    NAME_INVALID: "Только буквы, пробелы и дефисы",
    NAME_SHORT: "Имя слишком короткое",
    PHONE_REQUIRED: "Введите номер телефона",
    PHONE_TOO_SHORT: "Телефон слишком короткий",
    PHONE_TOO_LONG: "Телефон слишком длинный",
    PHONE_INVALID: "Неверный телефон",
    PHONE_INCOMPLETE: "Телефон не соответствует формату +48 XXX XXX XXX",
    EMAIL_INVALID: "Неверный email",
    MESSAGE_REQUIRED: "Введите сообщение",
    SERVICE_CATEGORY_REQUIRED: "Выберите категорию услуги",
  },
} as const;

// Helper function to get localized messages
export const getValidationMessages = (locale: Locales) => {
  return ValidationMessages[locale] || ValidationMessages.pl;
};
