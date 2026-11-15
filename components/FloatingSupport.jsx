import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BuyMeACoffeeButton from './BuyMeACoffeeButton'
import { useInvite } from '../lib/inviteStore'

export default function FloatingSupport() {
	const [visible, setVisible] = useState(false)
	// Sit above the invite banner while it's showing.
	const { invite, overlayOpen } = useInvite()
	const raised = invite && !overlayOpen

	// Appear once the hero (and its phone mockup) is out of view
	useEffect(() => {
		const onScroll = () => {
			const threshold = window.innerWidth < 768 ? 1400 : 900
			if (window.scrollY > threshold) setVisible(true)
		}
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ opacity: 0, y: 20, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 20, scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 320, damping: 26 }}
					className={`fixed right-5 md:right-7 z-40 transition-[bottom] duration-300 ${
						raised ? 'bottom-[92px] sm:bottom-[104px]' : 'bottom-5 md:bottom-7'
					}`}
				>
					<BuyMeACoffeeButton className="shadow-float" />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
