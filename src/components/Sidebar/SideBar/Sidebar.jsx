import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import NewBoardContainer from "../NewBoardContainer";
import BoardList from "../BoardList/BoardList";
import HelpList from "../HelpList";
import PropTypes from "prop-types";
import { LogOutBtn, LogOutImg, SidebarHeading, MainTitle, LogoContainer, SidebarContent, ToggleButton, SidebarContainer } from "./Sidebar.styled";

const Sidebar = ({ isOpen, toggleSidebar, setSelectedBoardId }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleBoardSelect = (boardId, titleBoard) => {
    setSelectedBoardId(boardId);
    navigate(`/home/${titleBoard}`);
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
        <BoardList setSelectedBoardId={handleBoardSelect} />
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
