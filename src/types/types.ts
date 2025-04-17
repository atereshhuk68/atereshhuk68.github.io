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

export type CardServiceTypes = {
	id: number;
	name: string;
	services: ServiceProps[];
	type: string;
};
