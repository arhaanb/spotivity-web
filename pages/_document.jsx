import { Html, Head, Main, NextScript } from 'next/document'
// import { GoogleAnalytics } from '@next/third-parties/google'

export default function Document() {
	return (
		<Html>
			<Head>
				{/* <link
					href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&family=Manrope:wght@400;600;700&display=swap"
					rel="stylesheet"
				/> */}
				{/* <GoogleAnalytics gaId="G-CBMMDK6CZ5" /> */}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
