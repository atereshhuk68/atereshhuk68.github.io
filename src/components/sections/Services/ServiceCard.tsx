import { motion } from "framer-motion";
import type { Service, ServiceListItem } from "../../../types";

function ServiceRow({ title, price, description, currency }: ServiceListItem) {
  return (
    <li className="flex justify-between gap-2 pb-2">
      <div className="flex flex-col">
        <span>{title}</span>
        {description && (
          <span className="text-black-600 text-sm">{description}</span>
        )}
      </div>
      <span className="flex flex-shrink-0 items-baseline gap-1 font-medium">
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
      <div className="bg-black-100 h-full min-h-[280px] space-y-4 rounded-lg p-6">
        <strong className="font-heading flex text-2xl">{name}</strong>

        <ul className="divide-black-200 space-y-2 divide-y-1">
          {list.map((item) => (
            <ServiceRow key={item.title} {...item} />
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
