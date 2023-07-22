import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const SignIn = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        history('/')
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className='container'>
      <div>
        <div className='title'>
          Social Media App
        </div>
        <form onSubmit={SignIn}>
          <div className='first-base'>
            <div className='input-container'>
              <input
                type='email'
                className='input-field'
                name='email'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                placeholder='email@example.com'
              />
              <div className='password-container'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='input-field'
                  name='password'
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  placeholder='******'
                />
                {password && (
                  <div className='password-toggle' onClick={handleTogglePassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </div>
                )}
              </div>
            </div>
            <button className='login-button'>Log In</button>
          </div>
        </form>
        <p className='signup-text'>Don't have an account? <NavLink to="/signup" className='signup-link'>Sign Up</NavLink></p>
      </div>
    </div>
  );
}
