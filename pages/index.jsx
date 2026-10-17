import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, ShieldCheck, Smartphone, ChevronRight } from 'lucide-react'

import HeroBackdrop from '../components/HeroBackdrop'
import PhoneFrame from '../components/PhoneFrame'
import SectionHeader from '../components/SectionHeader'
import SupportSection from '../components/SupportSection'
import Logo from '../components/Logo'

import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import StoreButtons from '../components/ui/StoreButtons'

import HelloWidget from '../components/widgets/HelloWidget'
import BestFriendWidget from '../components/widgets/BestFriendWidget'
import TopSongsWidget from '../components/widgets/TopSongsWidget'
import TopArtistsWidget from '../components/widgets/TopArtistsWidget'

import { TESTIMONIALS, FAQS } from '../components/data/mockData'

export default function Home() {
	return (
		<>
			<Hero />
			<ProductPreview />
			<StatsBand />
			<Testimonials />
			<DarkSpotlight />
			<FAQ />
			<SupportSection />
			<FinalCTA />
		</>
	)
}

/* =====================================================
	 HERO — title left, product right
	 ===================================================== */
function Hero() {
	const ref = useRef(null)
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start']
	})
	const yRight = useTransform(scrollYProgress, [0, 1], [0, -40])

	return (
		<section
			ref={ref}
			className="relative isolate pt-32 md:pt-40 pb-8 md:pb-12 overflow-hidden"
		>
			<HeroBackdrop />

			<Container className="grid lg:grid-cols-12 items-center gap-y-16 lg:gap-x-12">
				<div className="lg:col-span-7 relative z-10">
					<motion.h1
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.05 }}
						className="title-mega text-balance max-w-[12ch]"
					>
						See what your <span className="emph">friends</span> are listening
						to.
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.15 }}
						className="mt-6 max-w-[42ch] text-[1.1rem] leading-[1.6] text-ink-400 text-pretty"
					>
						A simple, beautiful way to share music with friends, plus your own
						top songs and artists. On iOS and Android.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.28 }}
						className="mt-9"
					>
						<StoreButtons />
						<p className="mt-5 text-sm text-ink-300">
							<span className="font-semibold text-ink">100k+ downloads</span>
							<span className="mx-2 text-ink/20">/</span>
							Works with Spotify Free and Premium
						</p>
					</motion.div>
				</div>

				<motion.div
					style={{ y: yRight }}
					className="lg:col-span-5 relative"
				>
					<div className="relative mx-auto max-w-[330px]">
						<PhoneFrame />

						<motion.div
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.7 }}
							className="hidden sm:block absolute -left-8 md:-left-20 bottom-[12%] w-48 z-10 -rotate-3"
						>
							<BestFriendWidget />
						</motion.div>
					</div>
				</motion.div>
			</Container>
		</section>
	)
}

/* =====================================================
	 PRODUCT PREVIEW — the three core screens + small print
	 ===================================================== */
function ProductPreview() {
	const cards = [
		{
			kicker: 'Friend activity',
			title: 'Who’s playing what, right now.',
			body:
				'A live feed of your friends’ listening. Tap any song or artist to open it in Spotify.',
			Demo: () => <HelloWidget count={3} />
		},
		{
			kicker: 'Top songs',
			title: 'Your most-played, ranked.',
			body:
				'Your most-played tracks from the last 30 days or all-time, with album art and rankings.',
			Demo: () => <TopSongsWidget />
		},
		{
			kicker: 'Top artists',
			title: 'The artists you’ve been deep in.',
			body:
				'Genres, follower counts, and one tap to their Spotify page.',
			Demo: () => <TopArtistsWidget />
		}
	]
	const extras = [
		{
			icon: Zap,
			title: 'One-tap sign-in',
			body: 'Log in with Spotify and your friends show up instantly.'
		},
		{
			icon: ShieldCheck,
			title: 'No ads',
			body: 'No banners, no nag screens, and none of your data is stored.'
		},
		{
			icon: Smartphone,
			title: 'iOS and Android',
			body: 'Works with both free and Premium Spotify accounts.'
		}
	]
	return (
		<Section>
			<Container>
				<SectionHeader
					title={
						<>
							Three things you’ll <span className="emph">actually use</span>.
						</>
					}
					lede="Everything Spotivity does, in three screens. No filler features, no settings maze."
				/>

				<div className="grid md:grid-cols-3 gap-5">
					{cards.map((c, i) => (
						<motion.div
							key={c.kicker}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.25 }}
							transition={{ duration: 0.55, delay: i * 0.08 }}
						>
							<Card className="h-full flex flex-col">
								<span className="kicker">{c.kicker}</span>
								<h3 className="mt-2 text-[1.35rem] leading-tight text-balance">
									{c.title}
								</h3>
								<p className="mt-3 text-[0.95rem] text-ink-400">{c.body}</p>
								<div className="mt-auto pt-8">
									<c.Demo />
								</div>
							</Card>
						</motion.div>
					))}
				</div>

				<div className="mt-14 grid sm:grid-cols-3 gap-8 sm:gap-6">
					{extras.map((e) => (
						<div key={e.title} className="flex gap-4">
							<div className="shrink-0 w-10 h-10 rounded-full bg-mint-100 text-mint-700 grid place-items-center">
								<e.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
							</div>
							<div>
								<h4 className="text-[1rem] tracking-tight leading-snug">
									{e.title}
								</h4>
								<p className="mt-1 text-[0.92rem] text-ink-400">{e.body}</p>
							</div>
						</div>
					))}
				</div>
			</Container>
		</Section>
	)
}

