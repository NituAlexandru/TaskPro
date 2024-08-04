import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
} from "./ThemeSwitcher.styled";

const ThemeSwitcher = ({ handleChangeTheme }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle the visibility of the dropdown
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Change the theme and close the dropdown
  const changeTheme = (newTheme) => {
    handleChangeTheme(newTheme);
    setShowDropdown(false);
  };

  return (
    <Dropdown>
      <DropdownButton onClick={toggleDropdown}>Theme &#x25BC;</DropdownButton>
      <DropdownContent $show={showDropdown}>
        <button onClick={() => changeTheme("light")}>Light</button>
        <button onClick={() => changeTheme("dark")}>Dark</button>
        <button onClick={() => changeTheme("violet")}>Violet</button>
      </DropdownContent>
    </Dropdown>
  );
};

ThemeSwitcher.propTypes = {
  handleChangeTheme: PropTypes.func.isRequired,
};

export default ThemeSwitcher;
