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
	function getOS(uaid) {
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

	const deviceType = getOS(userAgent)

	// if (deviceType === 'android') {
	// 	res.redirect(
	// 		'https://play.google.com/store/apps/details?id=com.arhaanb.spotifyactivity'
	// 	)
	// 	// res.writeHead(302, {
	// 	// 	Location:

	// 	// })
	// 	// res.end()
	// } else if (deviceType === 'ios') {
	// 	res.redirect(
	// 		'https://apps.apple.com/us/app/spotivity-friend-activity/id6444594960'
	// 	)
	// 	// res.writeHead(302, {
	// 	// 	Location:
	// 	// 		'https://apps.apple.com/us/app/spotivity-friend-activity/id6444594960'
	// 	// })
	// 	// res.end()
	// }
	// // else {
	// // 	res.writeHead(302, {
	// // 		Location: '/'
	// // 	})
	// // res.end()
	// // }
	return { deviceType }
}

export default DownloadPage
