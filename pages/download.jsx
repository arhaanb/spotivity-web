import React from 'react'

const DownloadPage = ({ deviceType }) => {
	return (
		<div>
			<p>Your device type is: {deviceType}</p>
		</div>
	)
}

DownloadPage.getInitialProps = async ({ req, res }) => {
	// Redirect to another page
	function getMobileOperatingSystem(uaid) {
		// Windows Phone must come first because its UA also contains "Android"
		// if (/windows phone/i.test(uaid)) {
		// 	return 'Windows Phone'
		// }

		if (/android/i.test(uaid)) {
			return 'android'
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(uaid)) {
			return 'ios'
		}

		return 'unknown'
	}

	const userAgent = req.headers['user-agent']

	const deviceType = getMobileOperatingSystem(userAgent)

	// redirection code
	// res.writeHead(302, {
	// 	Location: 'https://arhaanb.com/some-other-page'
	// })
	return { deviceType }
	res.end()
}

export default DownloadPage
