// Shared bits for profile/invite links (spotivity.me/@handle?i=CODE).

export const SITE_URL = 'https://spotivity.me'
export const APP_STORE =
	'https://apps.apple.com/us/app/spotivity-friend-activity/id6444594960'
export const PLAY_STORE =
	'https://play.google.com/store/apps/details?id=com.arhaanb.spotifyactivity'

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
	const row = rows?.[0] ?? null
	return row && { ...row, display_name: cleanName(row.display_name) }
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

// Custom-scheme link the app understands in every build (no universal-link
// setup needed): spotivity://u/<handle>?i=<code>.
export function appSchemeUrl(handle, code) {
	return `spotivity://u/${handle}${code ? `?i=${code}` : ''}`
}

// Android: open the app via its scheme if installed, else Chrome follows the
// fallback to the Play Store. No package pinned, so dev builds answer too.
export function androidIntentUrl(handle, code) {
	const path = `u/${handle}${code ? `?i=${code}` : ''}`
	return (
		`intent://${path}#Intent;scheme=spotivity;` +
		`S.browser_fallback_url=${encodeURIComponent(PLAY_STORE)};end`
	)
}

export function firstName(name) {
	return String(name ?? '').trim().split(/\s+/)[0] || 'your friend'
}

// Spotify falls back to the account id when someone never set a display
// name, so some names (and the handles made from them) are strings like
// 31gz6hvjuqt47o7ri2keaiqliy6i. Treat those as no name. Same rule as the
// app's utils/names.js.
export function looksGenerated(value) {
	const s = String(value ?? '').trim()
	if (!s) return true
	if (/^\d{8,}$/.test(s)) return true
	if (!/^[a-z0-9]{12,}$/.test(s)) return false
	if (s.length >= 20 && /\d/.test(s)) return true
	// A digit before the end: "nicknamespotify5139" is real, "872slwkeox..." isn't.
	return /\d/.test(s.replace(/\d+$/, ''))
}

export function cleanName(name) {
	const s = String(name ?? '').replace(/\s+/g, ' ').trim()
	return looksGenerated(s) ? null : s
}

// The handle when it's worth showing, else null.
export function shownHandle(handle) {
	return handle && !looksGenerated(handle) ? handle : null
}

// What to call someone: their name, else @handle, else "Your friend".
export function displayName({ display_name, handle } = {}) {
	const h = shownHandle(handle)
	return cleanName(display_name) ?? (h ? `@${h}` : 'Your friend')
}
