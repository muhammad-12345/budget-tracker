import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ExpenseAnalysisProps {
  data: Array<{
    date: string;
    total: number;
  }>;
}

const ExpenseAnalysis: React.FC<ExpenseAnalysisProps> = ({ data }) => {
  // Convert date strings to just month/year format for X axis
  const formattedData = data.map(expense => ({
    month: new Date(expense.date).toLocaleString('default', { month: 'short', year: 'numeric' }),
    total: expense.total,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={formattedData}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseAnalysis;
