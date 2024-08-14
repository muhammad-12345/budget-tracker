import { Request, Response } from 'express';
import Expense from '../models/expenseModel';
import User from '../models/userModel';

// Add a new expense
export const addExpense = async (req: Request, res: Response) => {
    try {
      const { name, total, price, date } = req.body;
      const userId = (req as any).user.id;  // Extracted from the auth middleware
  
      let priceNumber: number;
      
      // Check if price is a string or number
      if (typeof price === 'string') {
        // Remove non-numeric characters and convert to number
        priceNumber = parseFloat(price.replace(/[^0-9.-]+/g, '')); 
      } else if (typeof price === 'number') {
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
    const expenses = await Expense.find({ user: (req as any).user.id })
      .populate('user', 'firstName lastName') 
      .exec();
  
    const formattedExpenses = expenses.map(expense => ({
      ...expense.toObject(),
      date: expense.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
    }));
  
    res.status(200).json(formattedExpenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get expenses', details: err.message });
  }
};


// Update an existing expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, date } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { name, amount, date },
      { new: true } // updated document
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Delete an expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};