import Head from 'next/head'
import Logo from '../components/Logo'
import Container from '../components/ui/Container'
import StoreButtons from '../components/ui/StoreButtons'
import { APP_STORE, PLAY_STORE, detectPlatform } from '../lib/invite'

// spotivity.me/get: the one link to share (and what the site's QR codes
// point at). Phones go straight to their store; desktops see the QR.
export async function getServerSideProps({ req }) {
	const platform = detectPlatform(req.headers['user-agent'])
	if (platform === 'ios') {
		return { redirect: { destination: APP_STORE, permanent: false } }
	}
	if (platform === 'android') {
		return { redirect: { destination: PLAY_STORE, permanent: false } }
	}
	return { props: {} }
}

export default function Get() {
	return (
		<>
			<Head>
				<title key="title">Get Spotivity</title>
			</Head>
			<section className="pt-36 md:pt-44 pb-24">
				<Container className="flex flex-col items-center text-center">
					<Logo className="w-14 h-14" />
					<h1 className="mt-6 font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-ink-900">
						Get Spotivity on your phone
					</h1>
					<p className="mt-3 max-w-md text-ink-400">
						Scan with your camera. You’ll go straight to the App Store or
						Google Play.
					</p>
					<div className="mt-10 rounded-4xl bg-white p-7 shadow-card ring-1 ring-ink-900/5">
						<img
							src="/qr/get.svg"
							alt="QR code for spotivity.me/get"
							className="h-56 w-56"
							draggable="false"
						/>
					</div>
					<StoreButtons center className="mt-10" qr={false} />
				</Container>
			</section>
		</>
	)
}
