/**
 * Default animation options for dialog transitions with 300ms duration and ease-in-out easing.
 */
const dialogAnimationOptions: KeyframeAnimationOptions = {
  duration: 300,
  easing: "ease-in-out",
  fill: "forwards",
};

/**
 * Animates and displays a modal dialog with a scale-in effect.
 * @param dialog - The HTML dialog element to animate and show
 */
const animateDialogOpening = (dialog: HTMLDialogElement) => {
  const dialogOpenKeyframes: Keyframe[] = [
    { transform: "scale(0.4)", opacity: "0" },
    { transform: "scale(1)", opacity: "1" },
  ];

  dialog.animate(dialogOpenKeyframes, dialogAnimationOptions);

  dialog.showModal();

  document.body.style.overflow = "hidden";
};

/**
 * Animates a dialog element closing with a scale and fade out effect.
 * @param dialog - The dialog element to animate
 */
const animateDialogClosing = (dialog: HTMLDialogElement) => {
  const dialogCloseKeyframes: Keyframe[] = [
    { transform: "scale(1)", opacity: "1" },
    { transform: "scale(0.4)", opacity: "0" },
  ];

  const dialogCloseAnimation = dialog.animate(
    dialogCloseKeyframes,
    dialogAnimationOptions,
  );

  dialogCloseAnimation.onfinish = () => {
    dialog.close();
    document.body.style.overflow = "auto";
  };
};

/**
 * Toggles a dialog element between open and closed states with animations.
 * @param dialog - The HTML dialog element to toggle
 * @param isOpen - Whether the dialog should be opened (true) or closed (false)
 */
export const toggleDialog = (dialog: HTMLDialogElement, isOpen: boolean) =>
  isOpen ? animateDialogOpening(dialog) : animateDialogClosing(dialog);
