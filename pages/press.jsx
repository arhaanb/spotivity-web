import Head from 'next/head'
import { Download, Mail } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Logo from '../components/Logo'

const FACTS = [
	['Founder', 'Arhaan Bahadur'],
	['Launched', '2022'],
	['HQ', 'New York, USA'],
	['Platform', 'iOS, Android'],
	['Price', 'Free to download'],
	['Stack', 'React Native, Expo'],
	['Spotify', 'Independent third-party app'],
	['Press contact', 'hi@arhaanb.com']
]

const COLORS = [
	['#3BCE90', 'Mint'],
	['#0F1B14', 'Ink'],
	['#FFC93D', 'Sun'],
	['#FF3D9A', 'Magenta'],
	['#FAF7F1', 'Cream']
]

export default function Press() {
	return (
		<>
			<Head>
				<title>Press kit — Spotivity</title>
				<meta
					name="description"
					content="Spotivity press kit — logos, screenshots, brand colors, fact sheet, and contact info."
				/>
				<link rel="canonical" href="https://spotivity.me/press" />
			</Head>

			<PageHeader
				title="Built for press, creators & friends."
				subtitle={
					<>
						Need assets, quotes, or a fact sheet? It’s all here. For interviews and review copies, email{' '}
						<a href="mailto:hi@arhaanb.com" className="text-ink font-medium underline decoration-mint decoration-2 underline-offset-[3px] hover:text-mint-700 transition-colors">hi@arhaanb.com</a>.
					</>
				}
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Press' }
				]}
			/>

			<Section tight>
				<Container>
					<div className="grid md:grid-cols-3 gap-6">
						<StatCard n="100k+" label="downloads" />
						<StatCard n="iOS + Android" label="platforms" />
						<StatCard n="2022" label="launched" />
					</div>
				</Container>
			</Section>

			<Section tight>
				<Container>
					<h2 className="title-md mb-6">
						Logos & marks
					</h2>
					<div className="grid sm:grid-cols-3 gap-5 mb-6">
						<LogoCard bg="bg-mint-50" border />
						<LogoCard bg="bg-cream" border />
						<LogoCard bg="bg-ink" />
					</div>
					<Button as="a" href="/brand/logo.svg" download variant="outline">
						<Download className="w-4 h-4" /> Download SVG logo
					</Button>
				</Container>
			</Section>

			<Section tight>
				<Container>
					<h2 className="title-md mb-6">
						Brand colors
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-5 gap-3">
						{COLORS.map(([hex, name]) => (
							<div
								key={hex}
								className="rounded-3xl overflow-hidden border border-ink/[0.08] bg-white"
							>
								<div className="h-24" style={{ background: hex }} />
								<div className="p-4">
									<div className="font-bold text-sm">
										{name}
									</div>
									<div className="text-xs text-ink-300 font-mono mt-0.5">
										{hex}
									</div>
								</div>
							</div>
						))}
					</div>
				</Container>
			</Section>

			<Section tight>
				<Container>
					<h2 className="title-md mb-6">
						Quick facts
					</h2>
					<Card>
						<dl className="grid sm:grid-cols-2 gap-y-5 gap-x-10 text-sm">
							{FACTS.map(([term, value]) => (
								<div key={term}>
									<dt className="text-ink-300 text-xs uppercase tracking-[0.14em] font-semibold">
										{term}
									</dt>
									<dd className="text-ink mt-1 font-semibold text-[1.05rem]">
										{value}
									</dd>
								</div>
							))}
						</dl>
					</Card>
				</Container>
			</Section>

			<Section tight>
				<Container>
					<div className="rounded-5xl bg-mint text-ink p-10 md:p-14 flex items-center justify-between flex-wrap gap-6">
						<div>
							<h2 className="title-md">
								Writing about us?
							</h2>
							<p className="mt-2 text-ink/70 max-w-md">
								Reach out for an interview, review code, or quotes from the
								founder.
							</p>
						</div>
						<Button as="a" href="mailto:hi@arhaanb.com" variant="ink">
							<Mail className="w-4 h-4" /> hi@arhaanb.com
						</Button>
					</div>
				</Container>
			</Section>
		</>
	)
}

function StatCard({ n, label }) {
	return (
		<Card>
			<div className="title-md font-bold">{n}</div>
			<div className="mt-1.5 text-sm text-ink-400">{label}</div>
		</Card>
	)
}

function LogoCard({ bg, border = false }) {
	return (
		<div
			className={`${bg} rounded-4xl p-10 grid place-items-center ${
				border ? 'border border-ink/[0.08]' : ''
			}`}
		>
			<Logo className="w-16 h-16" />
		</div>
	)
}
