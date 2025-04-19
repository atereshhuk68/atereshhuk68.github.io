import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from '@heroui/react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { Menu } from 'lucide-react';

const menuItems = [
	{ href: '#services', label: 'Services' },
	{ href: '#aboutUs', label: 'About Us' },
	{ href: '/job-opening', label: 'Job opening' },
];

export function HeaderMenu({ className }: { className?: string }) {
	// Matches screen sizes less than 'lg' (1024px by default in Tailwind)
	// Use 'md' (768px) if you specifically want the switch at the medium breakpoint
	const isSmallOrMediumScreen = useMediaQuery('(max-width: 1023.98px)');

	if (isSmallOrMediumScreen) {
		// Render HeroUI Dropdown on smaller screens
		// NOTE: Adapt this structure based on the actual HeroUI Dropdown API
		return (
			<div className={className}>
				<Dropdown className="bg-black-100">
					<DropdownTrigger>
						{/* Use a Button or appropriate element for the trigger */}
						<Button isIconOnly variant="light" aria-label="Menu">
							<Menu size={32} />
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Navigation Menu">
						{menuItems.map((item) => (
							<DropdownItem key={item.href} href={item.href}>
								{/* You might need to wrap DropdownItem content in an <a> or use HeroUI's Link within it if DropdownItem doesn't handle navigation */}
								{item.label}
							</DropdownItem>
						))}
					</DropdownMenu>
				</Dropdown>
			</div>
		);
	}

	// Render the regular list on larger screens (lg and up)
	return (
		<nav className={className}>
			<ul className="hidden lg:flex items-center gap-8 font-medium">
				{menuItems.map((item) => (
					<li key={item.href}>
						<Link className="text-black-900 hover:text-black-600 transition-[color] duration-200" color="foreground" href={item.href}>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
