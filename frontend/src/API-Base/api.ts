import axios from 'axios';

const API_BASE_URL = 'http://localhost:3333/auth';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    budgetLimit: number;
}

interface LoginCredentials {
    email: string;
    password: string;
}

// Signup function

export const signup = async (userData: UserData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error('Signup error:', error.response?.data); // Log the error for debugging
        return { success: false, error: error.response?.data.message || 'An error occurred during signup' };
    }
};


export const login = async (credentials: { email: string, password: string }) => {
    try {
        const response = await fetch('http://localhost:3333/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            // If response is not OK, throw an error
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        const data = await response.json();
        return { success: true, token: data.token }; // Return the token if successful
    } catch (error: any) {
        return { success: false, error: error.message || 'An unknown error occurred' };
    }
};


// Forgot Password function
export const forgotPassword = async (email: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || 'An error occurred during forgot password';
    }
};