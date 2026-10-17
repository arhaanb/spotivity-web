import WidgetShell from './WidgetShell'
import Avatar from './Avatar'
import AlbumArt from './AlbumArt'
import { FRIENDS } from '../data/mockData'
import { motion } from 'framer-motion'

export default function BestFriendWidget({ dark = false, friend }) {
	const f = friend || FRIENDS[1]
	const text = dark ? '#EFFFF8' : '#0F1B14'
	const subtext = dark ? 'rgba(239,255,248,0.55)' : '#6B7570'

	return (
		<WidgetShell label="Best friend" dark={dark} tilt={0.6}>
			<div className="px-4 py-4">
				<div className="flex items-center gap-3">
					<div className="relative">
						<Avatar letter={f.avatar} color={f.color} size={42} />
						<motion.span
							animate={{ scale: [1, 1.18, 1] }}
							transition={{ duration: 1.6, repeat: Infinity }}
							className="absolute -bottom-0.5 -right-0.5 block w-3 h-3 rounded-full"
							style={{
								background: '#3BCE90',
								boxShadow: '0 0 0 2px ' + (dark ? '#16201A' : '#fff')
							}}
						/>
					</div>
					<div>
						<div
							className="font-semibold text-[13px]"
							style={{ color: text }}
						>
							{f.name}
						</div>
						<div
							className="text-[10px] font-medium"
							style={{ color: '#2BB87B' }}
						>
							Now playing
						</div>
					</div>
				</div>
				<div className="mt-4 flex items-center gap-2.5">
					<AlbumArt color={f.albumColor} size={44} />
					<div className="min-w-0">
						<div
							className="font-semibold text-[12px] truncate"
							style={{ color: text }}
						>
							{f.track}
						</div>
						<div
							className="text-[10.5px] truncate"
							style={{ color: subtext }}
						>
							{f.artist}
						</div>
					</div>
				</div>
			</div>
		</WidgetShell>
	)
}
