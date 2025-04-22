import { motion } from 'framer-motion';
import type { ServiceCardProps, ServiceProps } from '../../../types/types';

function ServiceRow({ title, price, description, currency }: ServiceProps) {
	return (
		<li className="flex justify-between gap-2 pt-2">
			<div className="flex flex-col">
				<span>{title}</span>
				{description && <span className="text-sm text-black-600">{description}</span>}
			</div>
			<span className="flex items-baseline gap-1 flex-shrink-0 font-medium">
				{price}
				{currency ? <span>{currency}</span> : ' zł'}
			</span>
		</li>
	);
}

export function ServiceCard({ name, services }: ServiceCardProps) {
	return (
		<motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
			<div className="p-6 space-y-4 h-full bg-black-100 rounded-lg min-h-[280px]">
				<strong className="text-2xl font-heading">{name}</strong>

				<ul className="space-y-2 divide-y-1 divide-black-200">
					{services.map(({ title, ...props }: ServiceProps) => (
						<ServiceRow title={title} key={title} {...props} />
					))}
				</ul>
			</div>
		</motion.div>
	);
}
