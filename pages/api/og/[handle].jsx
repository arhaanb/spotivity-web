import { ImageResponse } from 'next/og'
import {
	cleanHandle,
	cleanName,
	displayName,
	firstName,
	getPublicProfile,
	shownHandle
} from '../../../lib/invite'

export const config = { runtime: 'edge' }

// 1200x630 share card for spotivity.me/@handle: the sharer's avatar and name,
// on the site's cream/mint palette. Cached at the edge; avatars rarely change.

// Google Fonts serves TTF (which Satori needs) when no browser UA is sent.
async function loadFont(weight) {
	try {
		const css = await fetch(
			`https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@${weight}`
		).then((r) => r.text())
		const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
		if (!src) return null
		return await fetch(src[1]).then((r) => r.arrayBuffer())
	} catch {
		return null
	}
}

// Satori only has glyphs for real letters (any script, fetched on demand) and
// emoji (twemoji). Decorative names like "⊹˚.⋆꒰𝐅𝖗𝖎𝐲𝖔𝖚𝐤𝖎♱🐈‍⬛꒱" would draw as
// boxes: NFKC turns the styled letters back into plain ones, and the symbols
// with no glyph are dropped. Null if nothing readable is left.
function drawable(name) {
	if (!name) return null
	let s = name
		.normalize('NFKC')
		.replace(/[^\p{L}\p{M}\p{N}\p{Extended_Pictographic}‍️\s.'’\-_&!?,()]/gu, '')
		.replace(/\p{Lm}/gu, '')
	// A Latin name sprinkled with other scripts' letters as decoration (ა, ໒):
	// keep the Latin. Names written in another script are left alone.
	if (/\p{Script=Latin}/u.test(s)) {
		s = s.replace(/[\p{L}\p{N}]/gu, (c) =>
			/[\p{Script=Latin}\p{Script=Common}]/u.test(c) ? c : ''
		)
	}
	s = s
		// Accents only count on a letter (NFKC turns "˚" into a bare ring).
		.replace(/(^|[^\p{L}\p{N}\p{M}])\p{M}+/gu, '$1')
		.replace(/\s+/g, ' ')
		.replace(/^[\s.\-_,]+|[\s.\-_,]+$/g, '')
	return /[\p{L}\p{N}]/u.test(s) ? s : null
}

// Cut to n characters (not UTF-16 units, so emoji survive) with an ellipsis.
function clip(s, n) {
	const chars = [...s]
	return chars.length > n ? `${chars.slice(0, n - 1).join('').trimEnd()}…` : s
}

export default async function handler(req) {
	const { pathname, origin, searchParams } = new URL(req.url)
	const requested = cleanHandle(decodeURIComponent(pathname.split('/').pop()))
	let profile = requested ? await getPublicProfile(requested).catch(() => null) : null
	// Dev only: /api/og/x?name=…&as=<handle> previews any name without a
	// profile (`handle` itself is taken by the route param).
	if (process.env.NODE_ENV !== 'production' && searchParams.has('name')) {
		profile = {
			display_name: cleanName(searchParams.get('name')),
			handle: searchParams.get('as') ?? requested,
			image_url: null
		}
	}

	// Names are cleaned in getPublicProfile (Spotify ids become null). Very
	// long ones are cut, and the headline shrinks to fit its longest word.
	if (profile) profile = { ...profile, display_name: drawable(profile.display_name) }
	const full = profile ? displayName(profile) : 'A friend'
	const name = clip(full, 26)
	const handle = profile ? shownHandle(profile.handle) : null
	const first = !profile
		? 'your friends'
		: profile.display_name
		? firstName(name)
		: handle
		? `@${handle}`
		: 'your friend'
	const firstShort = clip(first, 18)
	const headline = `${name} invited you`
	const longestWord = Math.max(...headline.split(/\s+/).map((w) => [...w].length))
	// ~0.6em per glyph at weight 800; the headline gets 560px so it clears the rings.
	const headlineSize = Math.round(
		Math.max(42, Math.min(headline.length > 30 ? 54 : headline.length > 18 ? 64 : 76, 560 / (longestWord * 0.6)))
	)
	const [bold, medium] = await Promise.all([loadFont(800), loadFont(500)])
	const fonts = [
		bold && { name: 'Jakarta', data: bold, weight: 800, style: 'normal' },
		medium && { name: 'Jakarta', data: medium, weight: 500, style: 'normal' }
	].filter(Boolean)

	const image = new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					background: '#FAF7F1',
					fontFamily: 'Jakarta',
					position: 'relative',
					overflow: 'hidden'
				}}
			>
				{/* Soft mint rings, echoing the logo */}
				<div
					style={{
						position: 'absolute',
						right: -170,
						top: -110,
						width: 850,
						height: 850,
						borderRadius: 9999,
						background: '#EFFFF8',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<div
						style={{
							width: 660,
							height: 660,
							borderRadius: 9999,
							background: '#D6F9E9',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<div
							style={{
								width: 440,
								height: 440,
								borderRadius: 9999,
								background: '#C5F3DE'
							}}
						/>
					</div>
				</div>

				{/* Avatar, centred in the rings */}
				<div
					style={{
						position: 'absolute',
						right: 85,
						top: 175,
						width: 340,
						height: 340,
						borderRadius: 9999,
						border: '10px solid #FCFAF5',
						boxShadow: '0 30px 60px -20px rgba(15,27,20,0.35)',
						display: 'flex',
						overflow: 'hidden',
						background: '#D6F9E9',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					{profile?.image_url ? (
						<img
							src={profile.image_url}
							width={320}
							height={320}
							style={{ objectFit: 'cover' }}
						/>
					) : (
						<div style={{ fontSize: 150, fontWeight: 800, color: '#1F9866' }}>
							{[...name.replace(/^@/, '')][0]?.toUpperCase() ?? 'S'}
						</div>
					)}
				</div>
				<div
					style={{
						position: 'absolute',
						right: 120,
						top: 455,
						width: 44,
						height: 44,
						borderRadius: 9999,
						background: '#3BCE90',
						border: '8px solid #FCFAF5'
					}}
				/>

				{/* Copy */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						padding: '72px 0 72px 80px',
						width: 680
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
						<img src={`${origin}/brand/logo.svg`} width={52} height={52} />
						<div
							style={{
								fontSize: 34,
								fontWeight: 800,
								color: '#0F1B14',
								letterSpacing: -1
							}}
						>
							Spotivity
						</div>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column' }}>
						{handle && name !== `@${handle}` && (
							<div style={{ fontSize: 30, fontWeight: 500, color: '#7A857F' }}>
								{`@${handle}`}
							</div>
						)}
						<div
							style={{
								marginTop: 10,
								display: 'flex',
								flexWrap: 'wrap',
								maxWidth: 560,
								fontSize: headlineSize,
								fontWeight: 800,
								color: '#0F1B14',
								lineHeight: 1.04,
								letterSpacing: headlineSize > 56 ? -3 : -2
							}}
						>
							{headline}
						</div>
						<div
							style={{
								marginTop: 22,
								fontSize: 32,
								fontWeight: 500,
								color: '#4A5852',
								lineHeight: 1.35
							}}
						>
							{`See what ${firstShort} is listening to on Spotify, live.`}
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							alignSelf: 'flex-start',
							alignItems: 'center',
							height: 64,
							padding: '0 30px',
							borderRadius: 9999,
							background: '#0F1B14',
							color: '#FCFAF5',
							fontSize: handle && handle.length > 16 ? 21 : 26,
							fontWeight: 800
						}}
					>
						{handle ? `spotivity.me/@${handle}` : 'spotivity.me'}
					</div>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
			fonts: fonts.length ? fonts : undefined,
			// Names with emoji render as images instead of empty boxes.
			emoji: 'twemoji',
			headers: {
				'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800'
			}
		}
	)
	return image
}
