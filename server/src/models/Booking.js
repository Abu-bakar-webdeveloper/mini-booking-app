// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['Car', 'SUV', 'Truck', 'Motorcycle', 'Other']
  },
  issueDescription: {
    type: String,
    required: true
  },
  preferredDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

// 🚀 INDEXING: Optimize common queries
bookingSchema.index({ user: 1 });              // Fast "my bookings" queries
bookingSchema.index({ status: 1 });            // Fast status filtering
bookingSchema.index({ preferredDate: 1 });     // Fast date-based sorting
bookingSchema.index({ user: 1, createdAt: -1 }); // User's bookings with latest first

export default mongoose.model('Booking', bookingSchema);