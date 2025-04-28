import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { type LanguagesListType } from '@i18n/langs';
import { Languages } from 'lucide-react';

export function HeaderLangs({ items }: { items: LanguagesListType[] }) {
	return (
		<Dropdown className="bg-black-100">
			<DropdownTrigger>
				<Button variant="light" isIconOnly startContent={<Languages size={24} />}></Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Static Actions" items={items}>
				{({ href, name }) => (
					<DropdownItem key={name} href={href}>
						{name}
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	);
}
