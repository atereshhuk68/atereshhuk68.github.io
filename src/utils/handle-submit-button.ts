export const disableSubmitButton = (submitButton: HTMLButtonElement) => {
	if (submitButton) {
		submitButton.disabled = true;
	}
};

export const enableSubmitButton = (submitButton: HTMLButtonElement) => {
	if (submitButton) {
		submitButton.disabled = false;
	}
};
