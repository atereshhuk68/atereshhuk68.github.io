import type { Service } from '@/types';
import { shuffle } from 'es-toolkit';
import { atom, computed } from 'nanostores';

export const $services = atom<Service[]>([]);
export const $activeServiceType = atom<string>('all');

export const getServices = () => $services.get();

export const $servicesFiltered = computed([$services, $activeServiceType], (services, activeServiceType) => {
	return activeServiceType === 'all' ? shuffle(services) : services.filter((service) => service.type === activeServiceType);
});

export const initServicesStore = (services: Service[]) => {
	if (getServices().length > 0) return;
	$services.set(shuffle(services));
};

export const setActiveServiceType = (filterValue: string) => {
	$activeServiceType.set(filterValue);
};
