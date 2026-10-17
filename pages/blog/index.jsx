import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Container from '../../components/ui/Container'
import Section from '../../components/ui/Section'
import BlogCover from '../../components/BlogCover'
import { POSTS } from '../../components/data/posts'

export default function Blog() {
	const [featured, ...rest] = POSTS

	return (
		<>
			<Head>
				<title>Blog — Spotivity</title>
				<meta
					name="description"
					content="Stories, guides, and product notes about Spotivity, music sharing, and Gen Z music culture."
				/>
				<link rel="canonical" href="https://spotivity.me/blog" />
			</Head>

			<PageHeader
				title="Notes from the listening room."
				subtitle="Guides, product notes, and the occasional culture dispatch. Written for fans, journalists, and curious lurkers."
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Blog' }
				]}
			/>

			<Section tight>
				<Container>
					{/* Featured post */}
					<motion.article
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
						className="mb-10"
					>
						<Link
							href={`/blog/${featured.slug}`}
							className="group block rounded-4xl overflow-hidden border border-ink/[0.08] bg-white hover:-translate-y-0.5 transition-transform"
						>
							<div className="grid md:grid-cols-2">
								<div className="md:order-2 min-h-[260px] md:min-h-[400px]">
									<BlogCover slug={featured.slug} size="lg" />
								</div>
								<div className="md:order-1 p-8 md:p-12 flex flex-col justify-between">
									<div>
										<span className="inline-flex items-center px-3 py-1 rounded-full text-[0.72rem] font-medium bg-mint-50 text-mint-700 border border-mint/20">
											{featured.category}
										</span>
										<h2 className="mt-5 font-bold text-[1.85rem] md:text-[2.4rem] leading-[1.05] tracking-tight group-hover:text-mint-700 transition-colors text-balance">
											{featured.title}
										</h2>
										<p className="mt-4 text-[0.97rem] text-ink-400 text-pretty">
											{featured.excerpt}
										</p>
									</div>
									<div className="mt-8 flex items-center justify-between text-xs text-ink-300">
										<span>
											{featured.date} · {featured.readTime}
										</span>
										<ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-mint-700 group-hover:rotate-12 transition-transform" />
									</div>
								</div>
							</div>
						</Link>
					</motion.article>

					{/* Rest */}
					<div className="grid md:grid-cols-2 gap-6">
						{rest.map((p, i) => (
							<motion.article
								key={p.slug}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.25 }}
								transition={{ duration: 0.5, delay: i * 0.06 }}
							>
								<Link
									href={`/blog/${p.slug}`}
									className="group block rounded-4xl overflow-hidden border border-ink/[0.08] bg-white hover:-translate-y-0.5 transition-transform h-full flex flex-col"
								>
									<div className="min-h-[260px]">
										<BlogCover slug={p.slug} />
									</div>
									<div className="p-7 flex-1 flex flex-col">
										<span className="inline-flex items-center self-start px-3 py-1 rounded-full text-[0.7rem] font-medium bg-mint-50 text-mint-700 border border-mint/20">
											{p.category}
										</span>
										<h3 className="mt-4 font-bold text-[1.3rem] leading-tight tracking-tight group-hover:text-mint-700 transition-colors text-balance">
											{p.title}
										</h3>
										<p className="mt-3 text-[0.92rem] text-ink-400 text-pretty">
											{p.excerpt}
										</p>
										<div className="mt-auto pt-6 flex items-center justify-between text-xs text-ink-300">
											<span>
												{p.date} · {p.readTime}
											</span>
											<ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-mint-700 group-hover:rotate-12 transition-transform" />
										</div>
									</div>
								</Link>
							</motion.article>
						))}
					</div>
				</Container>
			</Section>
		</>
	)
}
