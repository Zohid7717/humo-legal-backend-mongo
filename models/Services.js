import mongoose from 'mongoose'

const ServicesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    text: {
      type: String,
      require: true
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Services', ServicesSchema);