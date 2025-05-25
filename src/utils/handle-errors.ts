export const clearFieldError = (field: HTMLInputElement) => {
	const inputName = field.name;
	const form = field.closest('form');

	if (!form) return;

	const errorElement = form.querySelector<HTMLInputElement>(`[data-error="${inputName}"]`);
	const inputWithError = form.querySelector<HTMLInputElement>(`[name="${inputName}"]`);

	if (errorElement) {
		errorElement.textContent = '';
	}

	if (inputWithError) {
		inputWithError.removeAttribute('aria-invalid');
	}
};

export const clearErrors = (form: HTMLFormElement) => {
	const errorElements = form.querySelectorAll<HTMLElement>('[data-error]');
	const inputsWithError = form.querySelectorAll<HTMLInputElement>('input, textarea');

	for (const errorElement of errorElements) {
		errorElement.textContent = '';
	}

	for (const inputWithError of inputsWithError) {
		inputWithError.removeAttribute('aria-invalid');
	}
};

export const displayErrors = (form: HTMLFormElement, errors: Record<string, string[] | undefined>) => {
	for (const [fieldName, fieldErrors] of Object.entries(errors)) {
		if (fieldErrors && fieldErrors.length > 0) {
			const errorElement = form.querySelector<HTMLElement>(`[data-error="${fieldName}"]`);
			const inputWithError = form.querySelector<HTMLInputElement>(`[name="${fieldName}"]`);

			if (inputWithError && errorElement) {
				inputWithError.setAttribute('aria-invalid', 'true');
				errorElement.textContent = fieldErrors[0];
			}
		}
	}
};
