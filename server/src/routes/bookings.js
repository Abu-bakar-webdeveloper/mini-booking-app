// routes/bookings.js
import express from 'express';
import { 
  createBooking, 
  getBookings, 
  getBooking, 
  updateBookingStatus 
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes protected
router.use(protect);

router.post('/', authorize('user'), createBooking);
router.get('/', getBookings);
router.get('/:id', getBooking);
router.put('/:id/status', authorize('manager', 'admin'), updateBookingStatus);

export default router;