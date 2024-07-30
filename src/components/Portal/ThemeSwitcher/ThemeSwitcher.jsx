import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
} from "./ThemeSwitcher.styled";

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
