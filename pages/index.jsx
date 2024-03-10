import Link from 'next/link'
import Mock from '../css/mock.png'
import Main from '../css/main.png'
import Brand from '../css/brand.svg'
import Play from '../css/play.svg'
import Apple from '../css/img/apple.svg'
import Behance from '../css/behance.svg'
import Logo from '../css/logo.svg'
import Yuh from '../css/yuh.png'
import Dark from '../css/darkmode.png'
import Image from 'next/legacy/image'
import AppleWhite from '../css/img/applewhite.svg'
import PlayIcon from '../css/img/play.svg'
import BigMock from '../css/img/mockup.png'

function PlayBtn() {
	return (
		<>
			<a
				className="play btn"
				href="https://play.google.com/store/apps/details?id=com.arhaanb.spotifyactivity"
				target="_blank"
			>
				<div className="img">
					<Image src={PlayIcon} alt="Google Play Store" draggable="false" />
				</div>

				<span>Google Play</span>
			</a>
		</>
	)
}

function SupportBtn() {
	return (
		<>
			<a
				className="support btn"
				href="https://buymeacoffee.com/arhaanb"
				target="_blank"
				style={{ width: '75%' }}
			>
				<div className="img">
					<img
						src="https://seeklogo.com/images/B/buy-me-a-coffee-logo-F1878A1EB2-seeklogo.com.png"
						alt="Buy me a coffee"
						draggable="false"
					/>
				</div>

				<span>Buy Me A Coffee</span>
			</a>
		</>
	)
}

function DownloadBtn({ dark, className, link }) {
	return (
		<>
			<a
				className={`${className} ${dark ? 'apple' : 'play'} btn`}
				href={link ? link : '/'}
				target="_blank"
			>
				<div className="img">
					<Image src={Behance} alt="Behance" draggable="false" />
				</div>

				<span>Behance</span>
			</a>
		</>
	)
}

function AppStoreBtn() {
	return (
		<>
			<a
				className="apple btn"
				href="https://apps.apple.com/us/app/spotivity-friend-activity/id6444594960?platform=iphone"
				target="_blank"
			>
				<div className="img">
					<Image
						className="img"
						src={AppleWhite}
						alt="Apple App Store"
						draggable="false"
					/>
				</div>
				{/* <img src="/spotivity/applewhite.svg" alt="" /> */}
				<span>App Store</span>
			</a>
		</>
	)
}

