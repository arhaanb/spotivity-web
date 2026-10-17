import { motion } from 'framer-motion'

// Real iOS product screenshot (live Friend Activity feed)
export default function PhoneFrame() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
			className="relative mx-auto w-full max-w-[330px]"
		>
			<div
				aria-hidden
				className="absolute inset-x-[8%] top-[12%] bottom-[6%] rounded-[3rem] bg-mint/30 blur-[70px]"
			/>
			<picture>
				<source srcSet="/screens/ios-friend-activity-web.webp" type="image/webp" />
				<img
					src="/screens/ios-friend-activity-web.png"
					alt="Spotivity on iOS showing a live feed of what friends are listening to"
					width={760}
					height={1306}
					fetchPriority="high"
					draggable={false}
					className="relative w-full h-auto select-none drop-shadow-[0_40px_50px_rgba(15,27,20,0.22)]"
				/>
			</picture>
		</motion.div>
	)
}
