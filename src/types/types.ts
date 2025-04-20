import type { CollectionEntry } from 'astro:content';

export type ServiceProps = {
	title: string;
	price: number | string;
	description?: string;
	currency?: string;
};
export type ServiceCardProps = {
	name: string;
	services: ServiceProps[];
};

export type CareerCardTypes = CollectionEntry<'careers'>;

export type ServiceCardTypes = CollectionEntry<'services'>;

export type ServicesDataTypes = CollectionEntry<'services'>['data'];
