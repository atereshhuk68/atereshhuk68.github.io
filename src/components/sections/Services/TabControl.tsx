/**
 * TabControl component
 * Відображає таби для фільтрації сервісів.
 */
import { Button, type PressEvent } from '@heroui/react';
import { useTranslations } from 'src/i18n/utils';
import { useCatalogStore } from 'src/store/CatalogStore';
import type { Locales } from 'src/types/types';

const ICON_MAP: Record<string, string> = {
	all: 'service-list-w64',
	nails: 'service-nails-w64',
	visage: 'service-visage-w64',
	massage: 'service-massage-w64',
};

export function TabControl() {
	const { activeFilter, filters, setActiveFilter } = useCatalogStore();
	const currentLocale = (typeof window !== 'undefined' && window.location.pathname.split('/')[1]) || 'pl';
	const t = useTranslations(currentLocale as Locales);

	const handlePressSetActiveFilter = (event: PressEvent) => {
		const pressedButton = event.target as HTMLButtonElement;
		const filter = pressedButton.dataset.filter || 'all';
		setActiveFilter(filter);
	};

	return (
		<div className="grid grid-cols-2 sm:flex flex-nowrap items-center gap-1 overflow-x-auto">
			{filters.map((filter: string) => {
				const isActive = filter === activeFilter;
				const filterTitle = t(`services.filter.${filter}` as any);
				return (
					<Button
						key={filter}
						variant="light"
						size="md"
						radius="sm"
						data-filter={filter}
						className={`text-base px-8 flex-shrink-0 ${isActive ? 'bg-golden-200 text-black-900 pointer-events-none' : ''}`}
						onPress={handlePressSetActiveFilter}
						aria-pressed={isActive}>
						<span className={`lazy-bg size-5 flex-shrink-0 ${ICON_MAP[filter]}`} />
						{filterTitle}
					</Button>
				);
			})}
		</div>
	);
}
