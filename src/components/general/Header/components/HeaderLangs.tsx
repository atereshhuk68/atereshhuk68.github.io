import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { Languages } from 'lucide-react';
import { useState } from 'react';

export function HeaderLangs() {
	const [open, setOpen] = useState(false);

	const handleOpenChange = (open: boolean) => {
		setOpen(open);
	};

	return (
		<Dropdown onOpenChange={handleOpenChange} className="bg-black-100">
			<DropdownTrigger>
				<Button variant="light" isIconOnly={true} startContent={<Languages size={24} />}>
					{' '}
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Static Actions">
				<DropdownItem key="new">Polski</DropdownItem>
				<DropdownItem key="copy">Українська</DropdownItem>
				<DropdownItem key="edit">Русский</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
