import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 20px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #f00;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <HomeContainer>
      <h1>Welcome, {user?.name}</h1>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>

      {/* Other components for home page */}
    </HomeContainer>
  );
};

export default HomePage;

