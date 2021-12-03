import Link from 'next/link'
import Mock from '../css/mock.png'
import Main from '../css/main.png'
import Brand from '../css/brand.svg'
import Play from '../css/play.svg'
import Behance from '../css/behance.svg'
import Logo from '../css/logo.svg'
import Yuh from '../css/yuh.png'
import Image from 'next/image'

const Index = ({ }) => (
	<>
		{/* <div className="container">
			<br />
			<br />
			<h3>Spotivity</h3>
			<p>
				Check your Spotify friend activity on the go. Download now at <a href="https:////arhn.us/spotivity">arhn.us/spotivity</a>.
			</p>
			<p>Admin panel available at <Link href="/users"><a>/users</a></Link>.</p>
		</div> */}
		<section className="container" id="mainp">

			<br /><br />
			<div className="row center">
				<div className="flex-center">
					<div style={{ width: '20em' }}>
						<Image src={Brand} alt="" />
					</div>
				</div>
				<div className="flex-center">
					<div className="seven columns">
						<h1 style={{ marginBottom: 5, textAlign: 'center' }}>See what your friends are listening to</h1>
					</div>
					<div className="u-cf"></div>

					<div className="five columns">
						<p style={{ fontSize: '1.2em' }} className="center">Check your Spotify friend activity right from your phone with Spotivity.</p>
					</div>
					<div className="u-cf"></div>
					<a target="_blank" href="//arhn.us/spotivity" style={{ textDecoration: 'none' }}>
						<button>
							<div style={{ width: '1.2em', marginRight: 10, marginBottom: '-0.2em' }}>
								<Image src={Play} alt="" />
							</div>
							Play Store
						</button>
					</a>
				</div>

			</div>

			<div className="flex-center image">
				<div className="mainmockimg">
					<Image
						src={Main}
						alt="Spotivity mockup"
						draggable={false}
						placeholder="blur"
					/>
				</div>
			</div>
		</section>

		<div className="maingrid">

			<div className="block size4 extra" style={{ backgroundColor: '#F6F6F6', padding: '2em 4em 2em 4em' }}>
				<div className="four columns" style={{ marginTop: 45 }}>
					<Image
						src={Mock}
						alt="Spotivity mockup"
						draggable={false}
					/>
				</div>
				<div className="eight columns">
					<br /><br /><br />
					<h2 className="zero" style={{ marginBottom: 5 }}>Spotivity</h2>
					<p>The app brings one of the most requested features of Spotify to your phone. You can now see what your friends are up to without having to use the desktop app. Built with React Native and Expo.</p>

					<a target="_blank" href="//arhn.us/spotivity" style={{ textDecoration: 'none' }}>
						<button>
							<div style={{ width: '1.2em', marginRight: 10, marginBottom: '-0.2em' }}>
								<Image src={Play} alt="" />
							</div>
							Play Store
						</button>
					</a>
				</div>
			</div>

			<div className="block size2" style={{ backgroundColor: '#d1ffee' }}>
				<div className="flex-center">
					<div style={{ width: '62%', marginBottom: 10 }}>
						<Image
							src={Yuh}
							alt="Spotivity mockup"
							draggable={false}
						/>
					</div>
				</div>
				<h1 style={{ marginBottom: 7 }}>Design</h1>
				<p>
					Check out the Behance project to find out the thought process behind the logo and app.
					Also <a href="//arhaanbahadur.co/explore#contact" target="_blank">let me know</a> if you have any feedback
					or feature requests for the app.
				</p>

				<div>
					<a target="_blank" href="//arhn.us/spotivity" style={{ textDecoration: 'none' }}>
						<button className='behance'>
							<div style={{ width: '1.2em', marginRight: 10, marginBottom: '-0.2em' }}>
								<Image src={Behance} alt="" />
							</div>
							Behance
						</button>
					</a>
				</div>
				{/* <Image src={Brand} alt="" /> */}
			</div>

			{/* <div className="block size2">
				<h2>I like dick</h2>
			</div>

			<div className="block size4">
				<h2>pussy. money. weed.</h2>
			</div> */}
		</div>

		<div className="maingrid">
			<div className="footer size6">
				<div className="row">
					<div className="four columns">
						<h6>Spotivity</h6>
						<div style={{ display: 'flex', justifyContent: "flex-start", alignItems: 'center' }}>
							<div style={{ width: '3em', marginRight: 12, marginBottom: '-7px' }}>
								<Image
									src={Logo}
									alt="Spotivity logo"
									draggable={false}
								/>
							</div>
							<div>
								<p>Made by <a href="//arhaanbahadur.co" target="_blank">Arhaan Bahadur</a></p>
								<p><a href="https://open.spotify.com/user/arhaanb" target="_blank">Follow me on Spotify!</a></p>
							</div>
						</div>
					</div>
					<div className="four columns">
						<h6>Links</h6>
						<p>
							<a href="/api/spotify">API</a>
						</p>
						<p>
							<Link href='/users'>
								<a>Analytics</a>
							</Link>
						</p>
					</div>

					<div className="four columns">
						<h6>External</h6>
						<p><a href="//arhn.us/spotivity" target="_blank">Google Play Store</a></p>
						<p><a href="//arhn.us/spotivity" target="_blank">Behance</a></p>
					</div>
				</div>
			</div>
		</div>
	</>
)

export default Index
