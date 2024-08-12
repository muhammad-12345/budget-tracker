import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import createTransporter from './mailer';


// async function updateSchema() {
//   try {
//       // Add default values for new fields
//       await User.updateMany(
//           { resetPasswordOtp: { $exists: false } },
//           { $set: { resetPasswordOtp: null, resetPasswordOtpExpiry: null } }
//       );

//       console.log('Schema updated successfully');
//   } catch (error) {
//       console.error('Error updating schema:', error);
//   }
// }

// Signup endpoint
//creates user
export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, budgetLimit } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use. Please log in or use a different email.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, budgetLimit });
    await newUser.save();//save in DB
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login endpoint
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //if user not found r password does not match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Forgot Password endpoint
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const transporter = await createTransporter();

    // Email options
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email', error: error.message });
      } else {
        console.log('Email sent:', info.response);
        return res.json({ message: 'OTP sent successfully' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};