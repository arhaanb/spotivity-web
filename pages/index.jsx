import Link from 'next/link'

const Index = ({ }) => (
	<>
		<div className="container">
			<br />
			<br />
			<h3>Spotivity</h3>
			<p>
				Check your Spotify friend activity on the go. Download now at <a href="https:////arhn.us/spotivity">arhn.us/spotivity</a>.
			</p>
			<p>Admin panel available at <Link href="/users"><a>/users</a></Link>.</p>
		</div>
	</>
)

export default Index
