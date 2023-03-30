import axios from 'axios'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function LinkPage() {
	const [data, setData] = useState(false)
	const [currentLink, setCurrentLink] = useState(false)
	const [errormsg, setErr] = useState(false)

	function getLinkData() {
		axios.get('/api/spotify/link').then((link) => {
			setCurrentLink(link.data.link)
		})
	}

	const registerUser = async (event) => {
		event.preventDefault()
		axios
			.post('/api/spotify/link', {
				password: event?.target?.password?.value,
				link: event?.target?.link?.value
			})
			.then((res) => {
				setData(res?.data?.message)
				setErr(false)
				// event?.target?.link?.value = ""
				// event?.target?.password?.value = ""
				getLinkData()
			})
			.catch((err) => {
				console.log(err)
				setErr(err.message)
				setData(false)
				// event?.target?.password?.value = ""
			})
	}

	useEffect(() => {
		getLinkData()
	}, [])

	return (
		<>
			<div className="container">
				<br />
				<p className="zero">
					<Link href="/">&larr;&nbsp;&nbsp;&nbsp;Back home</Link>
				</p>
				<br />
				<div className="row">
					<div className="six columns">
						<h2 className="zero">Edit user link</h2>
						<p className="zero">
							Enter your password to edit the user link present at the bottom of
							the app. Download the mobile app from the{' '}
							<a href="//arhn.us/spotivity" target="_blank">
								Google Play Store
							</a>
							.
						</p>
					</div>
					<div className="u-cf"></div>
				</div>
				<p style={{ marginTop: 10 }}>
					current link:{' '}
					<a href={currentLink ? currentLink : '#'} target="_blank">
						{currentLink ? currentLink : null}
					</a>
				</p>

				<form className="zero" onSubmit={registerUser}>
					<input
						style={{ marginBottom: 10 }}
						className="zero"
						name="link"
						required
						type="text"
						placeholder="Link"
						autocomplete="off"
					/>{' '}
					<br />
					<input
						className="zero"
						name="password"
						required
						type="password"
						placeholder="Password"
					/>
					<button style={{ marginTop: 15, fontSize: 15 }} type="submit">
						Submit
					</button>
				</form>
				{errormsg ? (
					<p style={{ marginTop: 10 }}>
						{errormsg == 'Request failed with status code 400'
							? 'Incorrect password'
							: errormsg}
					</p>
				) : null}

				<div className="userdata" style={{ marginBottom: 50 }}>
					{data ? (
						<>
							<h5 style={{ marginBottom: 20, marginTop: 20 }}>
								{data ? data : 'error'}
							</h5>
						</>
					) : null}
				</div>
			</div>
		</>
	)
}
