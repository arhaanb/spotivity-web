import axios from 'axios'
import { useState } from 'react'
import Link from 'next/link'

export default function Blog() {
	const [data, setData] = useState(false)
	const [errormsg, setErr] = useState(false)

	const registerUser = async (event) => {
		event.preventDefault()
		axios
			.post('/api/spotify/users', { password: event?.target?.password?.value })
			.then((res) => {
				setData(res?.data?.message)
				setErr(false)
				// event?.target?.password?.value = ""
			})
			.catch((err) => {
				console.log(err)
				setErr(err.message)
				setData(false)
				// event?.target?.password?.value = ""
			})
	}

	return (
		<>
			<div className="container">
				<br />
				<p className="zero">
					<Link href="/">
						&larr;&nbsp;&nbsp;&nbsp;Back home
					</Link>
				</p>
				<br />
				<div className="row">
					<div className="six columns">
						<h2 className="zero">Spotivity Analytics</h2>
						<p>
							Enter your password to check Spotivity analytics. Download the
							mobile app from the{' '}
							<a href="//arhn.us/spotivity" target="_blank">
								Google Play Store
							</a>
							.
						</p>
					</div>
					<div className="u-cf"></div>
				</div>

				<form className="zero" onSubmit={registerUser}>
					<input
						className="zero"
						name="password"
						required
						type="password"
						placeholder="Password"
					/>
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
							<h4 style={{ marginBottom: 20, marginTop: 40 }}>
								User count: {data ? data.length : 'error'}
							</h4>
							<div className="GFG">
								{data?.map((user, index) => {
									// var options = { year: 'numeric', month: 'long', day: 'numeric' }
									var options = {
										year: 'numeric',
										month: 'short',
										day: 'numeric',
										hour: 'numeric',
										minute: 'numeric'
									}
									const event = new Date(user?.createdAt)

									const date = event.toLocaleDateString('en-US', options)
									return (
										<div
											key={user._id}
											style={{ marginBottom: 20 }}
											className="flexthing"
										>
											<div>
												<h4
													className="mono zero noselect"
													style={{ marginRight: '0.75em' }}
												>
													{data.length > 9
														? index < 9
															? `0${index + 1}`
															: index + 1
														: index + 1}
												</h4>
											</div>
											<div>
												<h5 className="zero">
													{user?.currentDisplayName ? (
														<a
															className="userlink"
															href={`https://open.spotify.com/user/${user?.username}`}
															target="_blank"
														>
															{user?.currentDisplayName}
														</a>
													) : (
														'error'
													)}
												</h5>
												<h6 className="zero">
													{user?.email ? user?.email : 'error'}
												</h6>
												<p style={{ fontSize: '0.9em' }} className="zero">
													{date}
												</p>
											</div>
										</div>
									)
								})}
							</div>
						</>
					) : null}
				</div>
			</div>
		</>
	)
}
