export const scrollToViaUrl = (() => {
	return {
		init: () => {
			const params = new URLSearchParams(window.location.search);
			const scrollId = params.get("scroll");
			if (scrollId) {
				const el = document.getElementById(scrollId);
				if (el) {
					setTimeout(() => {
						el.scrollIntoView({ behavior: "smooth" });
						params.delete("scroll");
						const newUrl =
							window.location.pathname +
							(params.toString() ? "?" + params.toString() : "") +
							window.location.hash;
						window.history.replaceState({}, "", newUrl);
					}, 400);
				}
			} else {
				console.warn("No scroll ID found in URL");
			}
		},
	};
})();
