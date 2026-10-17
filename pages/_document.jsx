import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en" className="bg-cream-100">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cookie&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className="bg-cream antialiased text-ink-900">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
