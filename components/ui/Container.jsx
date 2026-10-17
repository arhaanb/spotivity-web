// One shell, one gutter, one max-width. Pass a max-w-* class to narrow it.
export default function Container({ className = '', children, ...rest }) {
	const width = /(^|\s)max-w-/.test(className) ? '' : 'max-w-[1200px]'
	return (
		<div
			className={`mx-auto w-full ${width} px-5 sm:px-7 md:px-10 ${className}`}
			{...rest}
		>
			{children}
		</div>
	)
}
