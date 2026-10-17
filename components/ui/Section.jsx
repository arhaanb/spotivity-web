// Single section padding rhythm — every section uses this. `tight` for connector sections.
export default function Section({
	tight = false,
	bg = 'paper',
	className = '',
	children,
	...rest
}) {
	const padding = tight
		? 'py-10 md:py-14'
		: 'py-20 md:py-28'
	const bgs = {
		paper: 'bg-cream',
		'paper-2': 'bg-cream-200',
		ink: 'bg-ink text-mint-50',
		mint: 'bg-mint text-ink',
		none: ''
	}
	return (
		<section
			className={`relative ${padding} ${bgs[bg] || ''} ${className}`}
			{...rest}
		>
			{children}
		</section>
	)
}
