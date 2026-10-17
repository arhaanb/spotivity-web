import { forwardRef } from 'react'

const SIZES = {
	sm: 'px-4 py-2 text-[0.85rem]',
	md: 'px-6 py-3 text-[0.95rem]',
	lg: 'px-7 py-3.5 text-[1rem]'
}

const VARIANTS = {
	ink:
		'bg-ink text-mint-50 hover:bg-ink-500 border border-transparent',
	mint:
		'bg-mint text-ink hover:-translate-y-px shadow-[0_8px_24px_-10px_rgba(59,206,144,0.55)] hover:shadow-[0_12px_32px_-10px_rgba(59,206,144,0.7)] border border-transparent',
	outline:
		'bg-transparent text-ink border border-ink/15 hover:bg-ink hover:text-mint-50 hover:border-ink',
	ghost:
		'bg-ink/[0.05] text-ink border border-transparent hover:bg-ink/[0.08]',
	ghostDark:
		'bg-white/[0.08] text-white border border-white/15 hover:bg-white/[0.16]'
}

const Button = forwardRef(function Button(
	{
		as: Tag = 'button',
		variant = 'ink',
		size = 'md',
		className = '',
		children,
		...rest
	},
	ref
) {
	const base =
		'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold tracking-[-0.03em] leading-none transition-[transform,box-shadow,background-color,color,border-color] duration-200'
	const cls = `${base} ${SIZES[size] || SIZES.md} ${
		VARIANTS[variant] || VARIANTS.ink
	} ${className}`
	return (
		<Tag ref={ref} className={cls} {...rest}>
			{children}
		</Tag>
	)
})

export default Button
