import React, { useState } from 'react';
import { Table, Button, Input, Select, Progress } from 'antd';
import EditExpenseForm from '../../feature/editExpense/EditExpense'
import DeleteExpenseForm from '../../feature/DeleteExpense/DeleteExpense';
import '../../../styles.css'

interface ExpenseData {
  key: string;
  name: string;
  total: number;
  price: string;
  date: string;
  user: string;
}

const { Option } = Select;

const ExpenseTable: React.FC<{ expenseData: ExpenseData[] }> = ({ expenseData }) => {


  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [isDeleteFormVisible, setDeleteFormVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseData | null>(null);

  const showEditForm = () => setEditFormVisible(true);
  const hideEditForm = () => setEditFormVisible(false);

  const showDeleteForm = (record: any) => {
    setSelectedExpense(record);
    setDeleteFormVisible(true);
  };
  const hideDeleteForm = () => setDeleteFormVisible(false);

  const handleDelete = (id: string) => {
    // Implement the deletion logic here, e.g., making an API call to delete the expense
    console.log('Deleting expense with id:', id);
    // After deletion, you might want to remove the deleted item from the table's data or refetch the data
  };

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
          {isEditFormVisible && <EditExpenseForm onClose={hideEditForm} />}
          <Button type="link" onClick={()=>showDeleteForm(record)}>Delete</Button>
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

  const data = [
    {
      key: '1',
      name: 'Expense 1',
      total: 50,
      price: '$50',
      date: '2024-08-01',
      user: 'User 1',
    },
    {
      key: '2',
      name: 'Expense 2',
      total: 70,
      price: '$70',
      date: '2024-08-02',
      user: 'User 2',
    },
    {
      key: '3',
      name: 'Expense 3',
      total: 30,
      price: '$30',
      date: '2024-08-03',
      user: 'User 3',
    },
    {
      key: '4',
      name: 'Expense 4',
      total: 90,
      price: '$20',
      date: '2024-06-03',
      user: 'User 3',
    },
    {
      key: '5',
      name: 'Expense 5',
      total: 50,
      price: '$30',
      date: '2024-07-03',
      user: 'User 2',
    },
    {
      key: '6',
      name: 'Expense 6',
      total: 66,
      price: '$30',
      date: '2024-08-01',
      user: 'User 4',
    },
    {
      "key": "7",
      "name": "Expense 7",
      "total": 77,
      "price": "$35",
      "date": "2024-08-02",
      "user": "User 5"
    },
    {
      "key": "8",
      "name": "Expense 8",
      "total": 88,
      "price": "$40",
      "date": "2024-08-03",
      "user": "User 6"
    },
    {
      "key": "9",
      "name": "Expense 9",
      "total": 99,
      "price": "$45",
      "date": "2024-08-04",
      "user": "User 7"
    },
    {
      "key": "10",
      "name": "Expense 10",
      "total": 110,
      "price": "$50",
      "date": "2024-08-05",
      "user": "User 8"
    },
    {
      "key": "11",
      "name": "Expense 11",
      "total": 121,
      "price": "$55",
      "date": "2024-08-06",
      "user": "User 9"
    },
    {
      "key": "12",
      "name": "Expense 12",
      "total": 132,
      "price": "$60",
      "date": "2024-08-07",
      "user": "User 10"
    },
    {
      "key": "13",
      "name": "Expense 13",
      "total": 143,
      "price": "$65",
      "date": "2024-08-08",
      "user": "User 11"
    },
    {
      "key": "14",
      "name": "Expense 14",
      "total": 154,
      "price": "$70",
      "date": "2024-08-09",
      "user": "User 12"
    },
    {
      "key": "15",
      "name": "Expense 15",
      "total": 165,
      "price": "$75",
      "date": "2024-08-10",
      "user": "User 13"
    },
    {
      "key": "16",
      "name": "Expense 16",
      "total": 176,
      "price": "$80",
      "date": "2024-08-11",
      "user": "User 14"
    },
    {
      "key": "17",
      "name": "Expense 17",
      "total": 187,
      "price": "$85",
      "date": "2024-08-12",
      "user": "User 15"
    },
    {
      "key": "18",
      "name": "Expense 18",
      "total": 198,
      "price": "$90",
      "date": "2024-08-13",
      "user": "User 16"
    },
    {
      "key": "19",
      "name": "Expense 19",
      "total": 209,
      "price": "$95",
      "date": "2024-08-14",
      "user": "User 17"
    },
    {
      "key": "20",
      "name": "Expense 20",
      "total": 220,
      "price": "$100",
      "date": "2024-08-15",
      "user": "User 18"
    },
    {
      "key": "21",
      "name": "Expense 21",
      "total": 231,
      "price": "$105",
      "date": "2024-08-16",
      "user": "User 19"
    },
    {
      "key": "22",
      "name": "Expense 22",
      "total": 242,
      "price": "$110",
      "date": "2024-08-17",
      "user": "User 20"
    }
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ExpenseTable;
