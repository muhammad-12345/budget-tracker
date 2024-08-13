import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import './DeleteExpense.css';
// import '../../../styles.css'



interface ExpenseData {
    key: string;
    name: string;
    total: number;
    price: string;
    date: string;
    user: string;
  }
  
  interface DeleteExpenseFormProps {
    visible: boolean;
    onClose: () => void;
    expenseId: string; 
    expenseData: ExpenseData;
    onDelete: (id: string) => void;
  }

const DeleteExpenseForm: React.FC<DeleteExpenseFormProps> = ({visible, onClose, expenseId, expenseData, onDelete  }) => {
    const { name, price, date } = expenseData;


  const handleDelete = () => {
    console.log({expenseId });
    onClose(); 
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      className="delete-expense-modal"
      centered
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
    >
      <div className="delete-expense-form">
        <h2>Delete Expense</h2>
        <div className="form-fields">
          <label style={{ fontFamily: 'Poppins', fontWeight: '600' }}>Title</label>
          <Input
            placeholder="Title"
            value={name}
            // onChange={(e) => setTitle(e.target.value)}
            style={{ marginRight: '10px' }}
            disabled
          />
          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontFamily: 'Poppins', fontWeight: '600' }}>Price</label>
              <Input
                placeholder="Price"
                value={price}
                // onChange={(e) => setPrice(e.target.value)}
                style={{ marginRight: '10px', width: '230px' }}
                disabled
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontFamily: 'Poppins', fontWeight: '600' }}>Date</label>
              <Input
                placeholder="Date"
                value={date}
                // onChange={(e) => setDate(e.target.value)}
                style={{ width: '230px' }}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="form-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
          <Button onClick={onClose} style={{ fontFamily: 'Poppins', fontWeight: '600', marginRight: '10px' }}>Cancel</Button>
          <div className="test">
            <Button className='delete-btn' type="primary" onClick={handleDelete} style={{ fontFamily: 'Poppins', fontWeight: '600' }}>Delete</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteExpenseForm;
