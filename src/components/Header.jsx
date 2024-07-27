import styled from "styled-components";
import ThemeSwitcher from "./ThemeSwitcher";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../utils/ThemeProvider";
import { useContext, useState } from "react";
import ProfileEditForm from "./Portal/UserModal";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.headerBackground};
  color: ${({ theme }) => theme.headerText};
  height: 60px;
  width: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const UserAvatar = styled.img`
  border-radius: 8px;
  width: 32px;
  height: 32px;
`;

const UserName = styled.span`
  color: ${({ theme }) => theme.headerText};
`;

const Header = () => {
  const { user } = useContext(AuthContext);
  const { theme, handleChangeTheme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileUpdate = (values) => {
    console.log("Profile updated with values:", values);
    // Logic to update the profile
    handleCloseModal();
  };

  return (
    <>
      <HeaderContainer>
        <ThemeSwitcher theme={theme} handleChangeTheme={handleChangeTheme} />
        <UserInfo onClick={handleOpenModal}>
          <UserName>{user?.name}</UserName>
          <UserAvatar src={user?.avatarURL} alt={`${user?.name}'s avatar`} />
        </UserInfo>
      </HeaderContainer>
      {isModalOpen && (
        <ProfileEditForm
          user={user}
          onSubmit={handleProfileUpdate}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Header;
