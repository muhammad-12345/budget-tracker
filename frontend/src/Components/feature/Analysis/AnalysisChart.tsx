import React, { useState, useEffect } from 'react';
import ExpenseAnalysis from './ExpenceAnalysis';
import { getExpenses } from '../../../API-Base/expenseApi'; 

const ExpensePage: React.FC = () => {
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses();
        setExpenseData(response.data);
      } catch (err) {
        setError('Failed to fetch expenses');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const analysisData = expenseData.map(expense => ({
    date: expense.date,
    total: expense.total,
  }));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 style={{ fontWeight: 'bold', margin: '20px 0' }}>Expense Analysis</h2>
      <ExpenseAnalysis data={analysisData} />
    </div>
  );
};

export default ExpensePage;
