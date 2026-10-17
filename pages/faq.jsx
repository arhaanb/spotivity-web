import Head from 'next/head'
import { useState } from 'react'
import { ChevronRight, Mail, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { FAQS } from '../components/data/mockData'

export default function FAQ() {
	const [q, setQ] = useState('')
	const filtered = FAQS.filter(
		(f) =>
			!q.trim() ||
			f.q.toLowerCase().includes(q.toLowerCase()) ||
			f.a.toLowerCase().includes(q.toLowerCase())
	)

	const faqJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: FAQS.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	}

	return (
		<>
			<Head>
				<title>FAQ — Spotivity</title>
				<meta
					name="description"
					content="Everything you wanted to know about Spotivity — the Gen Z Spotify friend activity app."
				/>
				<link rel="canonical" href="https://spotivity.me/faq" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
				/>
			</Head>

			<PageHeader
				title="Frequently asked."
				subtitle={
					<>
						Quick answers to the questions we get most. Still stuck? Email{' '}
						<a href="mailto:hi@arhaanb.com" className="text-ink font-medium underline decoration-mint decoration-2 underline-offset-[3px] hover:text-mint-700 transition-colors">hi@arhaanb.com</a>.
					</>
				}
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'FAQ' }
				]}
			/>

			<Section tight>
				<Container className="max-w-3xl">
					<div className="relative mb-8">
						<Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
						<input
							type="text"
							value={q}
							onChange={(e) => setQ(e.target.value)}
							placeholder="Search questions…"
							className="w-full pl-12 pr-5 py-4 rounded-full bg-white border border-ink/[0.08] focus:border-mint focus:outline-none text-[0.95rem] text-ink placeholder-ink-300 transition-colors"
						/>
					</div>

					<Card flush>
						<div className="divide-y divide-ink/[0.08]">
							<AnimatePresence initial={false} mode="popLayout">
								{filtered.map((f) => (
									<motion.details
										key={f.q}
										layout
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="group"
									>
										<summary className="cursor-pointer list-none flex items-center gap-5 px-6 py-5 md:px-8 md:py-6 hover:bg-cream-100 transition-colors">
											<span className="flex-1 font-semibold text-[1.02rem] tracking-tight">
												{f.q}
											</span>
											<ChevronRight className="w-4 h-4 text-ink-300 transition-transform group-open:rotate-90 shrink-0" />
										</summary>
										<div className="px-6 md:px-8 pb-6 -mt-1 text-[0.97rem] text-ink-400 leading-relaxed max-w-[60ch]">
											{f.a}
										</div>
									</motion.details>
								))}
							</AnimatePresence>
							{filtered.length === 0 && (
								<div className="p-10 text-center text-ink-300 text-sm">
									No matches. Try a different word.
								</div>
							)}
						</div>
					</Card>
				</Container>
			</Section>

			<Section tight>
				<Container className="max-w-3xl">
					<div className="rounded-5xl bg-mint text-ink p-10 md:p-14 text-center">
						<h2 className="title-md">
							Still stuck?
						</h2>
						<p className="mt-2 text-ink/70">
							Drop a line — you’ll usually hear back within a day.
						</p>
						<div className="mt-6">
							<Button as="a" href="mailto:hi@arhaanb.com" variant="ink">
								<Mail className="w-4 h-4" /> Email us
							</Button>
						</div>
					</div>
				</Container>
			</Section>
		</>
	)
}