const Index = ({ deviceType }) => (
	<>
		<section className="container" id="mainp">
			<br className="anti" />
			<br className="anti" />
			<div className="row">
				<div className="six columns respcols">
					<br className="anti" />
					<br className="anti" />
					<br className="anti" />
					<br className="anti" />
					<br className="anti" />
					<br className="anti" />
					<div className="brandimg">
						<Image src={Brand} alt="Spotivity | Branding" draggable="false" />
					</div>

					<div>
						<h1 style={{ marginBottom: 5, fontSize: 40, marginTop: 0 }}>
							See what music your friends are listening to!
						</h1>

						<div
						// className="parawidth"
						>
							{/* <p
								style={{ fontSize: '1.2em' }}
								// className="mainpara"
							>
								Check your Spotify friend activity right from your phone with
								Spotivity.
							</p> */}
						</div>
					</div>

					<div
						style={{ marginTop: 25 }}
						className="flexbtn bro noselect laptop"
					>
						<AppStoreBtn />
						<PlayBtn />
					</div>
					<div style={{ marginTop: 20, marginBottom: -15 }} className="mob">
						{deviceType == 'android' ? <PlayBtn /> : <AppStoreBtn />}
					</div>
					<div className="u-cf"></div>
				</div>

				<div className="six columns">
					<div
						className="brandimgclass"
						style={{ width: '87%', marginTop: '1.8em', marginLeft: '7.5%' }}
					>
						<Image
							src={BigMock}
							alt="Spotivity mockup"
							draggable="false"
							placeholder="blur"
						/>
					</div>
				</div>
			</div>
		</section>

		<div className="maingrid">
			<div
				className="block size2 extra"
				style={{ backgroundColor: '#F6F6F6', padding: '2em 4em 2em 4em' }}
			>
				<Image
					src={Mock}
					alt="Spotivity mockup"
					draggable={false}
					placeholder="blur"
				/>
			</div>

			<div className="block size2 extra" style={{ backgroundColor: '#F6F6F6' }}>
				<br className="anti" />
				<br className="anti" />
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-start',
						alignItems: 'center',
						gap: '1em',
						marginBottom: 10
					}}
				>
					{/* <img src="/huh.png" style={{ width: '3.5em' }} alt="" /> */}
					<h2 className="zero" style={{ marginBottom: 5 }}>
						Spotivity
					</h2>
				</div>
				<p>
					See what music your friends are listening to on the go! View your{' '}
					<span className="bold">Friend Activity</span> and view your stats
					&mdash; your <span className="bold">Top Songs and Artists</span> for
					all time ranges!
				</p>

				<p>
					The app brings one of the most requested features of Spotify to your
					phone, without having to use the desktop app.
				</p>

				<div className="laptop flexbtn bro noselect">
					<AppStoreBtn />
					<PlayBtn />
				</div>

				<div className="mob">
					{deviceType == 'android' ? <PlayBtn /> : <AppStoreBtn />}
				</div>
			</div>

			<div className="block size2" style={{ backgroundColor: '#d1ffee' }}>
				<div className="flex-center">
					<div style={{ width: '62%', marginBottom: 10 }}>
						<Image
							src={Yuh}
							alt="Grid of music artists"
							draggable="false"
							placeholder="blur"
						/>
					</div>
				</div>
				<h2 style={{ marginBottom: 5, marginTop: 5 }}>Design</h2>
				<p>
					Check out the thought process behind the logo and app.{' '}
					<a href="https://arhaanb.com/explore#contact" target="_blank">
						Let me know
					</a>{' '}
					any feedback or feature requests for the app.
				</p>

				<div>
					{/* <button
						className="behance"
						onClick={() => window.open('https://arhn.us/spot-design')}
					>
						<div
							style={{
								width: '1.2em',
								marginRight: 10,
								marginBottom: '-0.2em'
							}}
						>
							<Image src={Behance} alt="Behance" draggable="false" />
						</div>
						Behance
					</button> */}

					<div className="laptop flexbtn smlbox bro noselect">
						<DownloadBtn
							className={'behance'}
							link={'https://arhn.us/spot-design'}
						/>
					</div>
					<div className="mob">
						<DownloadBtn
							className={'behance'}
							link={'https://arhn.us/spot-design'}
						/>
					</div>
				</div>
			</div>
		</div>

		<div className="maingrid">
			<div
				className="block size4"
				style={{ backgroundColor: '#323232', color: '#fff' }}
			>
				<div className="six columns">
					<h5 className="zero introdark" style={{ opacity: 0.5 }}>
						Introducing
					</h5>
					<h1>Night Mode</h1>
					<p>
						One of the most requested features for Spotivity is here. Reduce the
						strain on your eyes by viewing your friend activity with the all
						new, gorgeous dark theme.
					</p>
					{/* <button
						className="darkbtn"
						onClick={() => window.open('https://arhn.us/spotivity')}
					>
						<div
							style={{
								width: '1.2em',
								marginRight: 10,
								marginBottom: '-0.2em'
							}}
						>
							<Image src={Play} alt="Google Play Store" draggable="false" />
						</div>
						Play Store
					</button> */}
					<div className="laptop flexbtn bro noselect">
						<AppStoreBtn />
						<PlayBtn />
					</div>
					<div style={{ marginBottom: 25 }} className="mob nightmode">
						{deviceType == 'android' ? <PlayBtn /> : <AppStoreBtn />}
					</div>
				</div>
				<div className="six columns">
					<div className="flex-center">
						<Image
							src={Dark}
							alt="Spotivity in Dark Mode"
							draggable={false}
							placeholder="blur"
						/>
					</div>
					<div className="u-cf"></div>
				</div>
			</div>

			<div
				className="block size2 extra"
				style={{ backgroundColor: '#FFDD00', padding: '2em 4em 2em 4em' }}
			>
				<br className="anti" />
				<br className="anti" />
				<img src="/buymeacoffee.png" className="supportlogo" alt="" />
				<h2 className="zero" style={{ marginBottom: 5 }}>
					Support
				</h2>
				<p>Support my journey in creating delightful web and mobile apps.</p>
				<p>
					Made with 🖤 by{' '}
					<a href="https://arhaanb.com" target="_blank" className="suplink">
						Arhaan Bahadur
					</a>
				</p>

				<div className="supcont">
					<SupportBtn />
				</div>
			</div>
		</div>

		<div className="maingrid">
			<div className="footer size6">
				<div className="row">
					<div className="four columns">
						<h6>Spotivity</h6>
						{/* <p>Check your Spotify friend activity.</p> */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center'
							}}
						>
							<div style={{ width: '3em', marginRight: 12, marginTop: '5px' }}>
								<Image src={Logo} alt="Spotivity logo" draggable="false" />
							</div>
							<div>
								<p>
									<Link
										href="https://open.spotify.com/user/arhaanb"
										target="_blank"
									>
										Follow me on Spotify!
									</Link>
								</p>
								<p>
									Made by{' '}
									<Link href="https://arhaanb.com" target="_blank">
										Arhaan Bahadur
									</Link>
								</p>
							</div>
						</div>
					</div>
					<div className="four columns">
						<h6>Links</h6>
						<p>
							<Link href="/api/spotify">API</Link>
						</p>
						<p>
							<Link href="/users">Analytics</Link>
						</p>
						<p>
							<a
								href={
									process.env.NODE_ENV == 'production'
										? '/privacy'
										: `/privacy.html`
								}
							>
								Privacy Policy
							</a>
						</p>
					</div>

					<div className="four columns">
						<h6>External</h6>
						<p>
							<a
								href="https://apps.apple.com/us/app/spotivity-friend-activity/id6444594960"
								target="_blank"
							>
								App Store
							</a>
						</p>
						<p>
							<a
								href="https://play.google.com/store/apps/details?id=com.arhaanb.spotifyactivity"
								target="_blank"
							>
								Google Play Store
							</a>
						</p>
						<p>
							<a href="https://arhn.us/spot-design" target="_blank">
								Behance
							</a>
						</p>
						{/* <p>
							<a
								href="https://github.com/arhaanb/spotivity-web"
								target="_blank"
							>
								GitHub
							</a>
						</p> */}
					</div>
				</div>
			</div>
		</div>
	</>
)

Index.getInitialProps = async ({ req, res }) => {
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

	let userAgent
	if (req) {
		// if you are on the server and you get a 'req' property from your context
		userAgent = req.headers['user-agent'] // get the user-agent from the headers
	} else {
		userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
	}

	// const userAgent = req.headers['user-agent']

	const deviceType = getOS(userAgent)

	return { deviceType: deviceType || 'unknown' }
}

export default Index
