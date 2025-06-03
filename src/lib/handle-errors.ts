/**
 * Clears validation error state and message for a form input field.
 * @param field - The HTML input element to clear errors for
 */
export const clearInputError = (field: HTMLInputElement) => {
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

/**
 * Clears all form errors by removing error messages and aria-invalid attributes.
 * @param form - The HTML form element to reset errors for
 */
export const resetFormErrors = (form: HTMLFormElement) => {
	const errorElements = form.querySelectorAll<HTMLElement>('[data-error]');
	const inputsWithError = form.querySelectorAll<HTMLInputElement>('input, textarea');

	for (const errorElement of errorElements) {
		errorElement.textContent = '';
	}

	for (const inputWithError of inputsWithError) {
		inputWithError.removeAttribute('aria-invalid');
	}
};

/**
 * Renders field validation errors in a form by updating error display elements and marking inputs as invalid.
 * @param form - The HTML form element containing the fields
 * @param errors - Record mapping field names to arrays of error messages
 */
export const renderFieldErrors = (form: HTMLFormElement, errors: Record<string, string[] | undefined>) => {
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
