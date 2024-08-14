import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import './EditExpense.css';


interface ExpenseData {
  key: string;
  name: string;
  total: number;
  price: string;
  date: string;
  user: string;
}

interface EditExpenseFormProps {
  visible: boolean;
  onClose: () => void;
  expenseId: string;
  expenseData: ExpenseData | null;
  onUpdate: (updatedData: any) => Promise<void>;
}



const EditExpenseForm: React.FC<EditExpenseFormProps> = ({ visible, onClose, expenseId, expenseData, onUpdate }) => {
  const [title, setTitle] = useState(expenseData?.name || '');
  const [price, setPrice] = useState(expenseData?.price.toString() || '');
  const [date, setDate] = useState(expenseData?.date || '');

  const handleEdit = async () => {
    const updatedData = { title, price, date };
    await onUpdate(updatedData);
    onClose(); 
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      className="edit-expense-modal"
      centered
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
    >
      <div className="edit-expense-form">
        <h2>Edit Expense</h2>
        <div className="form-fields">
          <label style={{ fontFamily: 'Poppins', fontWeight: '600' }}>Title</label>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontFamily: 'Poppins', fontWeight: '600' }}>Price</label>
              <Input
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ marginRight: '10px', width: '230px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontFamily: 'Poppins', fontWeight: '600' }}>Date</label>
              <Input
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '230px' }}
              />
            </div>
          </div>
        </div>
        <div className="form-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
          <Button onClick={onClose} style={{ fontFamily: 'Poppins', fontWeight: '600', marginRight: '10px' }}>Cancel</Button>
          <div className="test">
            <Button className="update-btn" type="primary" onClick={handleEdit} style={{ fontFamily: 'Poppins', fontWeight: '600' }}>Save Changes</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditExpenseForm;