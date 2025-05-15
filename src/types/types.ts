export type CareerCardType = {
	frontmatter: {
		title: string;
		description: string;
		location: string;
	};
	url: string;
};

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
	type: 'visage' | 'massage' | 'nails';
};

export type Locales = 'en' | 'pl' | 'uk' | 'ru';

export type LanguagesTypes = {
	[key in Locales]: string;
};

export type LanguageListTypes = {
	locale: Locales;
	href: string;
	name: string;
};

export type LanguagesListType = {
	locale: Locales;
	href: string;
	name: string;
};
