import type { z } from "zod";

/**
 * Removes all non-digit characters from a phone number string.
 * @param phoneNumber - The phone number string to sanitize
 * @returns The sanitized phone number containing only digits
 */
export const sanitizePhoneNumber = (phoneNumber: string): string => {
	return phoneNumber.replaceAll(/\D/g, "");
};

/**
 * Validates form data against a Zod schema with phone number sanitization.
 * @param form - The HTML form element to validate
 * @param schema - The Zod schema to validate against
 * @returns Safe parse result containing validation outcome and data/errors
 */
export const validateFormBySchema = <T extends z.ZodTypeAny>(
	form: HTMLFormElement,
	schema: T,
): z.SafeParseReturnType<z.infer<T>, z.infer<T>> => {
	const formData = new FormData(form);
	const formValues = Object.fromEntries(formData);

	if (formValues.userPhone) {
		formValues.userPhone = sanitizePhoneNumber(formValues.userPhone as string);
	}

	return schema.safeParse(formValues);
};
