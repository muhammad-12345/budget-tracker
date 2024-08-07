import mongoose from 'mongoose';
const mongoURI = 'mongodb+srv://ibrahimzia:budgettracker@cluster0.ji55m.mongodb.net/';

export async function connectDB() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}