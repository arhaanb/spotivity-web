import WidgetShell from './WidgetShell'
import AlbumArt from './AlbumArt'
import { TOP_SONGS } from '../data/mockData'
import { motion } from 'framer-motion'

export default function TopSongsWidget({ dark = false }) {
	const text = dark ? '#EFFFF8' : '#0F1B14'
	const subtext = dark ? 'rgba(239,255,248,0.55)' : '#6B7570'

	return (
		<WidgetShell label="Top songs · 30d" dark={dark} tilt={0.5}>
			<ul className="px-3 py-2.5 space-y-2">
				{TOP_SONGS.slice(0, 4).map((s, i) => (
					<motion.li
						key={s.title}
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
							{s.rank}
						</span>
						<AlbumArt color={s.color} size={28} rounded={5} />
						<div className="flex-1 min-w-0">
							<div
								className="font-semibold text-[11px] truncate"
								style={{ color: text }}
							>
								{s.title}
							</div>
							<div
								className="text-[10px] truncate"
								style={{ color: subtext }}
							>
								{s.artist}
							</div>
						</div>
					</motion.li>
				))}
			</ul>
		</WidgetShell>
	)
}
