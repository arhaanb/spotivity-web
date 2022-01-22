import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

export default async function handler(req, res) {
	const { method } = req

	await dbConnect()

	switch (method) {
		case 'GET':
			res.status(200).json({ success: true, message: 'Spotivity API' })
			break

		case 'POST':
			try {
				if (req?.body?.password == process?.env?.PASSWORD) {
					User.find({}, { authToken: 0 }).then((user) => {
						res.status(201).json({ success: true, message: user })
					})
				} else {
					res
						.status(400)
						.json({ success: false, message: 'Incorrect password.' })
				}
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}
