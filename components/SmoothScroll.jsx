import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
	useEffect(() => {
		if (typeof window === 'undefined') return
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (reduce) return

		const lenis = new Lenis({
			duration: 1.05,
			smoothWheel: true,
			lerp: 0.1
		})

		let frameId
		function raf(time) {
			lenis.raf(time)
			frameId = requestAnimationFrame(raf)
		}
		frameId = requestAnimationFrame(raf)

		return () => {
			cancelAnimationFrame(frameId)
			lenis.destroy()
		}
	}, [])

	return children
}
