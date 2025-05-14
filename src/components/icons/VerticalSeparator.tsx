import cx from 'classix';

/**
 * VerticalSeparator component
 * Відображає вертикальний роздільник у вигляді SVG.
 * @param {VerticalSeparatorProps} props - Додаткові класи для SVG
 */
type VerticalSeparatorProps = {
	className?: string;
};

export function VerticalSeparator({ className }: VerticalSeparatorProps) {
	return (
		<svg className={cx(className)} xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" aria-hidden="true" focusable="false">
			<rect width={1} height={24} x={12} fill="#B0BBC9" rx={0.5} />
		</svg>
	);
}
