import WidgetShell from './WidgetShell'
import AlbumArt from './AlbumArt'
import { FRIENDS } from '../data/mockData'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

// Aggregates friends listening to common songs — picks tracks with >1 listener
export default function PopularWidget({ dark = false }) {
	const text = dark ? '#EFFFF8' : '#0F1B14'
	const subtext = dark ? 'rgba(239,255,248,0.55)' : '#6B7570'

	// Synthesize "popular with friends" — first 3 tracks with mock listener counts
	const popular = [
		{
			track: 'Pink Pony Club',
			artist: 'Chappell Roan',
			color: '#FF8DC8',
			listeners: 4
		},
		{
			track: 'espresso',
			artist: 'Sabrina Carpenter',
			color: '#F5C6A0',
			listeners: 3
		},
		{
			track: 'Saturn',
			artist: 'SZA',
			color: '#1B3A2F',
			listeners: 2
		}
	]

	return (
		<WidgetShell label="Popular with friends" dark={dark} tilt={-0.4}>
			<ul className="px-3 py-2.5 space-y-2.5">
				{popular.map((p, i) => (
					<motion.li
						key={p.track}
						initial={{ opacity: 0, y: 6 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.05 * i }}
						className="flex items-center gap-2.5"
					>
						<AlbumArt color={p.color} size={32} rounded={6} />
						<div className="flex-1 min-w-0">
							<div
								className="font-semibold text-[11.5px] truncate"
								style={{ color: text }}
							>
								{p.track}
							</div>
							<div
								className="flex items-center gap-1 text-[10px] truncate"
								style={{ color: subtext }}
							>
								<TrendingUp className="w-2.5 h-2.5" />
								<span>{p.listeners} friends</span>
								<span>· {p.artist}</span>
							</div>
						</div>
					</motion.li>
				))}
			</ul>
		</WidgetShell>
	)
}
