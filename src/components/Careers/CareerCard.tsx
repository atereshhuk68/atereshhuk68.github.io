import { Card, CardBody, CardFooter, CardHeader, Chip, Divider } from '@heroui/react';
import { Briefcase, MapPin } from 'lucide-react';

export function CareerCard({ ...career }) {
	const {
		frontmatter: { title, description, location },
		url,
	} = career;

	return (
		<Card>
			<CardHeader className="grid gap-3 grid-cols-[max-content_1fr] items-start">
				<Briefcase size={24} />
				<div className="grid content-start gap-1">
					<p className="text-md font-medium">{title}</p>
					<div className="flex items-center gap-1 text-small text-default-500">
						<MapPin size={16} />
						<span className="text-sm">{location}</span>
					</div>
				</div>
			</CardHeader>

			<Divider />

			<CardBody>
				<p>{description}</p>
			</CardBody>

			<Divider />

			<CardFooter className="flex items-center gap-2 justify-between">
				<Chip color="success" className="text-white">
					Open
				</Chip>

				<a className="text-sm text-cove-600 hover:text-cove-600/75" href={url}>
					Details
				</a>
			</CardFooter>
		</Card>
	);
}
