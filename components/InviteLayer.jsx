import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import Logo from './Logo'
import CopyCode from './ui/CopyCode'
import { AppStoreButton, GooglePlayButton } from './ui/StoreButtons'
import {
	closeInviteOverlay,
	dismissInvite,
	openInviteOverlay,
	useInvite
} from '../lib/inviteStore'
import { displayName, firstName, shownHandle } from '../lib/invite'

// "<name> invited you": a dialog when you land on someone's link, and a
// small persistent banner once you close it, on every page, until dismissed.
// Rendered once in _app; pages/u/[handle].jsx feeds it via setInvite().
export default function InviteLayer() {
	const { invite, overlayOpen } = useInvite()
	if (!invite) return null
	return (
		<>
			<AnimatePresence>
				{overlayOpen && <InviteDialog key="dialog" invite={invite} />}
			</AnimatePresence>
			<AnimatePresence>
				{!overlayOpen && <InviteBanner key="banner" invite={invite} />}
			</AnimatePresence>
		</>
	)
}

export function InviteAvatar({ invite, className = '' }) {
	if (invite.image_url) {
		return (
			<img
				src={invite.image_url}
				alt=""
				draggable="false"
				className={`${className} shrink-0 rounded-full object-cover`}
			/>
		)
	}
	return (
		<div
			className={`${className} shrink-0 rounded-full flex items-center justify-center bg-mint-100 text-mint-700 font-display font-extrabold`}
		>
			{displayName({ display_name: invite.name, handle: invite.handle }).replace(/^@/, '').charAt(0).toUpperCase()}
		</div>
	)
}

function InviteDialog({ invite }) {
	const name = displayName({ display_name: invite.name, handle: invite.handle })
	const first = invite.name ? firstName(invite.name) : name.startsWith('@') ? name : 'your friend'

	useEffect(() => {
		const onKey = (e) => e.key === 'Escape' && closeInviteOverlay()
		window.addEventListener('keydown', onKey)
		const { overflow } = document.body.style
		document.body.style.overflow = 'hidden'
		return () => {
			window.removeEventListener('keydown', onKey)
			document.body.style.overflow = overflow
		}
	}, [])

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-ink-950/45 backdrop-blur-md"
			onClick={closeInviteOverlay}
		>
			<div className="flex min-h-full items-end sm:items-center justify-center p-3 sm:p-6">
				<motion.div
					initial={{ opacity: 0, y: 24, scale: 0.98 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 16, scale: 0.98 }}
					transition={{ type: 'spring', stiffness: 360, damping: 30 }}
					role="dialog"
					aria-modal="true"
					aria-labelledby="invite-title"
					onClick={(e) => e.stopPropagation()}
					className="relative w-full max-w-[780px] overflow-hidden rounded-[28px] sm:rounded-4xl bg-cream-100 shadow-float ring-1 ring-ink-900/5 grid md:grid-cols-[1.2fr_1fr]"
				>
					<button
						onClick={closeInviteOverlay}
						aria-label="Close"
						className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 h-9 w-9 rounded-full flex items-center justify-center text-ink-400 hover:bg-ink-900/5 hover:text-ink-900 transition-colors"
					>
						<X size={18} />
					</button>

					{/* Who invited you */}
					<div className="flex flex-col gap-8 p-6 sm:p-8 md:p-10">
						<div className="flex items-center gap-2.5">
							<Logo className="h-7 w-7" />
							<span className="font-display font-bold tracking-tight text-ink-900">
								Spotivity
							</span>
						</div>

						<div>
							<div className="relative w-fit">
								<InviteAvatar
									invite={invite}
									className="h-20 w-20 sm:h-24 sm:w-24 text-4xl ring-4 ring-cream-100 shadow-card"
								/>
								<span className="absolute bottom-0.5 right-0.5 h-5 w-5 rounded-full bg-mint ring-4 ring-cream-100" />
							</div>
							{shownHandle(invite.handle) && name !== `@${invite.handle}` ? (
								<p className="mt-5 text-sm font-medium text-ink-300">
									@{invite.handle}
								</p>
							) : (
								<div className="mt-5" />
							)}
							<h2
								id="invite-title"
								className="mt-1 [overflow-wrap:anywhere] font-display text-[1.75rem] sm:text-[2.1rem] leading-[1.1] font-extrabold tracking-[-0.03em] text-ink-900 text-balance"
							>
								{name} invited you to Spotivity
							</h2>
							<p className="mt-3 leading-relaxed text-ink-400">
								See what {first} is listening to, live. Get the app, sign in
								with Spotify, and you’ll be friends automatically.
							</p>
							{invite.code && (
								<p className="mt-4 flex items-center gap-2 text-sm text-ink-400">
									Invite code
									<CopyCode code={invite.code} />
								</p>
							)}
						</div>

						<button
							onClick={closeInviteOverlay}
							className="hidden md:block w-fit text-sm font-medium text-ink-400 hover:text-ink-900 transition-colors"
						>
							Explore Spotivity first &rarr;
						</button>
					</div>

					{/* Get the app */}
					<div className="flex flex-col items-center justify-center gap-6 border-t border-ink-900/5 bg-cream-200/60 p-6 sm:p-8 md:border-l md:border-t-0 md:p-10 text-center">
						{invite.qrSvg && (
							<div className="hidden md:flex flex-col items-center gap-4">
								<div className="rounded-3xl bg-white p-4 shadow-card ring-1 ring-ink-900/5">
									<div
										className="h-40 w-40 [&>svg]:h-full [&>svg]:w-full"
										role="img"
										aria-label="QR code that opens this invite on your phone"
										dangerouslySetInnerHTML={{ __html: invite.qrSvg }}
									/>
								</div>
								<div>
									<p className="font-display font-bold text-ink-900">
										Scan with your phone
									</p>
									<p className="mt-1 text-sm text-ink-300">
										Opens the app, or the store if you don’t have it.
									</p>
								</div>
							</div>
						)}
						<div className="flex w-full max-w-[240px] flex-col gap-2.5 sm:max-w-none sm:flex-row md:max-w-[220px] md:flex-col">
							<AppStoreButton block />
							<GooglePlayButton block />
						</div>
						<button
							onClick={closeInviteOverlay}
							className="md:hidden text-sm font-medium text-ink-400 hover:text-ink-900 transition-colors"
						>
							Explore Spotivity first
						</button>
					</div>
				</motion.div>
			</div>
		</motion.div>
	)
}

