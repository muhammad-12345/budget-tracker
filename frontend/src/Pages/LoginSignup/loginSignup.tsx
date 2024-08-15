import React, { useEffect, useState } from 'react'
import './loginSignup.css'
import login_img from '../../assets/login_img.png'
import signup_img from '../../assets/signup_img.png'
import logo from '../../assets/logo.png'
import icon_envelope from '../../assets/icon_envelope.png'
import icon_eye from '../../assets/icon_eye.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login as loginAPI, signup as signupAPI } from '../../API-Base/api'
import { response } from 'express'


const LoginSignup = () => {
    useEffect(() => {
        // Clear auth token from localStorage when the Login component is rendered
        localStorage.removeItem('auth-token');
    }, []);
    // 
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        budgetLimit: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const validatePassword = (password: string) => {
        return password.length >= 8 && password.length <= 14;
    };
    
    const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!validateEmail(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
    
        if (!validatePassword(formData.password)) {
            alert('Password must be between 8 and 14 characters.');
            return;
        }
    
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
    
        try {
            const formDataWithNumberBudget = {
                ...formData,
                budgetLimit: Number(formData.budgetLimit),
            };
    
            const signupResponse = await signupAPI(formDataWithNumberBudget);
    
            if (signupResponse.success) {
                setMessage(signupResponse.data.message);
    
                const loginResponse = await loginAPI({ email: formData.email, password: formData.password });
    
                if (loginResponse.success) {
                    localStorage.setItem('authToken', loginResponse.token);
                    setMessage('Signup and login successful');
                    window.location.replace("/expenses");
                } else {
                    alert(loginResponse.error);
                }
            } else {
                alert(signupResponse.error);
            }
        } catch (error: any) {
            alert(error.message || 'An unknown error occurred');
        }
    };
    
    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!validateEmail(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
    
        if (!validatePassword(formData.password)) {
            alert('Password must be between 8 and 14 characters.');
            return;
        }
    
        try {
            const response = await loginAPI({ email: formData.email, password: formData.password });
    
            if (response.success) {
                localStorage.setItem('auth-token', response.token);
                window.location.replace("/expenses");
            } else {
                alert(response.error);
            }
        } catch (error: any) {
            alert(error.message || 'An unknown error occurred');
        }
    };
    
    // 

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const location = useLocation();
    const [login, setLogin] = useState(location.state?.login ?? true)

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordShown(!confirmPasswordShown);
    };


    const handleSignUpClick = () => {
        if (login) {
            return setLogin(false);
        }
        setLogin(true);
    };

    const navigate = useNavigate();

    const handleForgotPasswordClick = () => {
        navigate("/forgot-password");
    };

    return (
        !login ? (
            <div className="login-signup">
                <div className="login-signup-left">
                    <div className='login-signup-heading'>
                        <img src={logo} alt="" />
                        <h1 style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Budget Tracker</h1>
                    </div>
                    <div className="login-signup-form">
                        <h1>Sign Up</h1>
                        <p>Welcome to our community</p>
                        <form onSubmit={handleSignupSubmit}>
                            <div id='firstname-lastname' style={{ marginBottom: '14px' }}>
                                <div>
                                    <label style={{ fontSize: '16px', fontWeight: '400', fontFamily: 'Roboto' }}>First-Name</label>
                                    <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '16px', fontWeight: '400', fontFamily: 'Roboto' }}>Last-Name</label>
                                    <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '16px', fontWeight: '400', fontFamily: 'Roboto' }}>Email</label>
                                <div className="icon-wrapper">
                                    <input type="email" placeholder="test@gmail.com" name='email' value={formData.email} onChange={handleChange} style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }} />
                                    <i className="fas fa-envelope input-icon"></i>
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '16px', fontWeight: '400', fontFamily: 'Roboto' }}>Password</label>
                                <div className="icon-wrapper">
                                    <input type={passwordShown ? 'text' : "password"} placeholder="Enter your password" name='password' value={formData.password} onChange={handleChange} style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }} />
                                    <i
                                        className={`fas ${passwordShown ? 'fa-eye-slash' : 'fa-eye'} input-icon clickable`}
                                        onClick={togglePasswordVisibility}
                                    ></i>
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '16px', fontWeight: '400', fontFamily: 'Roboto' }}>Confirm-Password</label>
                                <div className="icon-wrapper">
                                    <input type={confirmPasswordShown ? 'text' : "password"} placeholder="Enter your password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }} />
                                    <i
                                        className={`fas ${confirmPasswordShown ? 'fa-eye-slash' : 'fa-eye'} input-icon clickable`}
                                        onClick={toggleConfirmPasswordVisibility}
                                    ></i>
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '16px', fontWeight: '400', fontFamily: 'Roboto' }}>Budget-Limit</label>
                                <input type="Number" placeholder="Enter Amount" name='budgetLimit' value={formData.budgetLimit} onChange={handleChange} style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }} />
                            </div>
                            <button type="submit" style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }}>SIGN UP</button>
                            <p style={{ textAlign: 'center', fontSize: '16px', fontWeight: '400', fontFamily: 'Poppins', color: 'black', marginTop: '5px' }}>Already have an account? <span onClick={handleSignUpClick} style={{ fontWeight: '600', color: '#7539FF', cursor: 'pointer' }}>Log in</span> </p>
                        </form>
                    </div>
                </div>
                <div className="login-signup-right">
                    <img src={signup_img} alt='' />
                </div>
            </div>
        ) : (
            <div className="login-signup">
                <div className="login-signup-left">
                    <div className='login-signup-heading'>
                        <img src={logo} alt="" />
                        <h1 style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Budget Tracker</h1>
                    </div>
                    <div className="login-signup-form">
                        <h1>Welcome Back!</h1>
                        <p>Sign in to continue to Budget Tracker</p>
                        <form onSubmit={handleLoginSubmit}>
                            <div>
                                <label style={{ fontSize: '16px', fontWeight: '400', fontFamily: 'Roboto' }}>Email</label>
                                <div className="icon-wrapper">
                                    <input type="email" placeholder="test@gmail.com" name='email' value={formData.email} onChange={handleChange} style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }} />
                                    <i className="fas fa-envelope input-icon"></i>
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '16px', fontWeight: '400', fontFamily: 'Roboto' }}>Password</label>
                                <div className="icon-wrapper">
                                    <input type={passwordShown ? 'text' : "password"} name='password' value={formData.password} onChange={handleChange} placeholder="Enter your password" style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }} />
                                    <i
                                        className={`fas ${passwordShown ? 'fa-eye-slash' : 'fa-eye'} input-icon clickable`}
                                        onClick={togglePasswordVisibility}
                                    ></i>
                                </div>
                            </div>
                            <div className="remember-forgot-container">
                                <div className="remember-me">
                                    <input type="checkbox" id="rememberMe" />
                                    <label htmlFor="rememberMe" style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }}>Remember me</label>
                                </div>
                                <div className="forgot-password">
                                    <Link to="/forgot-password" className="link-text" onClick={handleForgotPasswordClick}>Forgot password?</Link>
                                </div>
                            </div>
                            <button type="submit" style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }}>LOG IN</button>
                            <p style={{ textAlign: 'center', fontSize: '16px', fontWeight: '400', fontFamily: 'Poppins', color: 'black', marginTop: '5px' }}>Dont't have an account? <span onClick={handleSignUpClick} style={{ fontWeight: '600', color: '#7539FF', cursor: 'pointer' }}>Sign Up</span> </p>
                        </form>
                    </div>
                </div>
                <div className="login-signup-right">
                    <img src={login_img} alt='' />
                </div>
            </div>
        )
    )
}

export default LoginSignup
