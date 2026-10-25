// spotivity.me/auth/lastfm?to=<app url>&token=<token>: Last.fm's web sign-in
// only calls back to http(s) URLs, so it lands here and we hand the token to
// the app. `to` is the app's own return URL (spotivity://lastfm, or the dev
// client's exp+spotivity://...); anything else falls back to the default,
// so this can't be used as an open redirect.
const DEFAULT_TO = 'spotivity://lastfm'
const ALLOWED = /^(exp\+)?spotivity:\/\//

export async function getServerSideProps({ query, res }) {
	const to = typeof query.to === 'string' && ALLOWED.test(query.to) ? query.to : DEFAULT_TO
	const token = typeof query.token === 'string' ? query.token : ''
	const join = to.includes('?') ? '&' : '?'
	res.setHeader('Cache-Control', 'private, no-store')
	return {
		redirect: {
			destination: token ? `${to}${join}token=${encodeURIComponent(token)}` : to,
			permanent: false
		}
	}
}

export default function LastfmAuthRedirect() {
	return null
}
