// Soft hero atmosphere. Parent must be `relative isolate` so -z-10 stays inside it.
export default function HeroBackdrop() {
	return (
		<div
			aria-hidden
			className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
		>
			<div className="absolute -top-[30%] right-[-10%] w-[900px] h-[900px] rounded-full bg-mint/[0.16] blur-[140px]" />
			<div className="absolute top-[30%] -left-[15%] w-[520px] h-[520px] rounded-full bg-[#FFC93D]/[0.10] blur-[140px]" />
			<div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cream" />
		</div>
	)
}
