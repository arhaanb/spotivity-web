import Logo from '../Logo'
import { motion } from 'framer-motion'

// Mirrors the in-app card: plain surface, logo + label header, hairline divider.
export default function WidgetShell({
	label,
	children,
	dark = false,
	className = '',
	tilt = -0.6
}) {
	return (
		<motion.div
			whileHover={{ y: -4, rotate: tilt }}
			transition={{ type: 'spring', stiffness: 220, damping: 20 }}
			className={`relative w-full overflow-hidden rounded-[22px] ${
				dark
					? 'bg-[#16201A] ring-1 ring-white/[0.08] shadow-[0_28px_60px_-20px_rgba(0,0,0,0.6)]'
					: 'bg-white ring-1 ring-ink/[0.06] shadow-card'
			} ${className}`}
		>
			<div
				className={`flex items-center gap-2 px-4 py-3 border-b ${
					dark ? 'border-white/[0.07]' : 'border-ink/[0.06]'
				}`}
			>
				<Logo className="w-4 h-4" />
				<span
					className={`text-[11.5px] font-semibold tracking-tight ${
						dark ? 'text-mint-50' : 'text-ink'
					}`}
				>
					{label}
				</span>
			</div>
			<div className={dark ? 'text-mint-50' : 'text-ink'}>{children}</div>
		</motion.div>
	)
}
