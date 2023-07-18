import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Question', QuestionSchema);