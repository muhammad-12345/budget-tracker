import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export async function connectDB() {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log(process.env.MONGOURI);
    await mongoose.connect(process.env.MONGOURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}