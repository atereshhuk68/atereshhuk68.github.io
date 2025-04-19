import cx from 'classix';

export function VerticalSeparator({ className }: { className?: string }) {
	return (
		<svg className={cx(className)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
			<rect width="1" height="24" x="12" fill="#B0BBC9" rx=".5" />
		</svg>
	);
}
