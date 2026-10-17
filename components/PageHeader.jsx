import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Container from './ui/Container'

export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
	return (
		<section className="relative bg-hero pt-36 md:pt-44 pb-16 md:pb-24 overflow-hidden bg-grain">
			{/* Smooth fade into cream background of next section */}
			<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-cream pointer-events-none" />
			<Container className="relative">
				{breadcrumbs.length > 0 && (
					<nav className="mb-10 flex items-center gap-1.5 text-xs text-ink-300">
						{breadcrumbs.map((b, i) => (
							<span key={i} className="flex items-center gap-1.5">
								{b.href ? (
									<Link href={b.href} className="hover:text-ink">
										{b.label}
									</Link>
								) : (
									<span className="text-ink">{b.label}</span>
								)}
								{i < breadcrumbs.length - 1 && (
									<ChevronRight className="w-3 h-3 opacity-50" />
								)}
							</span>
						))}
					</nav>
				)}
				<motion.h1
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="title-xl text-balance max-w-[16ch]"
				>
					{title}
				</motion.h1>
				{subtitle && (
					<motion.p
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.08 }}
						className="mt-6 lede max-w-[48ch] text-pretty text-ink-400"
					>
						{subtitle}
					</motion.p>
				)}
			</Container>
		</section>
	)
}
