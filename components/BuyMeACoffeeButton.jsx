import clsx from 'clsx'

export const BMC_URL = 'https://buymeacoffee.com/arhaanb'

export function HeartIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
			<path d="M12 21s-7.5-4.6-9.6-9.2C.8 8.2 3 4.5 6.6 4.5c2 0 3.5 1.1 4.4 2.5.2.3.6.3.8 0 .9-1.4 2.4-2.5 4.4-2.5 3.6 0 5.8 3.7 4.2 7.3C19.5 16.4 12 21 12 21z" />
		</svg>
	)
}

// Donation link (hosted on Buy Me a Coffee), styled to match the site
export default function BuyMeACoffeeButton({ className }) {
	return (
		<a
			href={BMC_URL}
			target="_blank"
			rel="noopener"
			className={clsx(
				'inline-flex items-center gap-2 h-12 pl-4 pr-5 rounded-full bg-ink text-white text-[0.95rem] font-semibold whitespace-nowrap hover:-translate-y-0.5 transition-transform',
				className
			)}
		>
			<HeartIcon className="w-4 h-4 text-mint" />
			Support development
		</a>
	)
}
