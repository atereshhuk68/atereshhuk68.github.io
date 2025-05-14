/**
 * HeaderLangs component
 * Відображає випадаючий список мов для перемикання локалі.
 * @param {HeaderLangsProps} props - Список мов
 */
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import type { LanguagesListType } from '@i18n/langs';
import { Languages } from 'lucide-react';

type HeaderLangsProps = {
	items: LanguagesListType[];
};

export function HeaderLangs({ items }: HeaderLangsProps) {
	return (
		<Dropdown className="bg-black-100">
			<DropdownTrigger>
				<Button variant="light" isIconOnly startContent={<Languages size={24} />} />
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
