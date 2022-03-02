import Link from 'next/link'
import Mock from '../css/mock.png'
import Main from '../css/main.png'
import Brand from '../css/brand.svg'
import Play from '../css/play.svg'
import Behance from '../css/behance.svg'
import Logo from '../css/logo.svg'
import Yuh from '../css/yuh.png'
import Image from 'next/image'

const Index = ({}) => (
	<>
		<section className="container" id="mainp">
			<div className="row center">
				<div className="flex-center">
					<div className="brandimg">
						<Image src={Brand} alt="Spotivity | Branding" draggable="false" />
					</div>
				</div>

				<div className="flex-center">
					<div className="wholewidth">
						<h1
							className="mainh1"
							style={{ marginBottom: 5, textAlign: 'center', marginTop: 0 }}
						>
							See what music your friends are listening to
						</h1>

						<div className="flex-center">
							<div className="parawidth">
								<p style={{ fontSize: '1.2em' }} className="center mainpara">
									Check your Spotify friend activity right from your phone with
									Spotivity.
								</p>
							</div>
						</div>
					</div>
					<a
						target="_blank"
						href="//arhn.us/spotivity"
						style={{ textDecoration: 'none' }}
					>
						<button>
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
						</button>
					</a>
				</div>
				<div className="u-cf"></div>
			</div>

			<div className="flex-center image">
				<div className="mainmockimg">
					<Image
						src={Main}
						alt="Spotivity mockup"
						draggable="false"
						placeholder="blur"
					/>
				</div>
			</div>
		</section>

		<div className="maingrid">
			<div
				className="block size4 extra"
				style={{ backgroundColor: '#F6F6F6', padding: '2em 4em 2em 4em' }}
			>
				<div className="four columns cardmockup">
					<Image
						src={Mock}
						alt="Spotivity mockup"
						draggable={false}
						placeholder="blur"
					/>
				</div>
				<div className="eight columns">
					<br className="anti" />
					<br className="anti" />
					<br />
					<h2 className="zero" style={{ marginBottom: 5, marginTop: 17 }}>
						Spotivity
					</h2>
					<p>
						The app brings one of the most requested features of Spotify to your
						phone. You can now see what your friends are up to without having to
						use the desktop app. Built with React Native and Expo.
					</p>

					<button onClick={() => window.open('https://arhn.us/spotivity')}>
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
					</button>
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
					Check out the Behance project to find out the thought process behind
					the logo and app. Also{' '}
					<a href="//arhaanbahadur.co/explore#contact" target="_blank">
						let me know
					</a>{' '}
					if you have any feedback or feature requests for the app.
				</p>

				<div>
					<button
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
					</button>
				</div>
			</div>
		</div>

		<div className="maingrid">
			<div className="footer size6">
				<div className="row">
					<div className="four columns">
						<h6>Spotivity</h6>
						<p>Check your Spotify friend activity.</p>
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
									Made by{' '}
									<a href="//arhaanbahadur.co" target="_blank">
										Arhaan Bahadur
									</a>
								</p>
								<p>
									<a
										href="https://open.spotify.com/user/arhaanb"
										target="_blank"
									>
										Follow me on Spotify!
									</a>
								</p>
							</div>
						</div>
					</div>
					<div className="four columns">
						<h6>Links</h6>
						<p>
							<a href="/api/spotify">API</a>
						</p>
						<p>
							<Link href="/users">
								<a>Analytics</a>
							</Link> / <Link href="/link">
								<a>Edit link</a>
							</Link>
						</p>
						<p>
							<a href="/privacy.html">Privacy Policy</a>
						</p>
					</div>

					<div className="four columns">
						<h6>External</h6>
						<p>
							<a href="https://arhn.us/spotivity" target="_blank">
								Google Play Store
							</a>
						</p>
						<p>
							<a href="https://arhn.us/spot-design" target="_blank">
								Behance
							</a>
						</p>
						<p>
							<a href="https://github.com/arhaanb/spotivity-web" target="_blank">
								GitHub
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	</>
)

export default Index
