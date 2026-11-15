import { useSyncExternalStore } from 'react'

// Client-side state for "someone invited you": the invite itself (kept in
// localStorage so the banner follows you around the site for a while) and
// whether the big overlay is open.

const KEY = 'spotivity.invite'
const TTL_MS = 30 * 24 * 60 * 60 * 1000

let state = { invite: null, overlayOpen: false, loaded: false }
const listeners = new Set()

function emit(next) {
	state = { ...state, ...next }
	listeners.forEach((l) => l())
}

function load() {
	if (state.loaded || typeof window === 'undefined') return
	let invite = null
	try {
		const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
		if (saved && Date.now() - saved.savedAt < TTL_MS) invite = saved
	} catch {}
	state = { ...state, invite: state.invite ?? invite, loaded: true }
}

function subscribe(l) {
	listeners.add(l)
	return () => listeners.delete(l)
}

const serverState = { invite: null, overlayOpen: false, loaded: false }

export function useInvite() {
	return useSyncExternalStore(
		subscribe,
		() => {
			load()
			return state
		},
		() => serverState
	)
}

// invite: { handle, code, name, image_url, url, qrSvg }
export function setInvite(invite, { open = false } = {}) {
	load()
	const saved = { ...invite, savedAt: Date.now() }
	try {
		localStorage.setItem(KEY, JSON.stringify(saved))
	} catch {}
	emit({ invite: saved, overlayOpen: open })
}

export function openInviteOverlay() {
	emit({ overlayOpen: true })
}

export function closeInviteOverlay() {
	emit({ overlayOpen: false })
}

export function dismissInvite() {
	try {
		localStorage.removeItem(KEY)
	} catch {}
	emit({ invite: null, overlayOpen: false })
}
