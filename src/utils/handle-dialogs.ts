const animationOptions: KeyframeAnimationOptions = {
	duration: 300,
	easing: 'ease-in-out',
	fill: 'forwards',
};

const dialogOpenAnimation = (dialog: HTMLDialogElement) => {
	const dialogOpenKeyframes: Keyframe[] = [
		{ transform: 'scale(0.4)', opacity: '0' },
		{ transform: 'scale(1)', opacity: '1' },
	];

	dialog.animate(dialogOpenKeyframes, animationOptions);

	dialog.showModal();

	document.body.style.overflow = 'hidden';
};

const dialogCloseAnimation = (dialog: HTMLDialogElement) => {
	const dialogCloseKeyframes: Keyframe[] = [
		{ transform: 'scale(1)', opacity: '1' },
		{ transform: 'scale(0.4)', opacity: '0' },
	];

	const dialogCloseAnimation = dialog.animate(dialogCloseKeyframes, animationOptions);

	dialogCloseAnimation.onfinish = () => {
		dialog.close();
		document.body.style.overflow = 'auto';
	};
};

export const toggleDialog = (dialog: HTMLDialogElement, isOpen: boolean) => (isOpen ? dialogOpenAnimation(dialog) : dialogCloseAnimation(dialog));
