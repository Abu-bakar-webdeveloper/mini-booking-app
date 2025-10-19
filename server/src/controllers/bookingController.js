// controllers/bookingController.js
import Booking from '../models/Booking.js';

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private (User)
export const createBooking = async (req, res) => {
  try {
    const { vehicleType, serviceType, issueDescription, preferredDate, location } = req.body;

    const booking = await Booking.create({
      user: req.user.id,
      vehicleType,
      serviceType,
      issueDescription,
      preferredDate,
      location
    });

    await booking.populate('user', 'name email');

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all bookings for user, or all for manager/admin
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res) => {
  try {
    let bookings;
    
    if (req.user.role === 'user') {
      bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    } else {
      bookings = await Booking.find().populate('user', 'name email').sort({ createdAt: -1 });
    }

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res) => {
  try {
    let booking;
    
    if (req.user.role === 'user') {
      booking = await Booking.findOne({ 
        _id: req.params.id, 
        user: req.user.id 
      });
    } else {
      booking = await Booking.findById(req.params.id).populate('user', 'name email');
    }

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Manager/Admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either Approved or Rejected'
      });
    }

    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = status;
    await booking.save();
    await booking.populate('user', 'name email');

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};