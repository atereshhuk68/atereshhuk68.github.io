/**
 * HeaderLangs component
 * Відображає випадаючий список мов для перемикання локалі.
 * @param {HeaderLangsProps} props - Список мов
 */
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import type { LanguagesListType } from '@i18n/langs';
import { Languages } from 'lucide-react';
import type { ReactNode } from 'react';

interface HeaderLangsProps {
	items: LanguagesListType[];
}

export function HeaderLangs({ items }: HeaderLangsProps) {
	return (
		<Dropdown className="bg-black-100" shouldBlockScroll={false}>
			<DropdownTrigger>
				<Button variant="light" isIconOnly startContent={<Languages size={24} />} aria-label="Open languages menu" />
			</DropdownTrigger>
			<DropdownMenu aria-label="Static Actions" items={items}>
				{({ href, name }: LanguagesListType) => (
					<DropdownItem key={name} href={href}>
						{name}
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	);
}
