import { Button, type PressEvent } from '@heroui/react';
import { Eye, EyeClosed, Footprints, Hand, Scroll } from 'lucide-react';

interface TabControlProps {
	onPress: (event: PressEvent) => void;
}

export function TabControl({ onPress: handleClickFilter }: TabControlProps) {
	return (
		<div className="flex items-center gap-1">
			<Button
				variant="light"
				size="md"
				disableRipple={true}
				radius="sm"
				data-filter="all"
				className="text-base active"
				onPress={handleClickFilter}
				startContent={<Scroll size={16} />}>
				All
			</Button>
			<Button
				variant="light"
				size="md"
				disableRipple={true}
				radius="sm"
				data-filter="manicure"
				className="text-base"
				onPress={handleClickFilter}
				startContent={<EyeClosed size={16} />}>
				Manicure
			</Button>
			<Button
				variant="light"
				size="md"
				disableRipple={true}
				radius="sm"
				data-filter="pedicure"
				className="text-base"
				onPress={handleClickFilter}
				startContent={<Footprints size={16} />}>
				Pedicure
			</Button>
			<Button variant="light" size="md" disableRipple={true} radius="sm" data-filter="eyes" className="text-base" onPress={handleClickFilter} startContent={<Eye size={16} />}>
				Eyes
			</Button>
		</div>
	);
}
