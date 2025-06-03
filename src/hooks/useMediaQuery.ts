import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);

		const updateMatches = () => {
			setMatches(mediaQuery.matches);
		};

		// Set initial state
		updateMatches();

		// Listen for changes
		mediaQuery.addEventListener('change', updateMatches);

		// Cleanup listener on unmount
		return () => mediaQuery.removeEventListener('change', updateMatches);
	}, [query]); // Re-run effect if query changes

	return matches;
}
