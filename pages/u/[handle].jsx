import Head from 'next/head'
import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { X } from 'lucide-react'

import Home from '../index'
import Logo from '../../components/Logo'
import {
	AppStoreButton,
	GooglePlayButton
} from '../../components/ui/StoreButtons'
import {
	APP_STORE,
	PLAY_STORE,
	androidIntentUrl,
	cleanCode,
	cleanHandle,
	detectPlatform,
	firstName,
	getPublicProfile,
	profileUrl,
	SITE_URL
} from '../../lib/invite'

// spotivity.me/@handle?i=CODE (rewritten here from /@:handle).
//
// - App installed: iOS universal links / Android app links open the app
//   before this page loads. If we do load on a phone (link pasted into the
//   browser, or Android links not verified), we hand off: Android via an
//   intent:// URL that falls back to Play, iOS straight to the App Store.
// - Desktop: the normal home page with an invite card on top, with a QR code
//   that carries the same link to a phone.
// - Crawlers get the per-user OG tags and never run the redirect.
export async function getServerSideProps({ params, query, req, res }) {
	const handle = cleanHandle(params.handle)
	if (!handle) return { notFound: true }

	const profile = await getPublicProfile(handle).catch(() => null)
	if (!profile) return { notFound: true }

	const code = cleanCode(query.i)
	const url = profileUrl(profile.handle, code)
	const qrSvg = await QRCode.toString(url, {
		type: 'svg',
		margin: 0,
		errorCorrectionLevel: 'M',
		color: { dark: '#0F1B14', light: '#00000000' }
	})

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=300, stale-while-revalidate=3600'
	)
	return {
		props: {
			profile,
			code,
			url,
			qrSvg,
			platform: detectPlatform(req.headers['user-agent'])
		}
	}
}

export default function ProfileInvite({ profile, code, url, qrSvg, platform }) {
	const name = profile.display_name || `@${profile.handle}`
	const first = firstName(profile.display_name) || `@${profile.handle}`
	const title = `${name} invited you to Spotivity`
	const description = `See what ${first} is listening to on Spotify, live. Join Spotivity and you'll be friends instantly.`
	const ogImage = `${SITE_URL}/api/og/${profile.handle}`

	const [open, setOpen] = useState(true)
	const [redirecting, setRedirecting] = useState(platform !== 'desktop')

	useEffect(() => {
		let target = null
		if (platform === 'android') target = androidIntentUrl(profile.handle, code)
		else if (platform === 'ios') target = APP_STORE
		// iPadOS Safari identifies as a Mac; a touch screen gives it away.
		else if (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent))
			target = APP_STORE
		if (!target) return
		setRedirecting(true)
		const t = setTimeout(() => window.location.replace(target), 350)
		return () => clearTimeout(t)
	}, [platform, profile.handle, code])

	return (
		<>
			<Head>
				<title key="title">{title}</title>
				<meta key="description" name="description" content={description} />
				<link key="canonical" rel="canonical" href={url} />
				<meta key="robots" name="robots" content="noindex, follow" />
				<meta key="og:url" property="og:url" content={url} />
				<meta key="og:type" property="og:type" content="profile" />
				<meta key="og:title" property="og:title" content={title} />
				<meta key="og:description" property="og:description" content={description} />
				<meta key="og:image" property="og:image" content={ogImage} />
				<meta key="og:image:alt" property="og:image:alt" content={title} />
				<meta key="og:image:width" property="og:image:width" content="1200" />
				<meta key="og:image:height" property="og:image:height" content="630" />
				<meta key="twitter:title" name="twitter:title" content={title} />
				<meta key="twitter:description" name="twitter:description" content={description} />
				<meta key="twitter:image" name="twitter:image" content={ogImage} />
				<meta
					key="apple-itunes-app"
					name="apple-itunes-app"
					content={`app-id=6444594960, app-argument=${url}`}
				/>
			</Head>

			{redirecting ? (
				<MobileHandoff profile={profile} name={name} platform={platform} />
			) : (
				<>
					<Home />
					{open && (
						<InviteOverlay
							profile={profile}
							name={name}
							first={first}
							qrSvg={qrSvg}
							onClose={() => setOpen(false)}
						/>
					)}
				</>
			)}
		</>
	)
}

