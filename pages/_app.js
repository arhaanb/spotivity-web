import Head from 'next/head'
import { useRouter } from 'next/router'
import '../css/globals.css'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import SmoothScroll from '../components/SmoothScroll'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingSupport from '../components/FloatingSupport'

const GA_MEASUREMENT_ID = 'G-CBMMDK6CZ5'
const SITE_URL = 'https://spotivity.me'

function MyApp({ Component, pageProps }) {
	const router = useRouter()
	const description =
		'Spotivity is the Gen Z music sharing app — see what your friends are listening to on Spotify in real time, plus your own top songs and artists. Beautiful dark theme, no ads. 100k+ downloads.'
	const title = 'Spotivity — See what your friends are listening to'
	const canonical = `${SITE_URL}${router.asPath.split('?')[0] || ''}`

	const orgJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Spotivity',
		url: SITE_URL,
		logo: `${SITE_URL}/og_new.png`,
		sameAs: [
			'https://apps.apple.com/us/app/spotivity-friend-activity/id6444594960',
			'https://play.google.com/store/apps/details?id=com.arhaanb.spotifyactivity',
			'https://twitter.com/arhaan_bahadur',
			'https://arhaanb.com'
		]
	}

	const appJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'MobileApplication',
		name: 'Spotivity',
		operatingSystem: 'iOS, Android',
		applicationCategory: 'MusicApplication',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		downloadUrl: [
			'https://apps.apple.com/us/app/spotivity-friend-activity/id6444594960',
			'https://play.google.com/store/apps/details?id=com.arhaanb.spotifyactivity'
		]
	}

	return (
		<>
			<GoogleAnalytics trackPageViews gaMeasurementId={GA_MEASUREMENT_ID} />

			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover"
				/>

				<link rel="canonical" href={canonical} />

				<meta name="author" content="Arhaan Bahadur" />
				<meta name="robots" content="index, follow, max-image-preview:large" />
				<meta name="googlebot" content="index, follow" />
				<meta name="description" content={description} />
				<meta
					name="keywords"
					content="spotify friend activity, music sharing app, gen z music app, spotify friends, music discovery, top songs, top artists, music sharing"
				/>

				<meta name="apple-itunes-app" content="app-id=6444594960" />
				<meta
					name="google-play-app"
					content="app-id=com.arhaanb.spotifyactivity"
				/>
				<meta name="theme-color" content="#0A0A0B" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@arhaan_bahadur" />
				<meta name="twitter:creator" content="@arhaan_bahadur" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={`${SITE_URL}/og_new.png`} />

				<meta property="og:site_name" content="Spotivity" />
				<meta property="og:url" content={canonical} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={`${SITE_URL}/og_new.png`} />
				<meta property="og:image:alt" content="Spotivity app preview" />
				<meta property="og:image:width" content="1280" />
				<meta property="og:image:height" content="720" />

				<link rel="icon" href="/favicon.ico" type="image/ico" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="manifest" href="/manifest.json" />

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
				/>
			</Head>

			<SmoothScroll>
				<div className="relative min-h-screen bg-cream text-ink-900 overflow-x-clip">
					<Navbar />
					<main className="relative overflow-x-clip">
						<Component {...pageProps} />
					</main>
					<Footer />
					<FloatingSupport />
				</div>
			</SmoothScroll>
		</>
	)
}

export default MyApp
