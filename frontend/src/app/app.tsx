import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../Components/NavBar/navBar';
import LoginSignup from '../Pages/LoginSignup/loginSignup';
import ForgotPassword from '../Components/ForgotPassword/forgotPassword'; 

export function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/LoginSignup" element={<LoginSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
