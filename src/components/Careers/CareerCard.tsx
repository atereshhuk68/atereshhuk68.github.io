import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Link } from '@heroui/react';
import { Briefcase, MapPin } from 'lucide-react';
import type { CareerCardTypes } from 'src/types/types';

export function CareerCard({ ...career }: CareerCardTypes) {
	const { data, id: slug } = career;
	return (
		<Card>
			<CardHeader className="grid gap-3 grid-cols-[max-content_1fr] items-start">
				<Briefcase size={24} />
				<div className="grid content-start gap-1">
					<p className="text-md font-medium">{data.title}</p>
					<div className="flex items-center gap-1 text-small text-default-500">
						<MapPin size={16} />
						<span className="text-sm">{data.location}</span>
					</div>
				</div>
			</CardHeader>

			<Divider />

			<CardBody>
				<p>{data.description}</p>
			</CardBody>

			<Divider />

			<CardFooter className="flex items-center gap-2 justify-between">
				<Chip color="success" className="text-white">
					Open
				</Chip>

				<Link size="sm" href={`/careers/${slug}`}>
					Details
				</Link>
			</CardFooter>
		</Card>
	);
}
