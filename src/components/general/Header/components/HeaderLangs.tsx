import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function HeaderLangs() {
	const [open, setOpen] = useState(false);

	const handleOpenChange = (open: boolean) => {
		setOpen(open);
	};

	return (
		<Dropdown onOpenChange={handleOpenChange}>
			<DropdownTrigger>
				<Button variant="bordered" endContent={open ? <ChevronUp /> : <ChevronDown />}>
					Open Menu
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Static Actions">
				<DropdownItem key="new">New file</DropdownItem>
				<DropdownItem key="copy">Copy link</DropdownItem>
				<DropdownItem key="edit">Edit file</DropdownItem>
				<DropdownItem key="delete" className="text-danger" color="danger">
					Delete file
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
