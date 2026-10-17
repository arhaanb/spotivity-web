import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Coffee } from 'lucide-react'

const BMC = 'https://buymeacoffee.com/arhaanb'
const STORAGE_KEY = 'spv:dismissed-support'
const DISMISS_DAYS = 7

export default function FloatingSupport() {
	const [visible, setVisible] = useState(false)
	const [dismissed, setDismissed] = useState(true)

	// Check dismissal state on mount
	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY)
			if (stored) {
				const ts = parseInt(stored, 10)
				const elapsedDays = (Date.now() - ts) / (1000 * 60 * 60 * 24)
				if (elapsedDays < DISMISS_DAYS) return
			}
			setDismissed(false)
		} catch {
			setDismissed(false)
		}
	}, [])

	// Appear after scrolling 600px
	useEffect(() => {
		if (dismissed) return
		const onScroll = () => {
			// Wait until the hero (and its phone mockup) is out of view
			const threshold = window.innerWidth < 768 ? 1400 : 900
			if (window.scrollY > threshold) setVisible(true)
		}
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [dismissed])

	const dismiss = () => {
		try {
			localStorage.setItem(STORAGE_KEY, String(Date.now()))
		} catch {}
		setVisible(false)
		setDismissed(true)
	}

	return (
		<AnimatePresence>
			{visible && !dismissed && (
				<motion.div
					initial={{ opacity: 0, y: 20, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 20, scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 320, damping: 26 }}
					className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 flex items-center"
				>
					<a
						href={BMC}
						target="_blank"
						rel="noopener"
						className="group flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-[#FFDD00] text-ink font-semibold text-[0.9rem] shadow-float border border-ink/[0.08] hover:-translate-y-0.5 transition-transform"
					>
						<span className="grid place-items-center w-7 h-7 rounded-full bg-ink text-[#FFDD00]">
							<Coffee className="w-3.5 h-3.5" />
						</span>
						<span className="hidden sm:inline">Buy me a coffee</span>
						<span className="sm:hidden">Tip jar</span>
					</a>
					<button
						onClick={dismiss}
						aria-label="Dismiss"
						className="-ml-2 w-7 h-7 rounded-full bg-ink text-mint-50 grid place-items-center shadow-[0_8px_20px_-6px_rgba(15,27,20,0.4)] border border-ink/[0.08] hover:scale-105 transition-transform"
					>
						<X className="w-3.5 h-3.5" />
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
