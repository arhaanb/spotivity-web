import { motion } from 'framer-motion'

// Title + optional lede. No eyebrows, no numeric markers.
export default function SectionHeader({
	title,
	lede,
	dark = false,
	align = 'left',
	children
}) {
	const isCenter = align === 'center'
	return (
		<header
			className={`${isCenter ? 'text-center mx-auto' : ''} max-w-[42rem] mb-12 md:mb-16`}
		>
			<motion.h2
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.4 }}
				transition={{ duration: 0.55 }}
				className={`title-xl text-balance ${
					dark ? 'text-mint-50' : ''
				}`}
			>
				{title}
			</motion.h2>
			{lede && (
				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.55, delay: 0.06 }}
					className={`mt-5 lede text-pretty ${
						dark ? 'text-mint-50/70' : 'text-ink-400'
					} ${isCenter ? 'mx-auto' : ''}`}
				>
					{lede}
				</motion.p>
			)}
			{children}
		</header>
	)
}
