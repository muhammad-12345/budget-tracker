import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../Components/common/NavBar/navBar';
import LoginSignup from '../Pages/LoginSignup/loginSignup';
import ForgotPassword from '../Components/feature/ForgotPassword/forgotPassword'; 
import Expenses from '../Pages/Expenses/expenses';
import Analysis from '../Pages/Analysis/Analysis'
import '../styles.css'

export function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route path="/login-signup" element={<LoginSignup />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
