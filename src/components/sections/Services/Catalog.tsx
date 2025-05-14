import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useCatalogStore } from 'src/store/CatalogStore';
import type { Service } from 'src/types/types';
import { ServiceCard } from './ServiceCard';

type CatalogProps = {
	services: Service[];
	ctaText: string;
};

export function Catalog({ services }: CatalogProps) {
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