/* =====================================================
	 STATS BAND — real numbers and product facts only
	 ===================================================== */
function StatsBand() {
	const stats = [
		{ n: '100k+', label: 'people sharing what they play' },
		{ n: '10 sec', label: 'from download to your friends’ feed' },
		{ n: '1 tap', label: 'to play what they’re playing in Spotify' }
	]
	return (
		<Section bg="mint" tight>
			<Container>
				<div className="grid sm:grid-cols-3 gap-y-10 sm:divide-x divide-ink/10">
					{stats.map((s) => (
						<div key={s.label} className="text-center px-6">
							<div className="font-bold text-[clamp(2.6rem,5vw,3.75rem)] leading-none tracking-[-0.04em] tabular-nums">
								{s.n}
							</div>
							<div className="mt-3 text-[0.95rem] text-ink/70 font-medium">
								{s.label}
							</div>
						</div>
					))}
				</div>
			</Container>
		</Section>
	)
}

/* =====================================================
	 TESTIMONIALS
	 ===================================================== */
function Testimonials() {
	return (
		<Section>
			<Container>
				<SectionHeader
					title={
						<>
							What people are <span className="emph">saying</span>.
						</>
					}
				/>

				<div className="columns-1 md:columns-2 lg:columns-3 gap-5">
					{TESTIMONIALS.map((t, i) => (
						<motion.figure
							key={i}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
							className="mb-5 break-inside-avoid"
						>
							<Card>
								<blockquote className="text-[1.05rem] leading-[1.5] font-medium text-ink text-pretty">
									“{t.quote}”
								</blockquote>
								<figcaption className="mt-5 flex items-baseline justify-between gap-4 text-[0.8rem]">
									<span className="font-semibold text-ink">{t.author}</span>
									<span className="text-ink-300">{t.role}</span>
								</figcaption>
							</Card>
						</motion.figure>
					))}
				</div>
			</Container>
		</Section>
	)
}

/* =====================================================
	 DARK MODE — the same widgets, in the dark theme
	 ===================================================== */
function DarkSpotlight() {
	return (
		<Section tight>
			<Container>
				<div className="relative isolate rounded-5xl overflow-hidden bg-ink text-mint-50">
					<div
						aria-hidden
						className="absolute -z-10 top-1/2 right-[8%] -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-mint/20 blur-[130px]"
					/>
					<div className="grid md:grid-cols-2 gap-12 md:gap-8 p-8 sm:p-12 md:p-16 items-center">
						<div>
							<span className="kicker !text-mint">Dark theme</span>
							<h2 className="mt-3 title-lg text-mint-50 text-balance">
								Made for listening at <span className="emph">2 a.m.</span>
							</h2>
							<p className="mt-5 lede text-mint-50/65">
								True-black dark mode with mint accents. Easy on the eyes on the
								late train home.
							</p>
						</div>
						<div className="relative mx-auto w-full max-w-[300px] py-4">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.4 }}
								transition={{ duration: 0.6 }}
								className="relative w-[86%] -rotate-2"
							>
								<BestFriendWidget dark />
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.4 }}
								transition={{ duration: 0.6, delay: 0.12 }}
								className="relative w-[86%] ml-auto mt-4 rotate-2"
							>
								<TopSongsWidget dark />
							</motion.div>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	)
}

/* =====================================================
	 FAQ
	 ===================================================== */
function FAQ() {
	return (
		<Section>
			<Container className="max-w-3xl">
				<SectionHeader
					align="center"
					title={
						<>
							Frequently <span className="emph">asked</span>.
						</>
					}
				/>

				<Card flush>
					<div className="divide-y divide-ink/[0.07]">
						{FAQS.slice(0, 6).map((f) => (
							<details key={f.q} className="group">
								<summary className="cursor-pointer list-none flex items-center gap-5 px-6 py-5 md:px-8 md:py-6 hover:bg-cream-100 transition-colors">
									<span className="flex-1 font-semibold text-[1.02rem] tracking-tight">
										{f.q}
									</span>
									<ChevronRight className="w-4 h-4 text-ink-300 transition-transform group-open:rotate-90 shrink-0" />
								</summary>
								<div className="px-6 md:px-8 pb-6 -mt-1 text-[0.97rem] text-ink-400 leading-relaxed max-w-[60ch]">
									{f.a}
								</div>
							</details>
						))}
					</div>
				</Card>

				<div className="mt-8 text-center">
					<Link
						href="/faq"
						className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-mint-700 transition-colors"
					>
						All questions <ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</Container>
		</Section>
	)
}

/* =====================================================
	 FINAL CTA
	 ===================================================== */
function FinalCTA() {
	return (
		<Section tight id="download" className="scroll-mt-20">
			<Container>
				<div className="rounded-5xl bg-mint relative overflow-hidden">
					<div className="relative py-16 md:py-20 px-6 text-center">
						<Logo className="mx-auto mb-7 w-16 h-16 rounded-full ring-1 ring-ink/10 shadow-float" />
						<h2 className="title-xl text-balance max-w-[16ch] mx-auto">
							Your friends are already on it.
						</h2>
						<p className="mt-4 text-ink/70 text-[1.05rem] max-w-[40ch] mx-auto text-balance">
							Download Spotivity and see what your people are playing right
							now.
						</p>
						<StoreButtons center className="mt-9" />
					</div>
				</div>
			</Container>
		</Section>
	)
}
