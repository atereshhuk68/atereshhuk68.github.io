type LazyBgElement = HTMLElement & { dataset: { lazyBg?: string } };

export const lazyBgLoader = (() => {
	const options: IntersectionObserverInit = {
		rootMargin: '150px',
		threshold: 0.1,
	};

	const callback: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				const element = entry.target as LazyBgElement;
				const lazyBgDataAttribute = element.dataset.bgName;

				if (lazyBgDataAttribute) {
					element.classList.add(lazyBgDataAttribute);

					delete element.dataset.lazyBg;
				}
			}
		}
	};

	const initObserver = () => {
		const LAZY_BG_SELECTOR = '[data-bg-name]';

		const lazyBgElements = document.querySelectorAll<LazyBgElement>(LAZY_BG_SELECTOR);

		if ('IntersectionObserver' in window) {
			const observer = new IntersectionObserver(callback, options);

			for (const element of lazyBgElements) observer.observe(element);
		}
	};

	return {
		init: () => {
			initObserver();
		},
	};
})();
