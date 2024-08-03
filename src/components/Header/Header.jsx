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
import Modal from "../Portal/Modal";

const Header = () => {
  const { user, updateUser } = useContext(AuthContext);
  const { theme, handleChangeTheme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

// Handlers
const handleProfileUpdate = (updatedUser) => {
  updateUser(updatedUser);
  setIsModalOpen(false);
};


  return (
    <>
      <HeaderContainer>
        <ThemeSwitcher theme={theme} handleChangeTheme={handleChangeTheme} />
        <UserInfo onClick={() => setIsModalOpen(true)}>
          <UserName>{user?.name}</UserName>
          <UserAvatar src={user?.avatarURL} alt={`${user?.name}'s avatar`} />
        </UserInfo>
      </HeaderContainer>
      {isModalOpen && (
        <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <ProfileEditForm
          user={user}
          onSubmit={handleProfileUpdate}
          closeModal={() => setIsModalOpen(false)}
        />
        </Modal>
      )}
    </>
  );
};

export default Header;
