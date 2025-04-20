import type { PressEvent } from '@heroui/react';
import { shuffle, uniq } from 'es-toolkit';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { ServicesDataTypes } from 'src/types/types';
import { ServiceCard } from './ServiceCard';
import { TabControl } from './TabControl';

export function Services({ service: services }: { service: ServicesDataTypes[] }) {
	const [cards, setCards] = useState(services);

	const filters = uniq(services.map((service) => service.type));
	filters.unshift('all');

	const handleClickFilter = (event: PressEvent) => {
		document.querySelector('.active')?.classList.remove('active');

		const currentButton = event.target as HTMLButtonElement;

		currentButton.classList.add('active');

		const filter = currentButton.getAttribute('data-filter');

		if (filter === 'all') {
			setCards(shuffle(services));
			return;
		}

		const filteredCards = services.filter((card) => card.type === filter);
		setCards(filteredCards);
	};

	return (
		<div className="container">
			<TabControl onPress={handleClickFilter} filters={filters} />

			<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
				<AnimatePresence>
					{cards.map(({ id, name, services }: ServicesDataTypes) => (
						<ServiceCard key={id} name={name} services={services} />
					))}
				</AnimatePresence>
			</div>
		</div>
	);
}
