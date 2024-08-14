import axios from 'axios';

const API_BASE_URL = 'http://localhost:3333';  // Base URL for backend

interface ExpenseData {
    name: string;
    total: number;
    price: number;
    date: string;
}

// Add Expense function
export const addExpense = async (expenseData: any) => {
    try {
        const token = localStorage.getItem('auth-token'); 
        console.log(localStorage.getItem('auth-token'))
        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.post(`${API_BASE_URL}/expenses/add`, expenseData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,  
            },
        });
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error('Add Expense error details:', error.response?.data || error.message); 
        return { success: false, error: error.response?.data.message || 'An error occurred during expense addition' };
    }
};

// Get Expenses function
export const getExpenses = async () => {
    try {
      const token = localStorage.getItem('auth-token'); 
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.get(`${API_BASE_URL}/expenses/expenses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Get Expenses error:', error.response?.data || error.message);
      return { success: false, error: error.response?.data.message || 'An error occurred while fetching expenses' };
    }
};


// Update Expense function
export const updateExpense = async (expenseId: string, updatedData: any) => {
  try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
          throw new Error('No token found');
      }

      const formattedData = {
          name: updatedData.title,  
          ampunt: parseFloat(updatedData.price),  
          date: new Date(updatedData.date).toISOString(),  
      };

      console.log('Updating expense with data:', formattedData);

      const response = await axios.put(`${API_BASE_URL}/expenses/update/${expenseId}`, formattedData, {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
      });

      console.log('Update Expense response:', response.data);

      return { success: true, data: response.data };
  } catch (error: any) {
      console.error('Update Expense error:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.message || 'An error occurred during expense update' };
  }
};


// Delete Expense function
export const deleteExpense = async (expenseId: string) => {
  try {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.delete(`${API_BASE_URL}/expenses/delete/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Delete Expense response:', response.data); 

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Delete Expense error:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || 'An error occurred during expense deletion' };
  }
};
