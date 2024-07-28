import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import NewBoardContainer from "./NewBoardContainer";
import BoardList from "./BoardList";
import HelpList from "./HelpList";
import PropTypes from "prop-types";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.sidebarBackgroundColor};
  color: ${({ theme }) => theme.sidebarTextColor};
  height: 100vh;
  max-width: 260px;
  position: relative;
  width: ${({ $isOpen }) => ($isOpen ? "250px" : "0")};
  transition: width 0.5s ease-in-out;
  justify-content: space-between;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.toggleBtn};
  cursor: pointer;
  position: absolute;
  top: 70px;
  right: -20px;
  transition: transform 0.3s ease;
  background-color: ${({ theme }) => theme.sidebarBackgroundColor};
  width: 40px;
  height: 40px;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.sidebarBackgroundColor};
    color: ${({ theme }) => theme.sidebarBtn};
    outline: none;
    transform: none;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: auto;
  margin-top: 0;
  padding: 20px;
  padding-top: 0;
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 32px;
    height: 32px;
  }
`;

const MainTitle = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.logoText};
`;

const SidebarHeading = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.02em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 15px;
  color: ${({ theme }) => theme.sidebarHeading};
`;

const LogOutBtn = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.sidebarTextColor};
  gap: 10px;
  stroke: #fff;
  padding: 10px 0;

  &:hover,
  &:focus {
    background-color: transparent;
    outline: none;
    text-decoration: underline;
  }
`;

const LogOutImg = styled.img`
  stroke: #fff;
`;

const Sidebar = ({ isOpen, toggleSidebar, setSelectedBoardId }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <ToggleButton $isOpen={isOpen} onClick={toggleSidebar}>
        {isOpen ? <FiArrowLeft /> : <FiArrowRight />}
      </ToggleButton>
      <SidebarContent $isOpen={isOpen}>
        <LogoContainer>
          <img src="/src/assets/logo-white.png" alt="Task Pro Logo" />
          <MainTitle>Task Pro</MainTitle>
        </LogoContainer>
        <SidebarHeading>My boards</SidebarHeading>
        <NewBoardContainer />
        <BoardList setSelectedBoardId={setSelectedBoardId} />
        <HelpList />
        <LogOutBtn onClick={handleLogout}>
          <LogOutImg src="/src/assets/icons/login.svg" alt="" />
          <span> Log out</span>
        </LogOutBtn>
      </SidebarContent>
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  setSelectedBoardId: PropTypes.func.isRequired,
};

export default Sidebar;
