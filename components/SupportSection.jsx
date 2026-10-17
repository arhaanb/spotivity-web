import { motion } from 'framer-motion'
import Container from './ui/Container'
import Section from './ui/Section'
import BuyMeACoffeeButton from './BuyMeACoffeeButton'

export default function SupportSection() {
	return (
		<Section tight>
			<Container>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6 }}
					className="rounded-5xl bg-cream-200 p-8 sm:p-12 md:p-14 grid md:grid-cols-[auto_1fr_auto] gap-8 md:gap-10 items-center"
				>
					<div className="w-16 h-16 rounded-2xl bg-[#FFDD00] grid place-items-center rotate-[-6deg] shadow-card">
						<img src="/buymeacoffee.png" alt="Buy Me a Coffee" className="h-10 w-auto" />
					</div>
					<div>
						<h2 className="title-md text-balance">
							Spotivity is made by one person.
						</h2>
						<p className="mt-3 text-ink-400 text-[1rem] leading-[1.6] max-w-[52ch] text-pretty">
							No ads, nothing stored about you, just one indie developer
							building something people love. If it’s made your day a little
							better, a coffee helps keep it going.
						</p>
					</div>
					<BuyMeACoffeeButton className="shadow-card justify-self-start" />
				</motion.div>
			</Container>
		</Section>
	)
}
