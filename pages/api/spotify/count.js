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
				res.status(200).json({ success: true, userCount: pets.length })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		default:
			res.status(400).json({ success: false })
			break
	}
}
