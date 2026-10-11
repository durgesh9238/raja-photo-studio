import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    eventType: { type: String, required: true, trim: true, maxlength: 60 },
    eventDate: { type: Date },
    packageName: { type: String, trim: true, maxlength: 40, default: '' },
    message: { type: String, trim: true, maxlength: 800, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'booked', 'closed'], default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
