// Uses the real brand SVG file shipped in /public/brand/logo.svg
export default function Logo({ className = 'w-8 h-8', alt = 'Spotivity' }) {
	return (
		<img
			src="/brand/logo.svg"
			alt={alt}
			className={className}
			draggable="false"
		/>
	)
}
