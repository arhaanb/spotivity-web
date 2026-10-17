import { forwardRef } from 'react'

const Card = forwardRef(function Card(
	{ as: Tag = 'div', className = '', padded = true, flush = false, children, ...rest },
	ref
) {
	const base = 'bg-white border border-ink/[0.08] rounded-4xl'
	const pad = flush ? 'overflow-hidden' : padded ? 'p-6 md:p-8' : ''
	return (
		<Tag ref={ref} className={`${base} ${pad} ${className}`} {...rest}>
			{children}
		</Tag>
	)
})

export default Card
