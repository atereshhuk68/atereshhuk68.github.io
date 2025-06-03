import { z } from 'zod';

export const offerFormSchema = z.object({
	formTitle: z.string(),
	userName: z
		.string()
		.min(2, { message: 'Name is required' })
		.regex(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' }),
	userPhone: z
		.string()
		.min(9, { message: 'Phone too short. Min 9 symbols' })
		.max(15, { message: 'Phone too long. Max 15 symbols' })
		.regex(/^\+?[0-9]*$/, { message: 'Invalid phone number' }),
});

export const contactFormSchema = z.object({
	userName: z
		.string()
		.min(2, { message: 'Name is required' })
		.regex(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' }),
	userPhone: z
		.string()
		.min(9, { message: 'Phone too short. Min 9 symbols' })
		.max(15, { message: 'Phone too long. Max 15 symbols' })
		.regex(/^\+?[0-9]*$/, { message: 'Invalid phone number' }),
	userEmail: z.string().email({ message: 'Invalid email address' }),
	userMessage: z.string().min(1, { message: 'Message is required' }),
});
