import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Progress, message } from 'antd';
import EditExpenseForm from '../../feature/editExpense/EditExpense'
import DeleteExpenseForm from '../../feature/DeleteExpense/DeleteExpense';
import '../../../styles.css'
import { deleteExpense, getExpenses, updateExpense } from '../../../API-Base/expenseApi';

interface ExpenseData {
  key: string;
  name: string;
  total: number;
  price: string;
  date: string;
  user: string;
}

const { Option } = Select;

const ExpenseTable: React.FC = () => {
  const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [isDeleteFormVisible, setDeleteFormVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseData | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      const { success, data, error } = await getExpenses();
      if (success) {
        setExpenseData(data.map((expense: any) => ({
          key: expense._id,
          name: expense.name,
          total: expense.total,
          price: `$${expense.price}`,
          date: expense.date,
          user: `${expense.user.firstName} ${expense.user.lastName}`
        })));
      } else {
        message.error(error || 'Failed to fetch expenses');
      }
    };

    fetchExpenses();
  }, []);

  const handleUpdate = async (updatedData: any) => {
    if (selectedExpense) {
      const { success, data, error } = await updateExpense(selectedExpense.key, updatedData);
      if (success) {
        message.success('Expense updated successfully!');
        setEditFormVisible(false);
  
        // Update the local state
        setExpenseData(prevData =>
          prevData.map(expense => 
            expense.key === selectedExpense.key ? { ...expense, ...updatedData } : expense
          )
        );
  
      } else {
        message.error(error || 'Failed to update expense');
      }
    }
  };

  const handleDelete = async (expenseId: string) => {
    const { success, error } = await deleteExpense(expenseId);
    if (success) {
      message.success('Expense deleted successfully!');
      setExpenseData(expenseData.filter(expense => expense.key !== expenseId));
    } else {
      message.error(error || 'Failed to delete expense');
    }
  };


  const showEditForm = () => setEditFormVisible(true);
  const hideEditForm = () => setEditFormVisible(false);

  const showDeleteForm = (record: any) => {
    setSelectedExpense(record);
    setDeleteFormVisible(true);
  };
  const hideDeleteForm = () => setDeleteFormVisible(false);

  const columns = [
    {
      title: 'Expense',
      dataIndex: 'name',
      key: 'name',
      width: '16.6%'
    },
    {
      title: 'Total Expenditure',
      dataIndex: 'total',
      key: 'total',
      width: '16.6%',
      render: (value: number) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Progress
            percent={value}
            showInfo={false}
            strokeColor="#8A2BE2"
            trailColor="#E0E0E0"
            style={{ width: '80%', marginRight: '8px' }}
          />
          <span>{value}%</span>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '16.6%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '16.6%',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      width: '16.6%',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '16.6%',
      render: (text: any, record: any) => (
        <span>
          <Button type="link" onClick={showEditForm}>Edit</Button>
          {isEditFormVisible && selectedExpense && (
            <EditExpenseForm
              visible={isEditFormVisible}
              onClose={hideEditForm}
              expenseId={selectedExpense.key}
              expenseData={selectedExpense}
              onUpdate={handleUpdate}
            />
          )}
          
          <Button type="link" onClick={() => showDeleteForm(record)}>Delete</Button>
          {isDeleteFormVisible && selectedExpense && selectedExpense.key === record.key && (
            <DeleteExpenseForm
              visible={isDeleteFormVisible}
              onClose={hideDeleteForm}
              expenseId={selectedExpense.key}
              expenseData={selectedExpense}
              onDelete={handleDelete}
            />
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', margin: '15px 10px' }}>
        <h2 style={{ fontWeight: 'bold' }}>Expenses</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Select defaultValue="Sort By" style={{ width: 120 }}>
            <Option value="date">Date</Option>
            <Option value="price">Price</Option>
          </Select>
          <Select defaultValue="By Date" style={{ width: 120 }}>
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
          <Input.Search placeholder="Search" style={{ width: 200 }} />
        </div>
      </div>
      <Table columns={columns} dataSource={expenseData} />
    </div>
  );
};

export default ExpenseTable;
