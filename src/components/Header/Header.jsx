// src/components/Header/Header.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../utils/ThemeProvider";
import ThemeSwitcher from "../Portal/ThemeSwitcher/ThemeSwitcher";
import ProfileEditForm from "../Portal/profileModal/UserModal";
import {
  HeaderContainer,
  UserInfo,
  UserAvatar,
  UserName,
} from "./Header.styled";

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
