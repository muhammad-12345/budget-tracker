import React, {useState} from 'react';
import { Button } from 'antd';
import './expenseHeader.css'
import '../../../styles.css'
import AddExpenseForm from '../../feature/addExpense/addExpense';

const TableHeader: React.FC = () => {

  const [isFormVisible, setFormVisible] = useState(false);

  const showForm = () => setFormVisible(true);
  const hideForm = () => setFormVisible(false);

  return (
    <div className="expense-header">
      <h1>EXPENSES</h1>
      <Button type="primary" onClick={showForm}>Add Expenses</Button>
      {isFormVisible && <AddExpenseForm onClose={hideForm} />}
    </div>
  );
};

export default TableHeader;
