import Head from 'next/head'
import Link from 'next/link'
import '../css/skeleton.css'
import '../css/styles.css'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Spotivity</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&family=Manrope:wght@400;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<div>
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default MyApp
