import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import cx from 'classix';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * HeaderMenu component
 * Відображає меню навігації з адаптацією під мобільні пристрої.
 * @param {HeaderMenuProps} props - Список пунктів меню та додатковий клас
 */
interface HeaderMenuItem {
	label: string;
	href: string;
}

interface HeaderMenuProps {
	menuItems: HeaderMenuItem[];
	className?: string;
}

const ACTIVE_LINK_CLASSES = 'pointer-events-none text-cove-700';
const BASE_LINK_CLASSES = 'text-black-900 hover:text-black-600 transition-[color] duration-200';

export function HeaderMenu({ className, menuItems = [] }: HeaderMenuProps) {
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
				<Dropdown className="bg-black-100" shouldBlockScroll={false}>
					<DropdownTrigger>
						<Button isIconOnly variant="light" aria-label="Menu">
							<Menu size={32} />
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Navigation Menu" items={menuItems}>
						{(item: HeaderMenuItem) => {
							const isActive = currentPath === item.href;
							return (
								<DropdownItem key={item.href} href={item.href} className={cx(BASE_LINK_CLASSES, isActive && ACTIVE_LINK_CLASSES)}>
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
					return (
						<li key={item.href}>
							<a className={cx(BASE_LINK_CLASSES, isActive && ACTIVE_LINK_CLASSES)} href={item.href}>
								{item.label}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
