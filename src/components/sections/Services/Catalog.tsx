import { $servicesFiltered, initServicesStore } from '@/stores/catalog-store/services-store';
import type { Service } from '@/types';
import { useStore } from '@nanostores/react';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { ServiceCard } from './ServiceCard';

export function Catalog({ services }: { services: Service[] }) {
	const servicesFiltered = useStore($servicesFiltered);

	useEffect(() => {
		initServicesStore(services);
	}, [services]);

	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:col-span-2 gap-5 mt-4" data-service-card>
			<AnimatePresence>
				{servicesFiltered.map((service: Service) => (
					<ServiceCard key={service.id} {...service} />
				))}
			</AnimatePresence>
		</div>
	);
}
