import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');

    if (token && refreshToken) {
      // Store tokens in localStorage or state management
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Redirect to the main app
      navigate('/home');
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
