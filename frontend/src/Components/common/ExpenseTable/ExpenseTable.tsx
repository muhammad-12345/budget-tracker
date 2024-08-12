import React from 'react';
import { Table, Button, Input, Select, Progress } from 'antd';

const { Option } = Select;

const ExpenseTable: React.FC = () => {
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
      width:'16.6%',
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
      width:'16.6%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width:'16.6%',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      width:'16.6%',
    },
    {
      title: 'Actions',
      key: 'actions',
      width:'16.6%',
      render: () => (
        <span>
          <Button type="link">Edit</Button>
          <Button type="link">Delete</Button>
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
