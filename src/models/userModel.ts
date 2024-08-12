import mongoose from 'mongoose';

//user model defined
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  budgetLimit: { type: Number, required: true },
  resetPasswordOtp: {type: String},
  resetPasswordOtpExpiry: {type: Date},
});

const User = mongoose.model('User', UserSchema);

export default User;
