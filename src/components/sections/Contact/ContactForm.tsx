import { Button } from '@heroui/react';
import { useState } from 'react';
import { z } from 'zod';

const contactFormSchema = z.object({
	userName: z.string().min(1, { message: 'Name is required' }),
	userEmail: z.string().email({ message: 'Invalid email address' }),
	description: z.string().min(1, { message: 'Description is required' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export function ContactForm() {
	const [formData, setFormData] = useState<ContactFormData>({
		userName: '',
		userEmail: '',
		description: '',
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitMessage(null);
		setErrors({});

		// Validate form data
		const validationResult = contactFormSchema.safeParse(formData);

		if (!validationResult.success) {
			const fieldErrors: FormErrors = {};

			validationResult.error.errors.forEach((err) => {
				if (err.path[0]) {
					fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
				}
			});

			setErrors(fieldErrors);

			setIsSubmitting(false);

			return;
		}

		try {
		} catch (error) {
		} finally {
		}
	};

	return (
		<div className="border border-black-300 bg-black-100 rounded-xl py-12 px-4 md:px-8">
			<form className="grid place-items-center space-y-8 max-w-[512px] mx-auto" onSubmit={handleSubmit} noValidate>
				<div className="relative w-full">
					<input
						placeholder="Enter your name"
						required
						type="text"
						name="userName"
						value={formData.userName}
						onChange={handleChange}
						className={`border ${errors.userName ? 'border-red-500' : 'border-black-500'} bg-white placeholder:text-black-300 py-3 px-6 w-full`}
						aria-invalid={!!errors.userName}
						aria-describedby={errors.userName ? 'userName-error' : undefined}
					/>
					{errors.userName && (
						<p id="userName-error" className="text-red-500 text-xs absolute bottom-0 left-0 h-[2lh] -mb-[2lh]">
							{errors.userName}
						</p>
					)}
				</div>

				<div className="relative w-full">
					<input
						placeholder="Enter your email"
						required
						type="email"
						name="userEmail"
						value={formData.userEmail}
						onChange={handleChange}
						className={`border ${errors.userEmail ? 'border-red-500' : 'border-black-500'} bg-white placeholder:text-black-300 py-3 px-6 w-full`}
						aria-invalid={!!errors.userEmail}
						aria-describedby={errors.userEmail ? 'userEmail-error' : undefined}
					/>
					{errors.userEmail && (
						<p id="userEmail-error" className="text-red-500 text-xs absolute bottom-0 left-0 h-[2lh] -mb-[2lh]">
							{errors.userEmail}
						</p>
					)}
				</div>

				<div className="relative w-full">
					<textarea
						required
						placeholder="Enter your description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						className={`border ${errors.description ? 'border-red-500' : 'border-black-500'} bg-white placeholder:text-black-300 py-3 px-6 w-full resize-none h-44`}
						aria-invalid={!!errors.description}
						aria-describedby={errors.description ? 'description-error' : undefined}
					/>
					{errors.description && (
						<p id="description-error" className="text-red-500 text-xs absolute bottom-0 left-0 h-[2lh] -mb-[2lh]">
							{errors.description}
						</p>
					)}
				</div>
				<Button size="lg" className="bg-golden-200 text-black-900 disabled:opacity-50" type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Sending...' : 'Надіслати'}
				</Button>
			</form>
		</div>
	);
}
