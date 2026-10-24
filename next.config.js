/** @type {import('next').NextConfig} */
module.exports = {
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
