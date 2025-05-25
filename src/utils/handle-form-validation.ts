import type { z } from 'zod';

export const sanitizePhoneNumber = (phoneNumber: string): string => {
	return phoneNumber.replaceAll(/\D/g, '');
};

export const validateFormBySchema = <T extends z.ZodTypeAny>(form: HTMLFormElement, schema: T): z.SafeParseReturnType<z.infer<T>, z.infer<T>> => {
	const formData = new FormData(form);
	const formValues = Object.fromEntries(formData);

	if (formValues.userPhone) {
		formValues.userPhone = sanitizePhoneNumber(formValues.userPhone as string);
	}

	return schema.safeParse(formValues);
};
