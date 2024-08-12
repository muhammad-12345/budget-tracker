import React from 'react'
import './forgotPassword.css'
import '../../../Pages/LoginSignup/loginSignup'
import logo from '../../../assets/logo.png'
import forgot_pass from '../../../assets/forgot_pass.png'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {

  return (
    <div className="login-signup">
                <div className="login-signup-left">
                    <div className='login-signup-heading'>
                        <img src={logo} alt="" />
                        <h1 style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Budget Tracker</h1>
                    </div>
                    <div className="login-signup-form-forgot-pass">
                        <h1>Reset Password</h1>
                        <p>Enter your email for a reset link.</p>
                        <form>
                            <div>
                                <label style={{ fontSize: '16px', fontWeight: '400', fontFamily: 'Roboto' }}>Email</label>
                                <div className="icon-wrapper">
                                    <input type="email" placeholder="test@gmail.com" style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }} />
                                    <i className="fas fa-envelope input-icon"></i>
                                </div>
                            </div>
                            <button type="submit" style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }}>Send Reset Password Link</button>
                            <p style={{ textAlign: 'center', fontSize: '16px', fontWeight: '400', fontFamily: 'Poppins', color: 'black' , marginTop:'5px'}}>Dont't have an account? <span style={{ fontWeight: '600', color: '#7539FF', cursor: 'pointer' }}><Link to={'/LoginSignup'} state={{ login: false }}>Sign Up</Link></span> </p>
                        </form>
                    </div>
                </div>
                <div className="login-signup-right">
                    <img src={forgot_pass} alt='' />
                </div>
            </div>
  )
}

export default ForgotPassword
