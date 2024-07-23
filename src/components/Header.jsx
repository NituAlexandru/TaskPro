import styled from "styled-components";
import ThemeSwitcher from "./ThemeSwitcher";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../utils/ThemeProvider";
import { useContext } from "react";

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

  return (
    <HeaderContainer>
      <ThemeSwitcher theme={theme} handleChangeTheme={handleChangeTheme} />
      <UserInfo>
        <UserName>{user?.name}</UserName>
        <UserAvatar src={user?.avatarURL} alt={`${user?.name}'s avatar`} />
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;
