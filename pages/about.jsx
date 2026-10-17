import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import StoreButtons from '../components/ui/StoreButtons'

export default function About() {
	return (
		<>
			<Head>
				<title>About — Spotivity</title>
				<meta
					name="description"
					content="The story behind Spotivity — a one-person indie music app that grew to 100k+ downloads."
				/>
				<link rel="canonical" href="https://spotivity.me/about" />
			</Head>

			<PageHeader
				title="A small app, a big audience."
				subtitle="Spotivity started as a weekend project. Today it has 100k+ downloads and counting."
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'About' }
				]}
			/>

			<Section tight>
				<Container className="max-w-3xl">
					<div className="prose prose-lg prose-headings:font-display prose-headings:tracking-tight prose-p:text-ink-400 prose-p:leading-relaxed prose-strong:text-ink prose-a:text-mint-700 prose-a:no-underline hover:prose-a:underline max-w-none">
						<p className="text-[1.2rem] text-ink leading-snug font-medium text-balance">
							Spotivity exists because sharing music with friends should be
							effortless — and beautiful — on the device you actually carry.
						</p>

						<p>
							I built it because I wanted it.{' '}
							<a href="https://arhaanb.com" target="_blank" rel="noopener">
								I’m Arhaan Bahadur
							</a>{' '}
							— an indie designer and developer based in NYC. Spotivity is
							the third app I’ve shipped, but the first to cross 100k organic
							downloads.
						</p>

						<h3>What I care about</h3>
						<ul>
							<li>
								<strong>Real-time, not analytics.</strong> Sharing music
								should feel alive, not a summary you read later.
							</li>
							<li>
								<strong>Ambient discovery.</strong> The best recs are the
								ones you didn’t go looking for. Widgets matter.
							</li>
							<li>
								<strong>No ads.</strong> Spotivity will never make money
								through ads or by collecting your listening data.
							</li>
							<li>
								<strong>Beautiful by default.</strong> Dark mode, custom
								typography, tasteful color — every detail.
							</li>
						</ul>
					</div>
				</Container>
			</Section>

			<Section tight>
				<Container>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
						className="grid grid-cols-3 gap-6 max-w-3xl mx-auto"
					>
						{[
							['100k+', 'downloads'],
							['2022', 'launched'],
							['1', 'person behind it'],
						].map(([n, l]) => (
							<div key={l} className="text-center">
								<div className="title-lg font-bold">
									{n}
								</div>
								<div className="mt-2 text-sm text-ink-400">{l}</div>
							</div>
						))}
					</motion.div>
				</Container>
			</Section>

			<Section tight>
				<Container className="max-w-3xl">
					<div className="rounded-5xl bg-ink text-mint-50 p-10 md:p-14 text-center relative isolate overflow-hidden">
						<div className="absolute -z-10 -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-mint/15 blur-[120px]" />
						<div className="relative">
							<h2 className="title-md text-mint-50">
								Want to try it?
							</h2>
							<p className="mt-2 text-mint-50/65">
								Ten seconds and a Spotify login.
							</p>
							<StoreButtons center className="mt-7" />
						</div>
					</div>
				</Container>
			</Section>
		</>
	)
}
