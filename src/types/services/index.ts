export type ServiceListItem = {
	title: string;
	price: number | string;
	description?: string;
	currency?: string;
};

export type Service = {
	id: number;
	name: string;
	list: ServiceListItem[];
	type: "visage" | "massage" | "nails" | "eyelashes";
};
