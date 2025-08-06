import type { CompanyDefaultDataType } from '../company';

export type CareerDataType = {
	title: string;
	description: string;
	city: string;
	country: string;
};

export type CareerCardType = {
	frontmatter: CareerDataType;
	url: string;
};

export type CareerPostSchema = CareerDataType & CompanyDefaultDataType;
