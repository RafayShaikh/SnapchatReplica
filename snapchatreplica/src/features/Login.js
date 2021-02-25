import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../firebase';
import { login } from './appSlice';
import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className='login'>
      <div className='login_container'>
        <img
          src='https://www.snapchat.com/global/social-lg.jpg'
          alt='Snapchat'
        />
        <Button variant='outline' onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Login;
