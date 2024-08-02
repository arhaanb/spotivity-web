import Head from 'next/head'
// import Link from 'next/link'
import '../css/skeleton.css'
import '../css/styles.scss'
import Script from 'next/script'
const GA_MEASUREMENT_ID = 'G-CBMMDK6CZ5'
// import { GoogleAnalytics } from '@next/third-parties/google'
import { GoogleAnalytics } from 'nextjs-google-analytics'

function MyApp({ Component, pageProps }) {
	const description =
		'Check your Spotify Friend Activity from your phone! See what music your friends are listening to on the go, in realtime!'
	const title = 'Spotivity'
	const author = 'Arhaan Bahadur'

	return (
		<>
			<GoogleAnalytics trackPageViews gaMeasurementId={GA_MEASUREMENT_ID} />

			<Head>
				<title>{title}</title>
				{/* <link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/> */}

				<link
					href="https://api.fontshare.com/v2/css?f[]=general-sans@1,2&display=swap"
					rel="stylesheet"
				/>

				{/* <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> */}
				{/* Google Analytics */}
				{/* <Script
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
					strategy="afterInteractive"
					onLoad={() => {
						console.log('Script has loaded')
					}}
				/>
				<Script
					id="google-analytics"
					strategy="afterInteractive"
					onLoad={() => {
						console.log('Script has loaded')
					}}
				>
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){window.dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${GA_MEASUREMENT_ID}');
					`}
				</Script> */}

				{/* SEO */}
				<meta name="author" content={author} />
				<meta name="robots" content="index, follow" />
				<meta name="googlebot" content="index, follow" />
				<meta name="description" content={description} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@arhaan_bahadur" />
				<meta name="twitter:creator" content="@arhaan_bahadur" />
				<meta property="og:url" content="https://spotivity.me/" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta
					property="og:image"
					content="https://spotivity.vercel.app/og_new.png"
				/>
				<meta property="og:image:alt" content={title} />
				<meta property="og:image:width" content="1280" />
				<meta property="og:image:height" content="720" />
				{/* <meta name="theme-color" content="#40E8D9" /> */}
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
