import { ImageResponse } from 'next/og'
import { cleanHandle, firstName, getPublicProfile } from '../../../lib/invite'

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

export default async function handler(req) {
	const { pathname, origin } = new URL(req.url)
	const handle = cleanHandle(decodeURIComponent(pathname.split('/').pop()))
	const profile = handle ? await getPublicProfile(handle).catch(() => null) : null

	const name = profile?.display_name || (profile ? `@${profile.handle}` : 'A friend')
	const first = profile ? firstName(profile.display_name) : 'your friends'
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
							{name.replace(/^@/, '').charAt(0).toUpperCase()}
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
						{profile && (
							<div style={{ fontSize: 30, fontWeight: 500, color: '#7A857F' }}>
								{`@${profile.handle}`}
							</div>
						)}
						<div
							style={{
								marginTop: 10,
								fontSize: name.length > 18 ? 64 : 76,
								fontWeight: 800,
								color: '#0F1B14',
								lineHeight: 1.04,
								letterSpacing: -3
							}}
						>
							{`${name} invited you`}
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
							{`See what ${first} is listening to on Spotify, live.`}
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
							fontSize: 26,
							fontWeight: 800
						}}
					>
						{profile ? `spotivity.me/@${profile.handle}` : 'spotivity.me'}
					</div>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
			fonts: fonts.length ? fonts : undefined,
			headers: {
				'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800'
			}
		}
	)
	return image
}
