// Subtle pill used for status indicators (e.g. "Live · 130k+ downloads"). Use sparingly.
export default function Tag({ className = '', children, ...rest }) {
	return (
		<span
			className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[0.78rem] font-medium bg-mint-50 border border-ink/[0.08] text-ink whitespace-nowrap ${className}`}
			{...rest}
		>
			{children}
		</span>
	)
}
