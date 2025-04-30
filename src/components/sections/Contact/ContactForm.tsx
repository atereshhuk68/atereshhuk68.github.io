import { Button } from '@heroui/react';
import { useState } from 'react';
import { z } from 'zod';

const contactFormSchema = z.object({
	userName: z.string().min(1, { message: 'Name is required' }),
	userEmail: z.string().email({ message: 'Invalid email address' }),
	userMessage: z.string().min(1, { message: 'Message is required' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export function ContactForm() {
	const [formData, setFormData] = useState<ContactFormData>({
		userName: '',
		userEmail: '',
		userMessage: '',
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
			const response = await fetch('/send.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();

			if (data.success) {
				setSubmitMessage('Form submitted successfully!');
				setFormData({ userName: '', userEmail: '', userMessage: '' });
			} else {
				setSubmitMessage('Failed to submit the form. Please try again.');
			}
		} catch (error) {
			console.error('Submission error:', error);
			setSubmitMessage('An error occurred. Please try again.');
		} finally {
			setIsSubmitting(false);
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
						className={`border ${errors.userName ? 'border-red-500' : 'border-black-500'} bg-white placeholder:text-black-300 py-3 px-6 w-full rounded-md`}
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
						className={`border ${errors.userEmail ? 'border-red-500' : 'border-black-500'} bg-white placeholder:text-black-300 py-3 px-6 w-full rounded-md`}
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
						placeholder="Enter your message"
						name="userMessage"
						value={formData.userMessage}
						onChange={handleChange}
						className={`border ${errors.userMessage ? 'border-red-500' : 'border-black-500'} bg-white placeholder:text-black-300 py-3 px-6 w-full resize-none rounded-md h-44`}
						aria-invalid={!!errors.userMessage}
						aria-describedby={errors.userMessage ? 'userMessage-error' : undefined}
					/>
					{errors.userMessage && (
						<p id="userMessage-error" className="text-red-500 text-xs absolute bottom-0 left-0 h-[2lh] -mb-[2lh]">
							{errors.userMessage}
						</p>
					)}
				</div>

				<Button size="lg" isLoading={isSubmitting} className="bg-golden-200 text-black-900 disabled:opacity-50 min-w-[200px]" type="submit" disabled={isSubmitting}>
					Надіслати
				</Button>
			</form>
		</div>
	);
}
