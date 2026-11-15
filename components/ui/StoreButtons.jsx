import { useEffect, useRef, useState } from 'react'
import { QrCode } from 'lucide-react'

// Official-style store badges. One size, one look, used everywhere.
export const APP_STORE =
	'https://apps.apple.com/us/app/spotivity-friend-activity/id6444594960'
export const PLAY_STORE =
	'https://play.google.com/store/apps/details?id=com.arhaanb.spotifyactivity'

const BADGE =
	'group inline-flex items-center gap-3 h-[54px] min-w-0 px-4 rounded-[14px] bg-black text-white ring-1 ring-inset ring-white/15 transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#1c1c1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint'
// In a row: share the width on phones, fixed 180px from sm up.
// block: fill the parent (stacked layouts), content centred.
const width = (block) =>
	block
		? 'w-full justify-center'
		: 'flex-1 max-w-[180px] sm:flex-none sm:w-[180px]'

export function AppStoreButton({ className = '', block = false }) {
	return (
		<a
			href={APP_STORE}
			target="_blank"
			rel="noopener"
			aria-label="Download on the App Store"
			className={`${BADGE} ${width(block)} ${className}`}
		>
			<img
				src="/brand/apple-white.svg"
				alt=""
				aria-hidden="true"
				draggable="false"
				className="h-[26px] w-auto shrink-0 -mt-0.5"
			/>
			<span className="flex flex-col items-start leading-none">
				<span className="text-[0.66rem] font-medium tracking-wide text-white/80">
					Download on the
				</span>
				<span className="mt-[3px] text-[1.1rem] sm:text-[1.2rem] font-semibold tracking-[-0.02em] whitespace-nowrap">
					App Store
				</span>
			</span>
		</a>
	)
}

export function GooglePlayButton({ className = '', block = false }) {
	return (
		<a
			href={PLAY_STORE}
			target="_blank"
			rel="noopener"
			aria-label="Get it on Google Play"
			className={`${BADGE} ${width(block)} ${className}`}
		>
			<img
				src="/brand/play.svg"
				alt=""
				aria-hidden="true"
				draggable="false"
				className="h-[24px] w-auto shrink-0"
			/>
			<span className="flex flex-col items-start leading-none">
				<span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-white/80">
					Get it on
				</span>
				<span className="mt-[3px] text-[1.1rem] sm:text-[1.2rem] font-semibold tracking-[-0.02em] whitespace-nowrap">
					Google Play
				</span>
			</span>
		</a>
	)
}

// Desktop only: a QR for spotivity.me/get, which sends a phone to its store.
export function QrButton() {
	const [open, setOpen] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		if (!open) return
		const close = (e) => {
			if (e.type === 'keydown' ? e.key === 'Escape' : !ref.current?.contains(e.target))
				setOpen(false)
		}
		document.addEventListener('mousedown', close)
		document.addEventListener('keydown', close)
		return () => {
			document.removeEventListener('mousedown', close)
			document.removeEventListener('keydown', close)
		}
	}, [open])

	return (
		<div ref={ref} className="relative hidden md:block">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
				aria-label="Show QR code to download on your phone"
				className="h-[54px] w-[54px] rounded-[14px] bg-black text-white ring-1 ring-inset ring-white/15 flex items-center justify-center transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#1c1c1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
			>
				<QrCode size={22} />
			</button>
			{open && (
				<div className="absolute left-1/2 bottom-full z-50 mb-3 w-60 -translate-x-1/2 rounded-3xl bg-white p-5 text-center shadow-float ring-1 ring-ink-900/5">
					<img
						src="/qr/get.svg"
						alt="QR code for spotivity.me/get"
						className="mx-auto h-40 w-40"
						draggable="false"
					/>
					<p className="mt-4 text-sm font-semibold text-ink-900">
						Scan to get the app
					</p>
					<p className="mt-0.5 text-xs text-ink-300">
						Opens the App Store or Google Play
					</p>
				</div>
			)}
		</div>
	)
}

export default function StoreButtons({ className = '', center = false, qr = true }) {
	return (
		<div
			className={`flex gap-3 ${
				center ? 'justify-center' : ''
			} ${className}`}
		>
			<AppStoreButton />
			<GooglePlayButton />
			{qr && <QrButton />}
		</div>
	)
}
