import HelloWidget from './widgets/HelloWidget'
import BestFriendWidget from './widgets/BestFriendWidget'
import TopSongsWidget from './widgets/TopSongsWidget'
import TopArtistsWidget from './widgets/TopArtistsWidget'

const PRESETS = {
	'sharing-music-with-friends-in-2026': {
		bg: 'linear-gradient(135deg, #3BCE90 0%, #2BB87B 65%, #1F9866 100%)',
		ink: '#0F1B14',
		display: 'Friends',
		Widget: BestFriendWidget,
		widgetTilt: -4
	},
	'top-songs-and-artists-mood-board': {
		bg: 'linear-gradient(135deg, #FF3D9A 0%, #FF6FB1 65%, #FFB1D2 100%)',
		ink: '#330F23',
		display: 'On loop',
		Widget: TopSongsWidget,
		widgetTilt: -3
	},
	'what-gen-z-listened-to-this-month': {
		bg: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 65%, #C7BDF2 100%)',
		ink: '#1B1640',
		display: 'Now playing',
		Widget: TopArtistsWidget,
		widgetTilt: -3
	}
}

const FALLBACK = {
	bg: 'linear-gradient(135deg, #FFC93D 0%, #FFD96E 65%, #FFE9A8 100%)',
	ink: '#3D2E00',
	display: 'Notes',
	Widget: HelloWidget,
	widgetProps: { count: 3 },
	widgetTilt: -2
}

export default function BlogCover({ slug, size = 'md' }) {
	const p = PRESETS[slug] || FALLBACK
	const Widget = p.Widget

	const isLarge = size === 'lg'

	return (
		<div
			className="relative w-full h-full overflow-hidden"
			style={{
				background: p.bg,
				color: p.ink,
				minHeight: isLarge ? 360 : 240
			}}
		>
			<div
				aria-hidden
				className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
				}}
			/>


			<div
				className="absolute left-6 bottom-6 w-44 md:w-48 drop-shadow-[0_24px_40px_rgba(0,0,0,0.15)]"
				style={{ transform: `rotate(${p.widgetTilt}deg)` }}
			>
				<Widget {...(p.widgetProps || {})} />
			</div>
		</div>
	)
}
