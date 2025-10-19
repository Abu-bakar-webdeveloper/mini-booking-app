// controllers/userController.js
import User from '../models/User.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create manager
// @route   POST /api/users/managers
// @access  Private (Admin)
export const createManager = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    const manager = await User.create({
      name,
      email,
      password,
      role: 'manager'
    });

    res.status(201).json({
      success: true,
      data: {
        id: manager._id,
        name: manager.name,
        email: manager.email,
        role: manager.role
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete manager
// @route   DELETE /api/users/managers/:id
// @access  Private (Admin)
export const deleteManager = async (req, res) => {
  try {
    const manager = await User.findOne({ 
      _id: req.params.id, 
      role: 'manager' 
    });

    if (!manager) {
      return res.status(404).json({
        success: false,
        message: 'Manager not found'
      });
    }

    if (manager._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Manager deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};