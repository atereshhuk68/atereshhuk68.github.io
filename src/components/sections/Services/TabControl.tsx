import { Button, type PressEvent } from '@heroui/react';
import { useState } from 'react';

interface TabControlProps {
	onPress: (event: PressEvent, filterValue: string) => void;
	filters: string[];
}

const iconMap: { [key: string]: string } = {
	all: 'service-all-w32',
	manicure: 'service-manicure-w32',
	pedicure: 'service-pedicure-w32',
	eyes: 'service-brows-w32',
	makeup: 'service-makeup-w32',
	massage: 'service-massage-w32',
};

export function TabControl({ onPress, filters }: TabControlProps) {
	const [activeFilter, setActiveFilter] = useState<string>(filters[0] || 'all');

	const handleClickFilter = (event: PressEvent, filterValue: string) => {
		setActiveFilter(filterValue);
		onPress(event, filterValue);
	};

	return (
		<div className="flex flex-nowrap items-center gap-1 overflow-x-auto">
			{filters.map((filter: string) => {
				const isActive = filter === activeFilter;
				const filterTitle = filter.charAt(0).toUpperCase() + filter.slice(1);

				return (
					<Button
						key={filter}
						variant="light"
						size="md"
						radius="sm"
						data-filter={filter}
						className={`text-base flex-shrink-0 ${isActive ? 'bg-golden-200 text-black-900 pointer-events-none' : ''}`}
						onPress={(e) => handleClickFilter(e, filter)}>
						<span className={`lazy-bg size-6 flex-shrink-0 ${iconMap[filter]}`}></span>

						{filterTitle}
					</Button>
				);
			})}
		</div>
	);
}
