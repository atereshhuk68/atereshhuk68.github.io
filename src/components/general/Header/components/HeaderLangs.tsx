import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { Languages } from 'lucide-react';
import type { Locales } from 'src/types';

interface HeaderLangsProps {
	items: {
		locale: Locales;
		name: string;
		href: string;
	}[];
}

export function HeaderLangs({ items }: HeaderLangsProps) {
	return (
		<Dropdown className="bg-black-100" shouldBlockScroll={false}>
			<DropdownTrigger>
				<Button variant="light" isIconOnly startContent={<Languages size={24} />} aria-label="Open languages menu" />
			</DropdownTrigger>
			<DropdownMenu aria-label="List of languages" items={items}>
				{({ href, name }: { href: string; name: string }) => (
					<DropdownItem key={name} href={href}>
						{name}
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	);
}
