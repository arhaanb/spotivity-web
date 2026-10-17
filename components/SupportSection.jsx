import { motion } from 'framer-motion'
import Container from './ui/Container'
import Section from './ui/Section'
import BuyMeACoffeeButton, { HeartIcon } from './BuyMeACoffeeButton'

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
					<div className="w-16 h-16 rounded-2xl bg-mint grid place-items-center rotate-[-6deg] shadow-card">
						<HeartIcon className="w-8 h-8 text-ink" />
					</div>
					<div>
						<h2 className="title-md text-balance">
							Spotivity is made by one person.
						</h2>
						<p className="mt-3 text-ink-400 text-[1rem] leading-[1.6] max-w-[52ch] text-pretty">
							No ads, nothing stored about you, just one indie developer
							building something people love. The app is free. If you’d like to help, you can make an
							optional donation to support development. It’s not a
							purchase, just a way to say thanks.
						</p>
					</div>
					<BuyMeACoffeeButton className="shadow-card justify-self-start" />
				</motion.div>
			</Container>
		</Section>
	)
}
