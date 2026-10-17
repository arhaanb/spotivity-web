import Link from 'next/link'
import Logo from './Logo'
import Container from './ui/Container'
import { Instagram, Twitter, Github } from 'lucide-react'

const COLS = [
	{
		title: 'Product',
		links: [
			['Features', '/features'],
			['FAQ', '/faq'],
			['Blog', '/blog']
		]
	},
	{
		title: 'Download',
		links: [
			['App Store', 'https://apps.apple.com/us/app/spotivity-friend-activity/id6444594960'],
			['Google Play', 'https://play.google.com/store/apps/details?id=com.arhaanb.spotifyactivity']
		]
	},
	{
		title: 'Company',
		links: [
			['About', '/about'],
			['Press', '/press'],
			['Privacy', '/privacy.html'],
			['Terms', '/terms']
		]
	}
]

export default function Footer() {
	return (
		<footer className="relative bg-ink text-mint-50/80 mt-16 md:mt-24">
			<Container className="py-20 md:py-24">
				<div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 md:gap-x-10">
					<div className="col-span-2 md:col-span-5">
						<Link href="/" className="flex items-center gap-2.5">
							<Logo className="w-9 h-9" />
							<span className="font-bold text-2xl tracking-[-0.035em] text-mint-50">
								Spotivity
							</span>
						</Link>
						<p className="mt-5 text-[0.95rem] text-mint-50/60 max-w-[34ch]">
							A beautifully simple way to share what you’re listening to —
							live, with your friends, on iOS and Android.
						</p>
						<div className="mt-7 flex items-center gap-2">
							{[
								[Twitter, 'https://twitter.com/arhaan_bahadur', 'Twitter'],
								[Instagram, 'https://instagram.com/arhaanb', 'Instagram'],
								[Github, 'https://github.com/arhaanb', 'GitHub']
							].map(([Icon, href, label]) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noopener"
									className="p-2.5 rounded-full bg-white/[0.06] hover:bg-mint hover:text-ink transition-colors"
									aria-label={label}
								>
									<Icon className="w-4 h-4" />
								</a>
							))}
						</div>
					</div>

					{COLS.map((col) => (
						<div key={col.title} className="md:col-span-2">
							<h6 className="font-semibold text-[0.9rem] tracking-normal text-mint-50 mb-4">
								{col.title}
							</h6>
							<ul className="space-y-2.5 text-[0.9rem]">
								{col.links.map(([label, href]) => {
									const ext = href.startsWith('http')
									const file = href.endsWith('.html')
									return (
										<li key={label}>
											{ext || file ? (
												<a
													href={href}
													{...(ext && { target: '_blank', rel: 'noopener' })}
													className="text-mint-50/65 hover:text-mint transition-colors"
												>
													{label}
												</a>
											) : (
												<Link
													href={href}
													className="text-mint-50/65 hover:text-mint transition-colors"
												>
													{label}
												</Link>
											)}
										</li>
									)
								})}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-16 pt-6 border-t border-white/[0.08]" />
				<div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-mint-50/45">
					<p>
						© {new Date().getFullYear()} Spotivity. Not affiliated with Spotify
						AB.
					</p>
					<p>
						Built by{' '}
						<a
							href="https://arhaanb.com"
							target="_blank"
							rel="noopener"
							className="text-mint hover:underline"
						>
							Arhaan Bahadur
						</a>
					</p>
				</div>
			</Container>
		</footer>
	)
}
