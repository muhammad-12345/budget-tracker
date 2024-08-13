import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import './addExpense.css';

interface AddExpenseFormProps {
  onClose: () => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = () => {
    // Add expense logic here
    console.log({ title, price, date });
    onClose(); // Close the form after adding
  };

  return (
    <Modal
      visible={true}
      onCancel={onClose}
      footer={null}
      className="add-expense-modal"
      centered
    >
      <div className="add-expense-form">
        <h2>Add Expense</h2>
        <div className="form-fields">
          <label style={{fontFamily:'Poppins', fontWeight:'600'}}>Title</label>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{fontFamily:'Poppins', fontWeight:'600'}}>Price</label>
              <Input
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ marginRight: '10px',width: '230px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{fontFamily:'Poppins', fontWeight:'600'}}>Date</label>
              <Input
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{width: '230px'}}
              />
            </div>
          </div>
        </div>
        <div className="form-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
          <Button onClick={onClose} style={{fontFamily:'Poppins', fontWeight:'600', marginRight:'10px'}}>Cancel</Button>
          <Button type="primary" onClick={handleAdd} style={{fontFamily:'Poppins', fontWeight:'600'}}>Add</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddExpenseForm;
