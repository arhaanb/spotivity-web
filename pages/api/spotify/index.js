import dbConnect from '../../../lib/dbConnect'
import Pet from '../../../models/Pet'
import User from '../../../models/User'

export default async function handler(req, res) {
	const { method } = req

	await dbConnect()

	switch (method) {
		case 'GET':
			try {
				const pets = await User.find({}) /* find all the data in our database */
				res.status(200).json({ success: true, data: pets })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		case 'POST':
			try {
				User.findOne({ username: req?.body?.username }).then((user) => {
					if (user) {
						user.currentDisplayName = req.body.currentDisplayName
						user.username = req.body.username
						user.email = req.body.email
						user.authToken = req.body.authToken

						user.save()
					} else {
						User.create(req.body)
					}
					res.status(201).json({ success: true, message: 'account created' })
				})
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}
