import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function Counter({ value, suffix = '', duration = 1.6 }) {
	const ref = useRef(null)
	const inView = useInView(ref, { once: true, amount: 0.6 })
	const [n, setN] = useState(0)

	useEffect(() => {
		if (!inView) return
		const start = performance.now()
		let raf
		const tick = (t) => {
			const p = Math.min(1, (t - start) / (duration * 1000))
			const eased = 1 - Math.pow(1 - p, 3)
			setN(Math.round(value * eased))
			if (p < 1) raf = requestAnimationFrame(tick)
		}
		raf = requestAnimationFrame(tick)
		return () => cancelAnimationFrame(raf)
	}, [inView, value, duration])

	return (
		<span ref={ref} className="tabular-nums">
			{n.toLocaleString()}
			{suffix}
		</span>
	)
}
