import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import Container from './ui/Container'
import Button from './ui/Button'
import StoreButtons from './ui/StoreButtons'

const NAV_LINKS = [
	{ href: '/features', label: 'Features' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/faq', label: 'FAQ' }
]


export default function Navbar() {
	const router = useRouter()
	const [scrolled, setScrolled] = useState(false)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12)
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	useEffect(() => {
		document.documentElement.style.overflow = open ? 'hidden' : ''
	}, [open])

	const isActive = (href) =>
		href === '/'
			? router.pathname === '/'
			: router.pathname === href ||
			  router.pathname.startsWith(`${href}/`)

	return (
		<>
			<header
				className={`fixed top-0 inset-x-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ${
					scrolled
						? 'bg-cream/80 backdrop-blur-md border-b border-ink/[0.06]'
						: 'bg-transparent border-b border-transparent'
				}`}
			>
				<Container>
					<div className="flex h-[68px] items-center justify-between gap-8">
						<Link
							href="/"
							className="flex items-center gap-2.5 shrink-0 group"
							aria-label="Spotivity home"
						>
							<Logo className="w-8 h-8 rounded-full ring-1 ring-ink/[0.08] transition-transform duration-300 group-hover:rotate-6" />
							<span className="font-bold text-[1.1rem] tracking-[-0.03em]">
								Spotivity
							</span>
						</Link>

						<nav className="hidden md:flex items-center gap-1">
							{NAV_LINKS.map((l) => {
								const active = isActive(l.href)
								return (
									<Link
										key={l.href}
										href={l.href}
										className={`relative px-3.5 py-2 text-[0.92rem] font-medium rounded-full transition-colors ${
											active
												? 'text-ink'
												: 'text-ink-400 hover:text-ink'
										}`}
									>
										{l.label}
										{active && (
											<motion.span
												layoutId="nav-pill"
												className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06]"
												transition={{
													type: 'spring',
													stiffness: 400,
													damping: 32
												}}
											/>
										)}
									</Link>
								)
							})}
						</nav>

						<div className="hidden md:flex items-center">
							<Button as={Link} href="/#download" variant="ink" size="sm">
								Get the app
							</Button>
						</div>

						<button
							onClick={() => setOpen(true)}
							className="md:hidden -mr-1 p-2 rounded-full hover:bg-ink/5"
							aria-label="Open menu"
						>
							<Menu className="w-5 h-5" />
						</button>
					</div>
				</Container>
			</header>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-[60] md:hidden bg-cream"
					>
						<Container>
							<div className="flex h-[68px] items-center justify-between">
								<Link
									href="/"
									onClick={() => setOpen(false)}
									className="flex items-center gap-2.5"
								>
									<Logo className="w-8 h-8 rounded-full ring-1 ring-ink/[0.08]" />
									<span className="font-bold text-[1.1rem] tracking-[-0.03em]">
										Spotivity
									</span>
								</Link>
								<button
									onClick={() => setOpen(false)}
									className="p-2 rounded-full hover:bg-ink/5"
									aria-label="Close menu"
								>
									<X className="w-6 h-6" />
								</button>
							</div>
							<nav className="mt-10 flex flex-col">
								{NAV_LINKS.map((l, i) => (
									<motion.div
										key={l.href}
										initial={{ x: -16, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ delay: 0.06 + i * 0.05 }}
									>
										<Link
											href={l.href}
											onClick={() => setOpen(false)}
											className="block py-5 border-b border-ink/[0.06] font-bold text-3xl tracking-[-0.035em]"
										>
											{l.label}
										</Link>
									</motion.div>
								))}
							</nav>
							<StoreButtons className="mt-10" />
						</Container>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
