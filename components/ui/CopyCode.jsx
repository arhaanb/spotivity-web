import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'

// An invite code chip with a copy button. `dark` for use on ink backgrounds.
export default function CopyCode({ code, dark = false, className = '' }) {
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		if (!copied) return
		const t = setTimeout(() => setCopied(false), 1600)
		return () => clearTimeout(t)
	}, [copied])

	const copy = async (e) => {
		e.stopPropagation()
		try {
			await navigator.clipboard.writeText(code)
		} catch {
			// Older browsers / insecure contexts.
			const el = document.createElement('textarea')
			el.value = code
			el.setAttribute('readonly', '')
			el.style.position = 'fixed'
			el.style.opacity = '0'
			document.body.appendChild(el)
			el.select()
			document.execCommand('copy')
			el.remove()
		}
		setCopied(true)
	}

	const Icon = copied ? Check : Copy
	return (
		<span
			className={`inline-flex items-center gap-1 rounded-lg py-0.5 pl-2 pr-0.5 align-middle ${
				dark ? 'bg-white/10 text-cream' : 'bg-ink-900/[0.06] text-ink-900'
			} ${className}`}
		>
			<span className="font-mono text-[0.8rem] font-semibold tracking-wider">
				{code}
			</span>
			<button
				type="button"
				onClick={copy}
				aria-label={copied ? 'Copied' : 'Copy invite code'}
				title={copied ? 'Copied' : 'Copy'}
				className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
					copied
						? 'text-mint-600'
						: dark
							? 'text-cream/60 hover:bg-white/10 hover:text-cream'
							: 'text-ink-400 hover:bg-ink-900/[0.08] hover:text-ink-900'
				}`}
			>
				<Icon size={13} strokeWidth={2.4} />
			</button>
			<span className="sr-only" aria-live="polite">
				{copied ? 'Invite code copied' : ''}
			</span>
		</span>
	)
}
