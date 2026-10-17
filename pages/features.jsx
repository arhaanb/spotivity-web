import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
	Headphones,
	Music2,
	Mic,
	Moon,
	Zap,
	Heart,
	ChevronRight
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import StoreButtons from '../components/ui/StoreButtons'
import HelloWidget from '../components/widgets/HelloWidget'
import TopSongsWidget from '../components/widgets/TopSongsWidget'
import TopArtistsWidget from '../components/widgets/TopArtistsWidget'

const FEATURES = [
	{
		icon: Headphones,
		title: 'Live friend activity',
		body:
			'See exactly what your friends are listening to right now. Live indicators, album art, and tap-to-open in Spotify.',
		demo: <HelloWidget />,
		featured: true
	},
	{
		icon: Music2,
		title: 'Your top songs',
		body:
			'Ranked lists of your most-played tracks. Switch between the last 30 days and all-time.',
		demo: <TopSongsWidget />
	},
	{
		icon: Mic,
		title: 'Your top artists',
		body:
			'See who you’ve been deep in. Genres, follower counts, and one tap to their Spotify page.',
		demo: <TopArtistsWidget />
	},
	{
		icon: Moon,
		title: 'Beautiful dark theme',
		body:
			'OLED-friendly dark mode with brand-mint accents and considered spacing for late-night scrolling.'
	},
	{
		icon: Zap,
		title: 'One-tap sign-in',
		body:
			'Sign in with Spotify and your existing friends — anyone with public listening — show up instantly.'
	},
	{
		icon: Heart,
		title: 'No ads, ever',
		wide: true,
		body:
			'No banner ads, no nag screens, and none of your data is stored.'
	}
]

export default function Features() {
	return (
		<>
			<Head>
				<title>Features — Spotivity</title>
				<meta
					name="description"
					content="Live friend activity, top songs, top artists, a beautiful dark theme, and one-tap sign-in."
				/>
				<link rel="canonical" href="https://spotivity.me/features" />
			</Head>

			<PageHeader
				title="Built for the way you listen."
				subtitle="A focused set of features designed for sharing, discovering, and reliving the music your friends love."
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Features' }
				]}
			/>

			<Section tight>
				<Container>
					<div className="grid md:grid-cols-6 gap-6">
						{FEATURES.map((f, i) => (
							<motion.div
								key={f.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.25 }}
								transition={{ duration: 0.55, delay: i * 0.04 }}
								className={
									f.wide
										? 'md:col-span-6'
										: f.featured
										? 'md:col-span-6 lg:col-span-4'
										: 'md:col-span-3 lg:col-span-2'
								}
							>
								<FeatureCard {...f} />
							</motion.div>
						))}
					</div>
				</Container>
			</Section>

			<ContextSection />

			<Section tight>
				<Container className="text-center">
					<h2 className="title-lg">
						Try it <span className="emph">today</span>.
					</h2>
					<p className="mt-4 lede mx-auto text-ink-400">
						160k+ downloads on iOS and Android.
					</p>
					<StoreButtons center className="mt-8" />
						<Link
							href="/faq"
							className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-mint-700 transition-colors"
						>
							Read the FAQ <ChevronRight className="w-4 h-4" />
						</Link>
				</Container>
			</Section>
		</>
	)
}

function FeatureCard({ icon: Icon, title, body, demo, featured }) {
	return (
		<Card className="h-full">
			<div className="flex items-start gap-4">
				<div
					className="shrink-0 w-11 h-11 rounded-full grid place-items-center bg-mint-100 text-mint-700"
				>
					<Icon strokeWidth={1.75} className="w-5 h-5" />
				</div>
				<div className="flex-1">
					<h3
						className={`font-bold tracking-[-0.03em] ${
							featured ? 'text-[1.6rem]' : 'text-[1.25rem]'
						}`}
					>
						{title}
					</h3>
					<p className="mt-2 text-[0.95rem] text-ink-400 max-w-[44ch]">
						{body}
					</p>
				</div>
			</div>
			{demo && (
				<div
					className={`mt-7 mx-auto ${featured ? 'max-w-[280px]' : 'max-w-[220px]'}`}
				>
					{demo}
				</div>
			)}
		</Card>
	)
}

function ContextSection() {
	const items = [
		{
			img: '/brand/context/dark_album.png',
			label: 'Album',
			body: 'Friend deep into one record? You see the album they’re listening from.'
		},
		{
			img: '/brand/context/dark_artist.png',
			label: 'Artist',
			body: 'Spiral on a single artist all afternoon? Spotivity shows it.'
		},
		{
			img: '/brand/context/dark_playlist.png',
			label: 'Playlist',
			body: 'Vibing a curated mix? Playlist context tells you where they are.'
		}
	]
	return (
		<Section tight>
			<Container>
				<div className="rounded-5xl bg-ink text-mint-50 p-8 sm:p-10 md:p-16 relative isolate overflow-hidden">
					<div className="absolute -z-10 -top-32 -right-32 w-[460px] h-[460px] rounded-full bg-mint/15 blur-[140px]" />
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
						<div>
							<h3 className="title-md text-mint-50 leading-tight">
								Real context, not just titles.
							</h3>
							<p className="mt-4 text-[0.97rem] text-mint-50/70 max-w-[30ch]">
								Every activity item tells you whether it’s an album deep-dive,
								an artist binge, or a playlist mood.
							</p>
						</div>
						{items.map((it) => (
							<div
								key={it.label}
								className="rounded-3xl bg-white/[0.04] border border-white/[0.08] p-6"
							>
								<img
									src={it.img}
									alt=""
									aria-hidden="true"
									className="w-9 h-9"
									draggable="false"
								/>
								<div className="mt-4 font-bold text-lg text-mint-50">
									{it.label}
								</div>
								<div className="mt-1 text-[0.9rem] text-mint-50/65">
									{it.body}
								</div>
							</div>
						))}
					</div>
				</div>
			</Container>
		</Section>
	)
}
