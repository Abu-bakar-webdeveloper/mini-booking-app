// utils/seedAdmin.js
import User from '../models/User.js';
import mongoose from 'mongoose';
import 'dotenv/config.js';

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const admin = await User.create({
        name: 'System Admin',
        email: 'admin@servicebooking.com',
        password: 'admin123',
        role: 'admin',
        phone: '+1234567890'
      });
      
      console.log('✅ Admin user created:', admin.email);
    } else {
      console.log('ℹ️ Admin user already exists');
    }
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();