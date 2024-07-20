import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DropdownContent = styled.div`
  display: ${({ $show }) => ($show ? "block" : "none")};
  position: absolute;
  background-color: ${({ theme }) => theme.body};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 160px;
  right: 0;

  & a {
    color: ${({ theme }) => theme.text};
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  & a:hover {
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
  }
`;

const ThemeSwitcher = ({ handleChangeTheme }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const changeTheme = (newTheme) => {
    handleChangeTheme(newTheme);
    setShowDropdown(false);
  };

  return (
    <Dropdown>
      <DropdownButton onClick={toggleDropdown}>Theme &#x25BC;</DropdownButton>
      <DropdownContent $show={showDropdown}>
        <a href="#" onClick={() => changeTheme("light")}>
          Light
        </a>
        <a href="#" onClick={() => changeTheme("dark")}>
          Dark
        </a>
        <a href="#" onClick={() => changeTheme("violet")}>
          Violet
        </a>
      </DropdownContent>
    </Dropdown>
  );
};

ThemeSwitcher.propTypes = {
  handleChangeTheme: PropTypes.func.isRequired,
};

export default ThemeSwitcher;
