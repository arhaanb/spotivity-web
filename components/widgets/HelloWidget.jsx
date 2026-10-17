import WidgetShell from './WidgetShell'
import Avatar from './Avatar'
import { FRIENDS } from '../data/mockData'
import { Disc3, ListMusic, Mic } from 'lucide-react'
import { motion } from 'framer-motion'

const ICONS = {
	album: Disc3,
	playlist: ListMusic,
	artist: Mic
}

export default function HelloWidget({ dark = false, count = 4 }) {
	const friends = FRIENDS.slice(0, count)
	const subtext = dark ? 'rgba(239,255,248,0.55)' : '#6B7570'
	const text = dark ? '#EFFFF8' : '#0F1B14'

	return (
		<WidgetShell label="All friends" dark={dark}>
			<ul className="px-3 py-2.5 space-y-2.5">
				{friends.map((f, i) => {
					const Icon = ICONS[f.context.type]
					return (
						<motion.li
							key={f.name}
							initial={{ opacity: 0, x: -6 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.05 * i }}
							className="flex items-center gap-2.5"
						>
							<div className="relative">
								<Avatar letter={f.avatar} color={f.color} size={28} />
								{f.nowPlaying && (
									<span
										className="absolute -bottom-0.5 -right-0.5 block w-2.5 h-2.5 rounded-full"
										style={{
											background: '#3BCE90',
											boxShadow: '0 0 0 2px ' + (dark ? '#16201A' : '#fff')
										}}
									/>
								)}
							</div>
							<div className="flex-1 min-w-0">
								<span
									className="font-semibold text-[11.5px] truncate block"
									style={{ color: text }}
								>
									{f.name}
								</span>
								<div className="flex items-center gap-1 mt-0.5">
									<Icon
										className="w-2.5 h-2.5 flex-shrink-0"
										style={{ color: subtext }}
									/>
									<span
										className="text-[10px] truncate"
										style={{ color: subtext }}
									>
										{f.track} — {f.artist}
									</span>
								</div>
							</div>
						</motion.li>
					)
				})}
			</ul>
		</WidgetShell>
	)
}
