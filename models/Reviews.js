import mongoose from 'mongoose';

const ReviewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    paramTree: {
      type: String,
      require: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Reviews', ReviewsSchema);