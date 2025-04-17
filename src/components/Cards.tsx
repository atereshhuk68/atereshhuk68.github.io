import type { PressEvent } from '@heroui/react';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CardsData } from 'src/data/cards';
import type { CardServiceTypes } from 'src/types/types';
import { ServiceCard } from './Card';
import { TabControl } from './TabControl';

export function Cards() {
	const [cards, setCards] = useState(CardsData);

	const handleClickFilter = (event: PressEvent) => {
		document.querySelector('.active')?.classList.remove('active');

		const currentButton = event.target as HTMLButtonElement;

		currentButton.classList.add('active');

		const filter = currentButton.getAttribute('data-filter');

		if (filter === 'all') {
			setCards(CardsData);
			return;
		}

		const filteredCards = CardsData.filter((card) => card.type === filter);
		setCards(filteredCards);
	};

	return (
		<div className="container">
			<TabControl onPress={handleClickFilter} />

			<div className="grid grid-cols-4 gap-5 mt-4">
				<AnimatePresence>
					{cards.map(({ id, name, services }: CardServiceTypes) => (
						<ServiceCard key={id} name={name} services={services} />
					))}
				</AnimatePresence>
			</div>
		</div>
	);
}
