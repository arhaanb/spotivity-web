import Head from 'next/head'
import Link from 'next/link'
import '../css/skeleton.css'
import '../css/styles.css'

function MyApp({ Component, pageProps }) {
	const description =
		'Spotivity — See what your Spotify friends are listening to on the go!'
	const title = 'Spotivity'
	const author = 'Arhaan Bahadur'

	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&family=Manrope:wght@400;600;700&display=swap"
					rel="stylesheet"
				/>

				{/* SEO */}
				<meta name="author" content={author} />
				<meta name="robots" content="index, follow" />
				<meta name="googlebot" content="index, follow" />
				<meta name="description" content={description} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@arhaan_bahadur" />
				<meta name="twitter:creator" content="@arhaan_bahadur" />
				<meta property="og:url" content="https://spotivity.vercel.app" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta
					property="og:image"
					content="https://spotivity.vercel.app/og.png"
				/>
				<meta property="og:image:alt" content={title} />
				<meta property="og:image:width" content="1280" />
				<meta property="og:image:height" content="720" />
				<meta name="theme-color" content="#40E8D9" />
				<link rel="icon" href="/favicon.ico" type="image/ico" />
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>

			<div>
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default MyApp
