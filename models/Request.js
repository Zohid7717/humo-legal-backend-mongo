import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    surname: {
      type: String,
    },
    phone: {
      type: Number,
      require: true,
    },
    time: {
      type: String,
    },
    question: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Request', RequestSchema);