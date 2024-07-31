import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import NewBoardContainer from "../NewBoardContainer/NewBoardContainer";
import BoardList from "../BoardList/BoardList";
import HelpList from "../HelpList/HelpList";
import PropTypes from "prop-types";
import {
  LogOutBtn,
  SidebarHeading,
  MainTitle,
  LogoContainer,
  SidebarContent,
  ToggleButton,
  SidebarContainer,
  HiOutlineLogoutStyled,
  BottomContainer
} from "./Sidebar.styled";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleBoardSelect = (boardId, titleBoard) => {
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
        <BottomContainer>
          <HelpList />
          <LogOutBtn onClick={handleLogout}>
            <HiOutlineLogoutStyled />
            <span> Log out</span>
          </LogOutBtn>
        </BottomContainer>
      </SidebarContent>
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
