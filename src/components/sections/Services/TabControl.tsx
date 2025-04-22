import { Button } from '@heroui/react';
import { useServicesStore } from 'src/store/servicesStore';

interface TabControlProps {
	onPress: (filterValue: string) => void;
	filters: string[];
	activeFilter: string;
}

const iconMap: { [key: string]: string } = {
	all: 'service-list-w64',
	nails: 'service-nails-w64',
	visage: 'service-visage-w64',
	massage: 'service-massage-w64',
};

export function TabControl() {
	const { activeFilter, filters, setFilter } = useServicesStore();

	return (
		<div className="grid grid-cols-2 sm:flex flex-nowrap items-center gap-1 overflow-x-auto">
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
						className={`text-base px-8 flex-shrink-0 ${isActive ? 'bg-golden-200 text-black-900 pointer-events-none' : ''}`}
						onPress={() => setFilter(filter)}
						aria-pressed={isActive}>
						<span className={`lazy-bg size-5 flex-shrink-0 ${iconMap[filter]}`}></span>
						{filterTitle}
					</Button>
				);
			})}
		</div>
	);
}
