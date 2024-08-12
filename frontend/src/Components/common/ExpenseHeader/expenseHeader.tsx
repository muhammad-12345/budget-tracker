import React from 'react';
import { Button } from 'antd';
import './expenseHeader.css'
import '../../../styles.css'

const TableHeader: React.FC = () => {
  return (
    <div className="expense-header">
      <h1>EXPENSES</h1>
      <Button type="primary">Add Expenses</Button>
    </div>
  );
};

export default TableHeader;
