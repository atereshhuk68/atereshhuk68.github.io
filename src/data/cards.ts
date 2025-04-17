export const Filters = [
	{
		title: 'All',
		value: 'all',
	},
	{
		title: 'Manicure',
		value: 'manicure',
	},
	{
		title: 'Pedicure',
		value: 'pedicure',
	},
	{
		title: 'Eyes',
		value: 'eyes',
	},
];

export const CardsData = [
	{
		id: 1,
		name: 'Manicure',
		services: [
			{
				title: 'Manicure',
				price: 80,
			},
			{
				title: 'Men’s Manicure',
				price: 100,
			},
			{
				title: 'Japanese Manicure',
				price: 130,
			},
			{
				title: 'Manicure with regular polish',
				price: 130,
			},
			{
				title: 'Manicure with gel polish',
				price: 130,
				description: '(hybrid)',
			},
			{
				title: 'Combo Manicure',
				price: 150,
				description: '(gel polish removal, manicure, gel polish)',
			},
		],
		type: 'manicure',
	},
	{
		id: 2,
		name: 'Nail Extensions',
		services: [
			{
				title: 'Short',
				price: 200,
			},
			{
				title: 'Medium',
				price: 220,
			},
			{
				title: 'Long',
				price: 250,
			},
		],
		type: 'manicure',
	},
	{
		id: 3,
		name: 'Nail extension Correction',
		services: [
			{
				title: 'Short',
				price: 180,
			},
			{
				title: 'Medium',
				price: 200,
			},
			{
				title: 'Long',
				price: 220,
			},
		],
		type: 'manicure',
	},
	{
		id: 4,
		name: 'Slay Nails',
		services: [
			{
				title: 'Standard',
				price: 300,
				description: '(extensions and any complexity of design)',
			},
			{
				title: 'Extra',
				price: 350,
				description: '(super long length and any complexity of design)',
			},
		],
		type: 'manicure',
	},
	{
		id: 5,
		name: 'Extras',
		services: [
			{
				title: 'Nail strengthening',
				price: 40,
			},
			{
				title: 'Tip strengthening',
				price: 30,
			},
			{
				title: 'Nail design',
				price: '5-15',
				currency: 'zł / nail',
			},
			{
				title: 'Gel polish removal',
				price: 30,
			},
			{
				title: 'Nail repair',
				price: 15,
			},
		],
		type: 'manicure',
	},
	{
		id: 6,
		name: 'Pedicure',
		services: [
			{
				title: 'Hygienic Pedicure',
				price: 110,
			},
			{
				title: 'Men’s Pedicure',
				price: 130,
			},
			{
				title: 'Japanese Pedicure',
				price: 150,
			},
			{
				title: 'Pedicure with regular polish',
				price: 130,
			},
			{
				title: 'Pedicure with gel polish',
				price: 170,
				description: '(hybrid)',
			},
			{
				title: 'Combo Pedicure',
				price: 190,
				description: '(gel polish removal, pedicure, gel polish)',
			},
		],
		type: 'pedicure',
	},
	{
		id: 7,
		name: 'Brows',
		services: [
			{
				title: 'Shape correction',
				price: 50,
			},
			{
				title: 'Full shaping',
				price: 70,
			},
			{
				title: 'Tinting',
				price: 60,
			},
			{
				title: 'Brow lamination',
				price: 100,
			},
			{
				title: 'Brow lamination combo',
				price: 200,
				description: '(shaping, tinting)',
			},
		],
		type: 'eyes',
	},
];
