// filepath: src/store/servicesStore.ts
import { shuffle } from 'es-toolkit';
import type { ServicesDataTypes } from 'src/types/types';
import { create } from 'zustand';

const MAX_INITIAL_CARDS = 6;

interface ServicesState {
	allServices: ServicesDataTypes[];
	filteredCards: ServicesDataTypes[];
	activeFilter: string;
	showAll: boolean;
	filters: string[];
	setServices: (services: ServicesDataTypes[]) => void;
	setFilter: (filterValue: string) => void;
	showAllCards: () => void;
}

export const useServicesStore = create<ServicesState>((set, get) => ({
	allServices: [],
	filteredCards: [],
	activeFilter: 'all',
	showAll: false,
	filters: [],

	setServices: (services: ServicesDataTypes[]) => {
		const initialFilter = 'all';

		const initialCards = services.slice(0, MAX_INITIAL_CARDS);

		const initialShowAll = services.length <= MAX_INITIAL_CARDS;

		const uniqueFilters = ['all', ...new Set(services.map((s) => s.type))];

		set({
			allServices: services,
			filteredCards: initialCards,
			activeFilter: initialFilter,
			showAll: initialShowAll,
			filters: uniqueFilters,
		});
	},

	// Action to set the active filter and update cards
	setFilter: (filterValue) => {
		const { allServices } = get();
		let newFilteredCards;

		if (filterValue !== 'all') {
			newFilteredCards = shuffle(allServices.filter((card) => card.type === filterValue));
		} else {
			newFilteredCards = shuffle([...allServices]);
		}

		const shouldShowAll = filterValue === 'all' || newFilteredCards.length <= MAX_INITIAL_CARDS;
		set({
			activeFilter: filterValue,
			showAll: shouldShowAll,
			filteredCards: shouldShowAll ? newFilteredCards : newFilteredCards.slice(0, MAX_INITIAL_CARDS),
		});
	},

	// Action to show all cards for the current filter
	showAllCards: () => {
		const { allServices, activeFilter } = get();
		let cardsToShow;

		if (activeFilter !== 'all') {
			cardsToShow = allServices.filter((card) => card.type === activeFilter);
		} else {
			cardsToShow = [...allServices];
		}

		set({
			showAll: true,
			filteredCards: cardsToShow,
		});
	},
}));
