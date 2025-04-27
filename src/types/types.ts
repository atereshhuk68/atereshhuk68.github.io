export type CareerCardType = {
	frontmatter: {
		title: string;
		description: string;
		location: string;
	};
	url: string;
};

export type ServiceCategory = {
	title: string;
	price: number | string;
	description?: string;
};

export type Service = {
	id: string;
	name: string;
	services: ServiceCategory[];
	type: string;
};
