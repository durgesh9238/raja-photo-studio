import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    tags: { type: [String], default: [] },
    eventType: { type: String, trim: true, maxlength: 60, default: '' },
    message: { type: String, trim: true, maxlength: 600, default: '' },
    allowPublic: { type: Boolean, default: false },
    // the studio approves a review before it can ever be shown on the site
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', feedbackSchema);
