import Head from 'next/head'
import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

import Home from '../index'
import { InviteAvatar } from '../../components/InviteLayer'
import CopyCode from '../../components/ui/CopyCode'
import { setInvite } from '../../lib/inviteStore'
import {
	APP_STORE,
	PLAY_STORE,
	SITE_URL,
	androidIntentUrl,
	appSchemeUrl,
	cleanCode,
	cleanHandle,
	detectPlatform,
	firstName,
	displayName,
	shownHandle,
	getPublicProfile,
	profileUrl
} from '../../lib/invite'

// spotivity.me/@handle?i=CODE (rewritten here from /@:handle).
//
// - Phones: try to open the app (spotivity:// scheme, works in every build),
//   and if nothing picks it up, go to the App Store / Play Store. Once a
//   build with universal links ships, iOS opens the app before this page
//   even loads.
// - Desktop: the normal home page with the invite dialog on top (and a
//   persistent banner after closing it), incl. a QR that carries the link
//   to a phone. Both live in components/InviteLayer, rendered by _app.
// - Crawlers get the per-user OG tags and never run any of the JS.
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

	// The response depends on the device, so it must never be shared from a
	// CDN cache (a cached desktop page is what phones were getting).
	res.setHeader('Cache-Control', 'private, no-store')
	return {
		props: {
			invite: {
				handle: profile.handle,
				name: profile.display_name ?? null,
				image_url: profile.image_url ?? null,
				code,
				url,
				qrSvg
			},
			serverPlatform: detectPlatform(req.headers['user-agent'])
		}
	}
}

function clientPlatform() {
	const ua = navigator.userAgent
	if (/Android/i.test(ua)) return 'android'
	if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
	// iPadOS Safari identifies as a Mac; a touch screen gives it away.
	if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return 'ios'
	return 'desktop'
}

export default function ProfileInvite({ invite, serverPlatform }) {
	const name = displayName({ display_name: invite.name, handle: invite.handle })
	const first = invite.name ? firstName(invite.name) : name.startsWith('@') ? name : 'your friend'
	const title = `${name} invited you to Spotivity`
	const description = `See what ${first} is listening to on Spotify, live. Join Spotivity and you'll be friends instantly.`
	const ogImage = `${SITE_URL}/api/og/${invite.handle}`

	const [platform, setPlatform] = useState(serverPlatform)
	useEffect(() => {
		const p = clientPlatform()
		setPlatform(p)
		setInvite(invite, { open: p === 'desktop' })
	}, [invite])

	return (
		<>
			<Head>
				<title key="title">{title}</title>
				<meta key="description" name="description" content={description} />
				<link key="canonical" rel="canonical" href={invite.url} />
				<meta key="robots" name="robots" content="noindex, follow" />
				<meta key="og:url" property="og:url" content={invite.url} />
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
					content={`app-id=6444594960, app-argument=${invite.url}`}
				/>
			</Head>

			{platform === 'desktop' ? (
				<Home />
			) : (
				<MobileHandoff invite={invite} name={name} platform={platform} />
			)}
		</>
	)
}

// Phones: open the app if it's installed, otherwise the store.
function MobileHandoff({ invite, name, platform }) {
	const android = platform === 'android'
	const store = android ? PLAY_STORE : APP_STORE
	const openHref = android
		? androidIntentUrl(invite.handle, invite.code)
		: appSchemeUrl(invite.handle, invite.code)
	const [status, setStatus] = useState('opening')

	useEffect(() => {
		// Android: the intent URL falls back to Play by itself.
		if (android) {
			window.location.href = openHref
			return
		}
		// iOS: try the app; if we're still here (and visible) shortly after,
		// it isn't installed, so go to the App Store. Leaving for the app hides
		// the page, which cancels the fallback.
		let timer = null
		const cancel = () => {
			if (document.visibilityState === 'hidden') {
				clearTimeout(timer)
				setStatus('opened')
			}
		}
		document.addEventListener('visibilitychange', cancel)
		window.location.href = openHref
		timer = setTimeout(() => {
			if (document.visibilityState === 'visible') {
				setStatus('store')
				window.location.replace(store)
			}
		}, 1600)
		return () => {
			clearTimeout(timer)
			document.removeEventListener('visibilitychange', cancel)
		}
	}, [android, openHref, store])

	return (
		<div className="fixed inset-0 z-[120] overflow-y-auto bg-cream">
			<div className="flex min-h-full flex-col items-center justify-center px-6 py-16 text-center">
				<div className="relative">
					<InviteAvatar invite={invite} className="h-24 w-24 text-4xl shadow-card" />
					<span className="absolute bottom-0.5 right-0.5 h-5 w-5 rounded-full bg-mint ring-4 ring-cream" />
				</div>
				{shownHandle(invite.handle) && name !== `@${invite.handle}` ? (
					<p className="mt-6 text-sm font-medium text-ink-300">@{invite.handle}</p>
				) : (
					<div className="mt-6" />
				)}
				<h1 className="mt-1 max-w-xs [overflow-wrap:anywhere] font-display text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink-900 text-balance">
					{name} invited you to Spotivity
				</h1>
				<p className="mt-3 text-ink-400">
					{status === 'store' ? 'Taking you to the store…' : 'Opening Spotivity…'}
				</p>

				<div className="mt-10 flex w-full max-w-[280px] flex-col gap-3">
					<a
						href={openHref}
						className="flex h-[52px] items-center justify-center rounded-full bg-ink-900 font-semibold text-cream"
					>
						Open in Spotivity
					</a>
					<a
						href={store}
						className="flex h-[52px] items-center justify-center rounded-full bg-ink-900/[0.06] font-semibold text-ink-900"
					>
						{android ? 'Get it on Google Play' : 'Get it on the App Store'}
					</a>
				</div>

				{invite.code && (
					<p className="mt-8 max-w-xs text-sm leading-relaxed text-ink-400">
						Installing first? Enter code{' '}
						<CopyCode code={invite.code} /> in the app’s Friends screen.
					</p>
				)}
			</div>
		</div>
	)
}
