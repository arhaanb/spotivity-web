import Head from 'next/head'
import PageHeader from '../components/PageHeader'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'

const SECTIONS = [
	{
		id: 'who',
		title: '1. Who we are',
		body:
			'Spotivity is an independent mobile application. We are not affiliated with, endorsed by, or sponsored by Spotify AB.'
	},
	{
		id: 'what',
		title: '2. What the app does',
		body:
			'Spotivity displays your friend activity, top tracks, top artists, and related listening data on your phone after you sign in with your Spotify account.'
	},
	{
		id: 'account',
		title: '3. Your account',
		body:
			'You log in with Spotify. Your Spotify credentials never touch our servers. You can revoke access at any time from your Spotify account settings.'
	},
	{
		id: 'use',
		title: '4. Acceptable use',
		body:
			'Don’t use Spotivity to spam, abuse, harass, attempt to reverse engineer the app at scale, or violate Spotify’s own Terms of Service.'
	},
	{
		id: 'disclaimer',
		title: '5. Disclaimers',
		body:
			'Spotivity is provided as-is, without warranties. Friend activity data depends on your friends’ privacy settings.'
	},
	{
		id: 'liability',
		title: '6. Limitation of liability',
		body:
			'To the maximum extent permitted by law, Spotivity and its operator are not liable for indirect, incidental, or consequential damages arising from your use of the app.'
	},
	{
		id: 'changes',
		title: '7. Changes',
		body:
			'We may update these terms. Material changes will be posted on this page with a new “last updated” date.'
	},
	{
		id: 'contact',
		title: '8. Contact',
		body: (
			<>
				Questions? Email{' '}
				<a
					href="mailto:hi@arhaanb.com"
					className="text-mint-700 hover:underline"
				>
					hi@arhaanb.com
				</a>
				.
			</>
		)
	}
]

export default function Terms() {
	return (
		<>
			<Head>
				<title>Terms of service — Spotivity</title>
				<meta
					name="description"
					content="Spotivity terms of service. By using the app and this website, you agree to these terms."
				/>
				<link rel="canonical" href="https://spotivity.me/terms" />
			</Head>

			<PageHeader
				title="Terms of service."
				subtitle="Last updated May 2026. Plain English with the legal where it matters."
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Terms' }
				]}
			/>

			<Section tight>
				<Container className="max-w-3xl">
					{/* TOC */}
					<nav className="mb-12 rounded-3xl bg-white border border-ink/[0.08] p-6 md:p-7">
						<div className="kicker mb-3">
							Contents
						</div>
						<ol className="grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
							{SECTIONS.map((s) => (
								<li key={s.id}>
									<a
										href={`#${s.id}`}
										className="text-ink hover:text-mint-700"
									>
										{s.title}
									</a>
								</li>
							))}
						</ol>
					</nav>

					<div className="space-y-10">
						{SECTIONS.map((s) => (
							<section key={s.id} id={s.id}>
								<h3 className="font-bold text-[1.35rem] tracking-tight mb-3">
									{s.title}
								</h3>
								<p className="text-ink-400 leading-relaxed">{s.body}</p>
							</section>
						))}
					</div>
				</Container>
			</Section>
		</>
	)
}
