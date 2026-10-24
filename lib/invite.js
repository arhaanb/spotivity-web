// Shared bits for profile/invite links (spotivity.me/@handle?i=CODE).

export const SITE_URL = 'https://spotivity.me'
export const APP_STORE =
	'https://apps.apple.com/us/app/spotivity-friend-activity/id6444594960'
export const PLAY_STORE =
	'https://play.google.com/store/apps/details?id=com.arhaanb.spotifyactivity'
export const ANDROID_PACKAGE = 'com.arhaanb.spotifyactivity'

// Public (anon) credentials, same ones the app ships. Only used to call
// get_public_profile, which returns name + avatar and nothing else.
const SUPABASE_URL =
	process.env.SUPABASE_URL || 'https://oiocdihwmsxqnfxxtklt.supabase.co'
const SUPABASE_ANON_KEY =
	process.env.SUPABASE_ANON_KEY ||
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pb2NkaWh3bXN4cW5meHh0a2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NjQ4NDAsImV4cCI6MjEwNjA0MDg0MH0.AJ3T4bzFgvRFakS4JTh_WbTtdssvqxRDZlnhn7mcOmw'

const HANDLE_RE = /^[a-z0-9][a-z0-9._]{1,28}[a-z0-9]$/
const CODE_RE = /^[A-Za-z0-9]{4,32}$/

export function cleanHandle(raw) {
	const h = String(raw ?? '').replace(/^@/, '').toLowerCase()
	return HANDLE_RE.test(h) ? h : null
}

export function cleanCode(raw) {
	const c = String(raw ?? '')
	return CODE_RE.test(c) ? c.toUpperCase() : null
}

export async function getPublicProfile(handle) {
	const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_public_profile`, {
		method: 'POST',
		headers: {
			apikey: SUPABASE_ANON_KEY,
			Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ p_handle: handle })
	})
	if (!res.ok) return null
	const rows = await res.json()
	return rows?.[0] ?? null
}

export function profileUrl(handle, code) {
	return `${SITE_URL}/@${handle}${code ? `?i=${code}` : ''}`
}

// 'ios' | 'android' | 'desktop'
export function detectPlatform(ua = '') {
	if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
	// iPadOS reports as Mac; the touch check happens client side.
	if (/Android/i.test(ua)) return 'android'
	return 'desktop'
}

// Android: open the app if installed, else Chrome follows the fallback to
// the Play Store. Carries the same path + query the app parses.
export function androidIntentUrl(handle, code) {
	const path = `spotivity.me/@${handle}${code ? `?i=${code}` : ''}`
	return (
		`intent://${path}#Intent;scheme=https;package=${ANDROID_PACKAGE};` +
		`S.browser_fallback_url=${encodeURIComponent(PLAY_STORE)};end`
	)
}

export function firstName(name) {
	return String(name ?? '').trim().split(/\s+/)[0] || 'Your friend'
}
