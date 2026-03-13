/**
 * Opens a Starwind UI dialog by dispatching a `"dialog:open"` event on the wrapper element.
 *
 * @param dialogWrapper - The dialog container element that listens for the open event.
 */
export const openStarwindUiDialog = (dialogWrapper: HTMLDivElement) => {
  dialogWrapper.dispatchEvent(new CustomEvent("dialog:open"));
};

/**
 * Closes a Starwind UI dialog by dispatching a `"dialog:close"` event on its wrapper element.
 *
 * @param dialogWrapper - The dialog container element that receives the close event.
 */
export const closeStarwindUiDialog = (dialogWrapper: HTMLDivElement) => {
  dialogWrapper.dispatchEvent(new CustomEvent("dialog:close"));
};
