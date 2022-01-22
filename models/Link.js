import mongoose from 'mongoose'

const LinkSchema = new mongoose.Schema({
  link: {
    type: String,
    required: [true, 'Provide link.']
  },
  id: {
    type: String,
    required: [true, 'Provide id.']
  },
})

export default mongoose.models.Link || mongoose.model('Link', LinkSchema)
