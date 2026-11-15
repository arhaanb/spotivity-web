// Keep in sync with lib/invite.js (that file is ESM, this one is CommonJS).
const APP_STORE =
	'https://apps.apple.com/us/app/spotivity-friend-activity/id6444594960'
const PLAY_STORE =
	'https://play.google.com/store/apps/details?id=com.arhaanb.spotifyactivity'
const SUPABASE_URL =
	process.env.SUPABASE_URL || 'https://oiocdihwmsxqnfxxtklt.supabase.co'

/** @type {import('next').NextConfig} */
module.exports = {
	// Nothing uses next/image; make sure no optimizer function is ever built.
	images: { unoptimized: true },

	// Config redirects are served by Vercel's routing layer, so none of these
	// spin up a function.
	async redirects() {
		return [
			// spotivity.me/get: phones go straight to their store; desktops fall
			// through to the static page with the QR (pages/get.jsx).
			{
				source: '/get',
				has: [{ type: 'header', key: 'user-agent', value: '.*(iPhone|iPad|iPod).*' }],
				destination: APP_STORE,
				permanent: false
			},
			{
				source: '/get',
				has: [{ type: 'header', key: 'user-agent', value: '.*Android.*' }],
				destination: PLAY_STORE,
				permanent: false
			},
			// spotivity.me/auth/spotify?<query>: the app opens this instead of the
			// Supabase authorize URL, so iOS's sign-in prompt names spotivity.me.
			// The query string is passed through untouched; Supabase still checks
			// redirect_to against its allow-list, so this isn't an open redirect.
			{
				source: '/auth/spotify',
				destination: `${SUPABASE_URL}/auth/v1/authorize`,
				permanent: false
			}
		]
	},
	async rewrites() {
		// Profile/invite links: spotivity.me/@handle -> pages/u/[handle].jsx
		return [{ source: '/@:handle', destination: '/u/:handle' }]
	},
	async headers() {
		return [
			{
				// Apple fetches this without an extension; it must be JSON.
				source: '/.well-known/apple-app-site-association',
				headers: [{ key: 'Content-Type', value: 'application/json' }]
			}
		]
	}
}
