import { shuffle } from "es-toolkit";
import type { Service } from "src/types/types";
import { create } from "zustand";

const MAX_INITIAL_CARDS = 6;

interface CatalogState {
	catalog: Service[];
	catalogFiltered: Service[];
	activeFilter: string;
	filters: string[];
	setCatalog: (services: Service[]) => void;
	setActiveFilter: (filterValue: string) => void;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
	catalog: [],
	catalogFiltered: [],
	activeFilter: "all",
	filters: [],

	setCatalog: (services: Service[]) => {
		const servicesTypes = ["all", ...new Set(services.map((s) => s.type))];

		set({
			catalog: services,
			catalogFiltered: services,
			filters: servicesTypes,
		});
	},

	setActiveFilter: (newFilterValue: string) => {
		const { catalog } = get();

		let newCatalog;

		if (newFilterValue !== "all") {
			newCatalog = shuffle(
				catalog.filter((card) => card.type === newFilterValue),
			);
		} else {
			newCatalog = shuffle([...catalog]);
		}

		set({
			activeFilter: newFilterValue,
			catalogFiltered: newCatalog,
		});
	},
}));
