import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.elementBackgroundColor};
  color: ${({ theme }) => theme.text};
  height: 100vh;
  max-width: 260px;
  position: relative;
  width: ${({ $isOpen }) => ($isOpen ? "250px" : "0")};
  transition: width 0.5s ease-in-out;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.sidebarBtn};
  cursor: pointer;
  position: absolute;
  top: 70px;
  right: -20px;
  transition: transform 0.3s ease;
  background-color: ${({ theme }) => theme.elementBackgroundColor};
  width: 40px;
  height: 40px;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.elementBackgroundColor};
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
  margin-top: 30px;
  padding: 20px;
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;

  h3,
  input {
    margin: 0;
  }
`;

const LogoSidebar = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;

  img {
    width: 32px;
    height: 32px;
  }

  h1 {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: -0.04em;
    color: #fff;
  }
`;
const NewBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
  }
`;
const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
`;
const ListItem = styled.li`
  display: flex;

  p,
  img {
    margin: 0;
    padding: 0;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &.edit-button img,
  &.delete-button img {
    width: 14px;
    height: 14px;
  }

  &.edit-button:hover img,
  &.delete-button:hover img {
    background-color: black;
    color: black;
  }

  img {
    margin: 0;
    padding: 0;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useContext(AuthContext);

  return (
    <SidebarContainer $isOpen={isOpen}>
      <ToggleButton $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiArrowLeft /> : <FiArrowRight />}
      </ToggleButton>
      <SidebarContent $isOpen={isOpen}>
        <LogoSidebar>
          <img src="/src/assets/logo-white.png" alt="Task Pro Logo" />
          <h1>Task Pro</h1>
        </LogoSidebar>
        <h3>My boards</h3>
        <NewBoard>
          <p>Create a new board</p>
          <button>+</button>
        </NewBoard>
        <List>
          <ListItem>
            <img src="" alt="img" />
            <p>Project office</p>
            <IconButton className="edit-button">
              <img src="/src/assets/utils/pencil.png" alt="Edit" />
            </IconButton>
            <IconButton className="delete-button">
              <img src="/src/assets/utils/trash.png" alt="Delete" />
            </IconButton>
          </ListItem>
        </List>

        <ul>
          <li>
            <img src="/src/assets/utils/flower.png" alt="happy flower" />
          </li>
          <li>
            <p>
              If you need help with <strong>TaskPro</strong>, check out our
              support resources or reach out to our customer support team.
            </p>
          </li>
          <li>
            <img src="/src/assets/utils/help-circle.png" alt="help" />
            <span>Need help?</span>
          </li>
        </ul>

        <button onClick={logout}>Log out</button>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
