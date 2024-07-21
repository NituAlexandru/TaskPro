import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import {fetchCurrentUser} from '../../service/authService.js';

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');
    const sid = params.get('sid');

    console.log('Received token:', token);
    console.log('Received refreshToken:', refreshToken);
    console.log('Received sessionId:', sid);

    if (token && refreshToken && sid) {
      fetchCurrentUser(token).then(fetchedUser => {
        console.log('Fetched user:', fetchedUser);
        login(fetchedUser, token, refreshToken, sid);
        navigate('/home');
      }).catch((error) => {
        console.error('Error fetching user:', error);
        navigate('/');
      });
    } else {
      console.error('Token, refreshToken, or session ID not found');
      navigate('/');
    }
  }, [location, navigate, login]);

  return <div>Loading...</div>;
};

export default AuthCallback;
