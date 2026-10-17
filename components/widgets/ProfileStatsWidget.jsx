import WidgetShell from './WidgetShell'
import AlbumArt from './AlbumArt'
import Avatar from './Avatar'
import { motion } from 'framer-motion'

export default function ProfileStatsWidget({ dark = false }) {
	const text = dark ? '#EFFFF8' : '#0F1B14'
	const subtext = dark ? 'rgba(239,255,248,0.55)' : '#6B7570'

	return (
		<WidgetShell label="Your stats" dark={dark} tilt={0.5}>
			<div className="px-4 py-3.5">
				<div className="flex items-center gap-3">
					<Avatar letter="A" color="#3BCE90" size={36} />
					<div>
						<div
							className="font-semibold text-[13px]"
							style={{ color: text }}
						>
							arhaan
						</div>
						<div className="text-[10px]" style={{ color: subtext }}>
							218 followers
						</div>
					</div>
				</div>
				<div className="mt-3.5 flex items-center gap-2">
					<AlbumArt color="#0E0E0E" size={36} rounded={6} />
					<div className="min-w-0">
						<div className="text-[9.5px] font-bold uppercase tracking-wider" style={{ color: '#2BB87B' }}>
							● Listening now
						</div>
						<div
							className="font-semibold text-[11.5px] truncate"
							style={{ color: text }}
						>
							After Hours
						</div>
						<div className="text-[10px] truncate" style={{ color: subtext }}>
							The Weeknd
						</div>
					</div>
				</div>
				<div className="mt-3 grid grid-cols-3 gap-2">
					<Stat label="songs" value="1.2k" color={subtext} text={text} />
					<Stat label="artists" value="312" color={subtext} text={text} />
					<Stat label="minutes" value="14h" color={subtext} text={text} />
				</div>
			</div>
		</WidgetShell>
	)
}

function Stat({ label, value, color, text }) {
	return (
		<div className="text-center">
			<div className="font-semibold text-[14px]" style={{ color: text }}>
				{value}
			</div>
			<div className="text-[9px] uppercase tracking-wider" style={{ color }}>
				{label}
			</div>
		</div>
	)
}
