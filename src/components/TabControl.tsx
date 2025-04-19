import { Button, type PressEvent } from '@heroui/react';
import { useState } from 'react';
import { ServiceFilters } from '../data/services';

interface Filter {
	title: string;
	value: string;
	icon: string;
}

interface TabControlProps {
	onPress: (event: PressEvent, filterValue: string) => void;
}

const iconMap: { [key: string]: string } = {
	all: 'service-all-w32',
	manicure: 'service-manicure-w32',
	pedicure: 'service-pedicure-w32',
	eyes: 'service-brows-w32',
	makeup: 'service-makeup-w32',
	massage: 'service-massage-w32',
};

export function TabControl({ onPress }: TabControlProps) {
	const [activeFilter, setActiveFilter] = useState<string>(ServiceFilters[0]?.value || 'all');

	const handleClickFilter = (event: PressEvent, filterValue: string) => {
		setActiveFilter(filterValue);
		onPress(event, filterValue);
	};

	return (
		<div className="flex items-center gap-1">
			{ServiceFilters.map((filter: Filter) => {
				const isActive = filter.value === activeFilter;

				return (
					<Button
						key={filter.value}
						variant="light"
						size="md"
						radius="sm"
						data-filter={filter.value}
						className={`text-base ${isActive ? 'active' : ''}`}
						onPress={(e) => handleClickFilter(e, filter.value)}
						startContent={<span className={`lazy-bg size-6 ${iconMap[filter.icon]}`}></span>}>
						{filter.title}
					</Button>
				);
			})}
		</div>
	);
}
