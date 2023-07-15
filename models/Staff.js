import mongoose from 'mongoose'

const StaffSchema = new mongoose.Schema(
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

export default mongoose.model('Staff', StaffSchema);