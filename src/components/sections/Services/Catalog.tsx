import { useCatalogStore } from '@/stores/catalog-store/catalog-store';
import type { Service } from '@/types';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { ServiceCard } from './ServiceCard';

export function Catalog({ services }: { services: Service[] }) {
	const { catalogFiltered, setCatalog } = useCatalogStore();

	useEffect(() => {
		setCatalog(services);
	}, [services, setCatalog]);

	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4" data-service-card>
			<AnimatePresence>
				{catalogFiltered.map((service: Service) => (
					<ServiceCard key={service.id} {...service} />
				))}
			</AnimatePresence>
		</div>
	);
}