function Avatar({ profile, name, className }) {
	if (profile.image_url) {
		return (
			<img
				src={profile.image_url}
				alt=""
				className={`${className} object-cover`}
				draggable="false"
			/>
		)
	}
	return (
		<div
			className={`${className} flex items-center justify-center bg-mint-100 text-mint-700 font-display font-extrabold`}
		>
			{name.replace(/^@/, '').charAt(0).toUpperCase()}
		</div>
	)
}

function InviteOverlay({ profile, name, first, qrSvg, onClose }) {
	useEffect(() => {
		const onKey = (e) => e.key === 'Escape' && onClose()
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [onClose])

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-ink-950/45 backdrop-blur-md"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="invite-title"
		>
			<div
				className="relative w-full max-w-[820px] rounded-4xl bg-cream-100 shadow-float ring-1 ring-ink-900/5 overflow-hidden grid md:grid-cols-[1.15fr_1fr]"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					aria-label="Close"
					className="absolute right-4 top-4 z-10 h-9 w-9 rounded-full flex items-center justify-center text-ink-400 hover:bg-ink-900/5 hover:text-ink-900 transition-colors"
				>
					<X size={18} />
				</button>

				{/* Who invited you */}
				<div className="p-8 sm:p-10 flex flex-col justify-between gap-10">
					<div className="flex items-center gap-2.5">
						<Logo className="w-7 h-7" />
						<span className="font-display font-bold text-ink-900 tracking-tight">
							Spotivity
						</span>
					</div>

					<div>
						<div className="relative w-fit">
							<Avatar
								profile={profile}
								name={name}
								className="h-24 w-24 rounded-full ring-4 ring-cream-100 shadow-card text-4xl"
							/>
							<span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-mint ring-4 ring-cream-100" />
						</div>
						<p className="mt-6 text-sm font-medium text-ink-300">
							@{profile.handle}
						</p>
						<h2
							id="invite-title"
							className="mt-1 font-display text-3xl sm:text-[2.15rem] leading-[1.1] font-extrabold tracking-[-0.03em] text-ink-900"
						>
							{name} invited you to Spotivity
						</h2>
						<p className="mt-3 text-ink-400 leading-relaxed">
							See what {first} is listening to, live. Download the app,
							sign in with Spotify, and you’ll be friends automatically.
						</p>
					</div>

					<button
						onClick={onClose}
						className="w-fit text-sm font-medium text-ink-400 hover:text-ink-900 transition-colors"
					>
						Explore Spotivity first &rarr;
					</button>
				</div>

				{/* Get the app */}
				<div className="p-8 sm:p-10 bg-cream-200/70 border-t md:border-t-0 md:border-l border-ink-900/5 flex flex-col items-center justify-center text-center gap-6">
					<div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-900/5">
						<div
							className="h-44 w-44 [&>svg]:h-full [&>svg]:w-full"
							dangerouslySetInnerHTML={{ __html: qrSvg }}
							aria-label="QR code that opens this invite on your phone"
							role="img"
						/>
					</div>
					<div>
						<p className="font-display font-bold text-ink-900">
							Scan with your phone
						</p>
						<p className="mt-1 text-sm text-ink-300">
							Opens the app, or the store if you don’t have it yet.
						</p>
					</div>
					<div className="flex flex-col gap-2.5 w-full items-center">
						<AppStoreButton className="!max-w-[200px] !w-[200px]" />
						<GooglePlayButton className="!max-w-[200px] !w-[200px]" />
					</div>
				</div>
			</div>
		</div>
	)
}

// Shown for a moment on phones while we hand off to the app or the store.
function MobileHandoff({ profile, name, platform }) {
	const store = platform === 'android' ? PLAY_STORE : APP_STORE
	return (
		<div className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center px-6 text-center">
			<Avatar
				profile={profile}
				name={name}
				className="h-24 w-24 rounded-full shadow-card text-4xl"
			/>
			<h1 className="mt-6 font-display text-2xl font-extrabold tracking-[-0.02em] text-ink-900">
				{name} invited you to Spotivity
			</h1>
			<p className="mt-2 text-ink-400">Opening the app…</p>
			<a
				href={store}
				className="mt-8 inline-flex h-12 items-center rounded-full bg-ink-900 px-6 font-semibold text-cream"
			>
				Get Spotivity
			</a>
		</div>
	)
}
