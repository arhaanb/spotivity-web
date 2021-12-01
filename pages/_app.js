import Head from 'next/head'
import Link from 'next/link'
import '../styles.css'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Spotivity</title>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css"
					integrity="sha512-EZLkOqwILORob+p0BXZc+Vm3RgJBOe1Iq/0fiI7r/wJgzOFZMlsqTa29UEl6v6U6gsV4uIpsNZoV32YZqrCRCQ=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
			</Head>

			<div>
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default MyApp
