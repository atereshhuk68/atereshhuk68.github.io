import { motion } from "framer-motion";
import type { Service, ServiceListItem } from "../../../types";

function ServiceRow({ title, price, description, currency }: ServiceListItem) {
	return (
		<li className="flex justify-between gap-2 pb-2">
			<div className="flex flex-col">
				<span>{title}</span>
				{description && (
					<span className="text-sm text-black-600">{description}</span>
				)}
			</div>
			<span className="flex items-baseline gap-1 flex-shrink-0 font-medium">
				{price}
				<span>{currency ?? " zł"}</span>
			</span>
		</li>
	);
}

export function ServiceCard({ name, list }: Service) {
	return (
		<motion.div
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="p-6 space-y-4 h-full bg-black-100 rounded-lg min-h-[280px]">
				<strong className="flex text-2xl font-heading">{name}</strong>

				<ul className="space-y-2 divide-y-1 divide-black-200">
					{list.map((item) => (
						<ServiceRow key={item.title} {...item} />
					))}
				</ul>
			</div>
		</motion.div>
	);
}
