import { Request, Response } from 'express';
import Expense from '../models/expenseModel';
import User from '../models/userModel';

// Add a new expense
export const addExpense = async (req: Request, res: Response) => {
    try {
      const { name, total, price, date } = req.body;
      const userId = (req as any).user.id;  // Extracted from the auth middleware
  
      // Ensure price is a number
      let priceNumber: number;
      
      // Check if price is a string or number
      if (typeof price === 'string') {
        // Remove non-numeric characters and convert to number
        priceNumber = parseFloat(price.replace(/[^0-9.-]+/g, '')); 
      } else if (typeof price === 'number') {
        // If price is already a number, use it directly
        priceNumber = price;
      } else {
        throw new Error('Invalid price format');
      }
  
      const newExpense = new Expense({ name, total, price: priceNumber, date, user: userId });
      await newExpense.save();
  
      res.status(201).json({ message: 'Expense added successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to add expense', details: err.message });
    }
  };

// Fetch expenses for the logged-in user
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;  // Extracted from the auth middleware

    const expenses = await Expense.find({ user: userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses', details: err.message });
  }
};