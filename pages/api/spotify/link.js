import dbConnect from '../../../lib/dbConnect'
import Link from '../../../models/Link'

export default async function handler(req, res) {
	const { method } = req

	await dbConnect()

	switch (method) {
		case 'GET':
			try {
				const users = await Link.findOne({ id: 'spotivitylink' })
				res.status(200).json({ success: true, link: users.link })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		case 'POST':
			try {
				if (req?.body?.password == process?.env?.PASSWORD) {
					Link.findOne({ id: 'spotivitylink' }).then((link) => {
						if (link) {
							if (
								req?.body?.link?.slice(0, 8) == 'https://' ||
								req?.body?.link?.slice(0, 7) == 'http://'
							) {
								link.link = req?.body?.link
							} else {
								link.link = `https://${req?.body?.link}`
							}
							link.save()

							res.status(201).json({ success: true, message: 'Link created' })
						} else {
							res
								.status(201)
								.json({ success: false, message: 'Link not created' })
						}
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
