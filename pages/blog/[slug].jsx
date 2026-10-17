import Head from 'next/head'
import Link from 'next/link'
import { ChevronLeft, ArrowUpRight } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Container from '../../components/ui/Container'
import Section from '../../components/ui/Section'
import Button from '../../components/ui/Button'
import BlogCover from '../../components/BlogCover'
import { POSTS, POST_BODIES } from '../../components/data/posts'

export default function Post({ post, body, related }) {
	if (!post) return null

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.excerpt,
		datePublished: post.date,
		author: { '@type': 'Person', name: 'Arhaan Bahadur' },
		publisher: {
			'@type': 'Organization',
			name: 'Spotivity',
			logo: { '@type': 'ImageObject', url: 'https://spotivity.me/og_new.png' }
		},
		mainEntityOfPage: `https://spotivity.me/blog/${post.slug}`
	}

	return (
		<>
			<Head>
				<title>{`${post.title} — Spotivity blog`}</title>
				<meta name="description" content={post.excerpt} />
				<meta property="article:published_time" content={post.date} />
				<link
					rel="canonical"
					href={`https://spotivity.me/blog/${post.slug}`}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</Head>

			<PageHeader
				title={post.title}
				subtitle={post.excerpt}
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Blog', href: '/blog' },
					{ label: post.category }
				]}
			/>

			<Container className="-mt-8 md:-mt-12 relative z-10">
				<div className="rounded-4xl overflow-hidden border border-ink/[0.08] shadow-[0_22px_60px_-22px_rgba(15,27,20,0.25)] min-h-[280px] md:min-h-[400px]">
					<BlogCover slug={post.slug} size="lg" />
				</div>
			</Container>

			<Section tight>
				<Container className="max-w-[680px]">
					<div className="flex items-center gap-3 text-xs text-ink-300 mb-12">
						<span className="font-semibold text-mint-700">
							{post.category}
						</span>
						<span>·</span>
						<span>{post.date}</span>
						<span>·</span>
						<span>{post.readTime}</span>
					</div>

					<div className="prose prose-lg prose-headings:font-display prose-h3:mt-12 prose-h3:mb-3 prose-h3:text-[1.4rem] prose-p:text-ink-400 prose-p:leading-relaxed prose-strong:text-ink prose-a:text-mint-700 prose-a:no-underline hover:prose-a:underline max-w-none">
						{body.split('\n\n').map((p, i) => {
							const t = p.trim()
							if (!t) return null
							if (t.startsWith('**') && t.endsWith('**')) {
								return (
									<h3 key={i}>{t.replace(/\*\*/g, '')}</h3>
								)
							}
							return (
								<p
									key={i}
									dangerouslySetInnerHTML={{
										__html: t.replace(
											/\*\*(.+?)\*\*/g,
											'<strong>$1</strong>'
										)
									}}
								/>
							)
						})}
					</div>

					<div className="mt-16 pt-8 border-t border-ink/[0.08] flex items-center justify-between gap-4 flex-wrap">
						<Link
							href="/blog"
							className="text-sm text-ink-300 hover:text-ink inline-flex items-center gap-1"
						>
							<ChevronLeft className="w-4 h-4" /> All posts
						</Link>
						<Button
							as="a"
							href="https://apps.apple.com/us/app/spotivity-friend-activity/id6444594960"
							target="_blank"
							rel="noopener"
							variant="ink"
							size="sm"
						>
							Try Spotivity
						</Button>
					</div>
				</Container>
			</Section>

			{related.length > 0 && (
				<Section tight>
					<Container>
						<h2 className="title-md mb-8">
							Keep reading
						</h2>
						<div className="grid md:grid-cols-2 gap-6">
							{related.map((p) => (
								<Link
									key={p.slug}
									href={`/blog/${p.slug}`}
									className="group block rounded-4xl border border-ink/[0.08] bg-white p-7 hover:-translate-y-0.5 transition-transform"
								>
									<span className="kicker">
										{p.category}
									</span>
									<h3 className="mt-3 font-bold text-[1.25rem] leading-tight tracking-tight group-hover:text-mint-700 transition-colors text-balance">
										{p.title}
									</h3>
									<div className="mt-5 flex items-center justify-between text-xs text-ink-300">
										<span>{p.readTime}</span>
										<ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-mint-700 group-hover:rotate-12 transition-transform" />
									</div>
								</Link>
							))}
						</div>
					</Container>
				</Section>
			)}
		</>
	)
}

export async function getStaticPaths() {
	return {
		paths: POSTS.map((p) => ({ params: { slug: p.slug } })),
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	const post = POSTS.find((p) => p.slug === params.slug) || null
	const body = POST_BODIES[params.slug] || ''
	const related = POSTS.filter((p) => p.slug !== params.slug).slice(0, 2)
	return { props: { post, body, related } }
}
