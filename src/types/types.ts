import type { CollectionEntry } from 'astro:content';
import type { ReactNode } from 'react';

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
