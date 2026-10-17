// Placeholder album cover: a soft two-tone gradient with a gentle highlight.
export default function AlbumArt({ color = '#19B169', size = 36, rounded = 8 }) {
	return (
		<div
			className="relative overflow-hidden flex-shrink-0 ring-1 ring-inset ring-black/5"
			style={{
				width: size,
				height: size,
				borderRadius: rounded,
				background: `linear-gradient(140deg, ${shade(color, 28)}, ${color} 55%, ${shade(color, -26)})`
			}}
			aria-hidden="true"
		>
			<div
				className="absolute inset-0"
				style={{
					background:
						'radial-gradient(circle at 25% 20%, rgba(255,255,255,0.28), transparent 55%)'
				}}
			/>
		</div>
	)
}

function shade(hex, amt) {
	const num = parseInt(hex.replace('#', ''), 16)
	const c = (v) => Math.max(0, Math.min(255, v + amt))
	return `rgb(${c(num >> 16)}, ${c((num >> 8) & 0xff)}, ${c(num & 0xff)})`
}
