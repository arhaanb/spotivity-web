import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Spotivity</title>
			</Head>

			<div>
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default MyApp
