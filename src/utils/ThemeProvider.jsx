import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme, violetTheme } from "./themes";
import GlobalStyles from "./GlobalStyles";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { AuthContext } from "../contexts/AuthContext";

const themes = {
  light: lightTheme,
  dark: darkTheme,
  violet: violetTheme,
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const { user, token, getCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      console.log('Token found in ThemeProvider:', token);
      getCurrentUser();
    }
  }, [token, getCurrentUser]);

  useEffect(() => {
    if (user) {
      console.log('User found in ThemeProvider:', user);
      setTheme(user.theme || 'dark');
    }
  }, [user]);

  const handleChangeTheme = async (newTheme) => {
    setTheme(newTheme);
    try {
      console.log('Changing theme with token:', token);
      const response = await axios.post("http://localhost:4500/api/user/theme", { theme: newTheme }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Theme change response:', response.data);
    } catch (error) {
      console.error("Failed to update theme:", error);
    }
  };

  return (
    <StyledThemeProvider theme={themes[theme]}>
      <GlobalStyles />
      {children}
      <div style={{ position: "fixed", top: 10, right: 10 }}>
        <ThemeSwitcher theme={theme} handleChangeTheme={handleChangeTheme} />
      </div>
    </StyledThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
