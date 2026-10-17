import WidgetShell from './WidgetShell'
import Avatar from './Avatar'
import { TOP_ARTISTS } from '../data/mockData'
import { motion } from 'framer-motion'

export default function TopArtistsWidget({ dark = false }) {
	const text = dark ? '#EFFFF8' : '#0F1B14'
	const subtext = dark ? 'rgba(239,255,248,0.55)' : '#6B7570'

	return (
		<WidgetShell label="Top artists · 30d" dark={dark} tilt={-0.5}>
			<ul className="px-3 py-2.5 space-y-2">
				{TOP_ARTISTS.slice(0, 4).map((a, i) => (
					<motion.li
						key={a.name}
						initial={{ opacity: 0, x: -6 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.05 * i }}
						className="flex items-center gap-2.5"
					>
						<span
							className="w-4 text-center font-semibold tabular-nums text-[10px]"
							style={{ color: subtext }}
						>
							{a.rank}
						</span>
						<Avatar letter={a.name[0]} color={a.color} size={28} />
						<div className="flex-1 min-w-0">
							<div
								className="font-semibold text-[11px] truncate"
								style={{ color: text }}
							>
								{a.name}
							</div>
							<div
								className="text-[10px] truncate"
								style={{ color: subtext }}
							>
								{a.genres}
							</div>
						</div>
					</motion.li>
				))}
			</ul>
		</WidgetShell>
	)
}
