import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

const menuItems = [
	{ href: '#services', label: 'Services' },
	{ href: '#aboutUs', label: 'About Us' },
	{ href: '/careers', label: 'Careers' },
];

const activeLinkClasses = 'pointer-events-none text-cove-700';
const baseLinkClasses = 'text-black-900 hover:text-black-600 transition-[color] duration-200';

export function HeaderMenu({ className }: { className?: string }) {
	const isSmallOrMediumScreen = useMediaQuery('(max-width: 1023.98px)');
	const [currentPath, setCurrentPath] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCurrentPath(window.location.pathname + window.location.hash);
		}
	}, []);

	// Mobile/Tablet Menu
	if (isSmallOrMediumScreen) {
		return (
			<div className={className}>
				<Dropdown className="bg-black-100">
					<DropdownTrigger>
						<Button isIconOnly variant="light" aria-label="Menu">
							<Menu size={32} />
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Navigation Menu" items={menuItems}>
						{(item) => {
							const isActive = currentPath === item.href;
							return (
								<DropdownItem key={item.href} href={item.href} className={isActive ? activeLinkClasses : ''}>
									{item.label}
								</DropdownItem>
							);
						}}
					</DropdownMenu>
				</Dropdown>
			</div>
		);
	}

	return (
		<nav className={className}>
			<ul className="hidden lg:flex items-center gap-8 font-medium">
				{menuItems.map((item) => {
					const isActive = currentPath === item.href;
					const linkClasses = `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`;
					return (
						<li key={item.href}>
							<a className={linkClasses.trim()} href={item.href}>
								{item.label}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
