import { Button } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useServicesStore } from 'src/store/servicesStore';
import type { Service } from 'src/types/types';
import { ServiceCard } from './ServiceCard';
import { TabControl } from './TabControl';

export function Services({ services }: { services: Service[] }) {
	const { filteredCards, showAll, setServices, showAllCards } = useServicesStore();

	useEffect(() => {
		setServices(services);
	}, [services, setServices]);

	return (
		<>
			<TabControl />

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4" data-service-card>
				<AnimatePresence>
					{filteredCards.map(({ id, name, services: serviceItems }: Service) => (
						<ServiceCard key={id} name={name} services={serviceItems} />
					))}
				</AnimatePresence>
			</div>

			{!showAll && (
				<motion.div className="flex justify-center mt-8" data-all-services>
					<Button size="md" variant="solid" className="bg-golden-200 text-black-900 font-medium" onPress={showAllCards}>
						Display all services
					</Button>
				</motion.div>
			)}
		</>
	);
}
