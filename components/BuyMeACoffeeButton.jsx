import clsx from 'clsx'

export const BMC_URL = 'https://buymeacoffee.com/arhaanb'

// Official Buy Me a Coffee button: brand yellow, cup logo, Cookie wordmark
export default function BuyMeACoffeeButton({ className }) {
	return (
		<a
			href={BMC_URL}
			target="_blank"
			rel="noopener"
			aria-label="Buy me a coffee"
			className={clsx(
				'inline-flex items-center gap-2 h-12 pl-3 pr-5 rounded-xl bg-[#FFDD00] text-black border border-black/10 whitespace-nowrap hover:-translate-y-0.5 transition-transform',
				className
			)}
		>
			<img src="/buymeacoffee.png" alt="" className="h-7 w-auto" />
			<span className="font-['Cookie',cursive] text-[1.75rem] leading-none">
				Buy me a coffee
			</span>
		</a>
	)
}
