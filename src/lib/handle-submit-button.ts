/**
 * Disables a submit button element.
 * @param submitButton - The HTML button element to disable
 */
export const setSubmitButtonDisabled = (submitButton: HTMLButtonElement) => {
  if (submitButton) {
    submitButton.disabled = true;
  }
};

/**
 * Enables a submit button by setting its disabled property to false.
 * @param submitButton - The HTML button element to enable
 */
export const setSubmitButtonEnabled = (submitButton: HTMLButtonElement) => {
  if (submitButton) {
    submitButton.disabled = false;
  }
};
