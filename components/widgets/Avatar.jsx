export default function Avatar({ letter, color, size = 30 }) {
	return (
		<div
			className="flex-shrink-0 grid place-items-center font-bold text-white select-none"
			style={{
				width: size,
				height: size,
				borderRadius: '50%',
				fontSize: size * 0.42,
				background: `radial-gradient(circle at 30% 25%, ${lighten(color)}, ${color})`,
				boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)'
			}}
			aria-hidden="true"
		>
			{letter.toUpperCase()}
		</div>
	)
}

function lighten(hex) {
	const num = parseInt(hex.replace('#', ''), 16)
	const r = Math.min(255, (num >> 16) + 35)
	const g = Math.min(255, ((num >> 8) & 0xff) + 35)
	const b = Math.min(255, (num & 0xff) + 35)
	return `rgb(${r}, ${g}, ${b})`
}