function InviteBanner({ invite }) {
	const name = invite.name || `@${invite.handle}`
	const [mobile, setMobile] = useState(false)
	useEffect(() => {
		const mq = window.matchMedia('(max-width: 767px)')
		const update = () => setMobile(mq.matches)
		update()
		mq.addEventListener('change', update)
		return () => mq.removeEventListener('change', update)
	}, [])

	const inviteHref = `/@${invite.handle}${invite.code ? `?i=${invite.code}` : ''}`

	return (
		// Positioning lives on a plain wrapper: framer-motion owns `transform`
		// on the animated element, which would drop the centring translate.
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 24 }}
			transition={{ type: 'spring', stiffness: 340, damping: 30 }}
			className="pointer-events-none fixed inset-x-0 bottom-3 z-[45] flex justify-center px-3 sm:bottom-6 sm:px-6"
			role="region"
			aria-label="Invite"
		>
			<div className="pointer-events-auto w-full max-w-[560px] flex items-center gap-3 rounded-[22px] bg-ink-900/95 p-2.5 pr-2.5 text-cream shadow-float ring-1 ring-white/10 backdrop-blur-xl sm:gap-3.5 sm:p-3">
				<div className="relative">
					<InviteAvatar invite={invite} className="h-11 w-11 text-lg" />
					<span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-mint ring-[3px] ring-ink-900" />
				</div>
				<div className="min-w-0 flex-1">
					<p className="truncate text-[0.95rem] font-semibold leading-tight">
						{name}
					</p>
					<p className="mt-0.5 truncate text-[0.8rem] leading-6 text-cream/60">
						invited you to Spotivity
						{invite.code && (
							<span className="hidden sm:inline">
								{' · '}
								<CopyCode code={invite.code} dark className="ml-0.5 -my-1" />
							</span>
						)}
					</p>
				</div>
				{mobile ? (
					<a
						href={inviteHref}
						className="shrink-0 rounded-full bg-mint px-4 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-mint-400"
					>
						Open app
					</a>
				) : (
					<button
						onClick={openInviteOverlay}
						className="shrink-0 rounded-full bg-mint px-4 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-mint-400"
					>
						Get the app
					</button>
				)}
				<button
					onClick={dismissInvite}
					aria-label="Dismiss invite"
					className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-cream/50 transition-colors hover:bg-white/10 hover:text-cream"
				>
					<X size={16} />
				</button>
			</div>
		</motion.div>
	)
}
