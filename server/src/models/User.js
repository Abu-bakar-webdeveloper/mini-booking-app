// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // 🔐 SECURITY: Never return password in queries
  },
  role: {
    type: String,
    enum: ['user', 'manager', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

// 🚀 INDEXING: Critical for performance
userSchema.index({ email: 1 });        // Fast login lookups
userSchema.index({ role: 1 });         // Fast role-based queries

// 🔐 PASSWORD OPERATION: Hash before saving
userSchema.pre('save', async function(next) {
  // Only hash if password was modified (not on other updates)
  if (!this.isModified('password')) return next();
  
  // Hash with salt rounds (12 = secure & fast balance)
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// 🔐 PASSWORD OPERATION: Compare for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);