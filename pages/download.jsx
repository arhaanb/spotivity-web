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

	const userAgent = req.headers['user-agent']

	// Get Device Type
	let deviceType
	if (userAgent.includes('Android')) {
		deviceType = 'Android'
	} else if (userAgent.includes('iOS')) {
		deviceType = 'iOS'
	} else {
		deviceType = 'Other'
	}

	// Log device type
	console.log(`Device type is ${deviceType}`)

	// res.writeHead(302, {
	// 	Location: 'https://arhaanb.com/some-other-page'
	// })
	return { deviceType }
	res.end()
}

export default DownloadPage
