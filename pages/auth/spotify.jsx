// spotivity.me/auth/spotify?<query>: the app opens this instead of the
// Supabase authorize URL, so iOS's sign-in prompt names spotivity.me rather
// than <project>.supabase.co. It only ever forwards to our own project's
// authorize endpoint (the query is passed through untouched; Supabase still
// validates redirect_to against its allow-list), so it can't be used as an
// open redirect.
const SUPABASE_URL =
	process.env.SUPABASE_URL || 'https://oiocdihwmsxqnfxxtklt.supabase.co'

export async function getServerSideProps({ req, res }) {
	const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''
	res.setHeader('Cache-Control', 'private, no-store')
	return {
		redirect: {
			destination: `${SUPABASE_URL}/auth/v1/authorize${qs}`,
			permanent: false
		}
	}
}

export default function SpotifyAuthRedirect() {
	return null
}
