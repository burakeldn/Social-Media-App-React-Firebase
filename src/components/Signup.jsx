import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameSurname, setNameSurname] = useState('');


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };



  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(auth.currentUser, {
          displayName: nameSurname
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className='container'>
      <div className='title'>
        Create Your Account
      </div>
      <form onSubmit={handleSignUp}>
        <div className='first-base'>
          <div className='input-container'>
            <input
              type='email'
              className='input-field'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='email@example.com'
            />
            <input
              type='text'
              className='input-field'
              name='nameSurname'
              value={nameSurname}
              onChange={(e) => setNameSurname(e.target.value)}
              placeholder='Jonathan Livingston'
            />
            <div className='password-container'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='input-field'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='******'
              />
              {password && (
                <span
                  className='password-toggle'
                  onClick={handleTogglePassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              )}
            </div>
          </div>
          <button className='sign-up-button'>
            <NavLink to="/">Sign Up</NavLink>
          </button>
        </div>
      </form>
    </div>
  );
}
