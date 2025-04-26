import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { LanguagesList } from '@i18n/langs';
import { Languages as LanguagesIcon } from 'lucide-react';

export function HeaderLangs() {
	return (
		<Dropdown className="bg-black-100">
			<DropdownTrigger>
				<Button variant="light" isIconOnly startContent={<LanguagesIcon size={24} />}></Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Static Actions" items={LanguagesList}>
				{({ href, name }) => (
					<DropdownItem key={name} href={href}>
						{name}
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	);
}
