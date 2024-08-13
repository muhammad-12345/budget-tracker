import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  name: string;
  total: number;
  price: number;
  date: Date;
  user: mongoose.Types.ObjectId; // Reference to the User model
}

const ExpenseSchema: Schema = new Schema({
  name: { type: String, required: true },
  total: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, // Reference to User
});

const Expense = mongoose.model<IExpense>('Expense', ExpenseSchema);

export default Expense;
