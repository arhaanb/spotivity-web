import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	currentDisplayName: {
		type: String
	},
	username: {
		type: String,
		required: [true, 'Provide Spotify username.']
	},
	email: {
		type: String,
		required: [true, 'Provide Spotify username.']
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
