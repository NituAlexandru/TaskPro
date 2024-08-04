import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme, violetTheme } from "./themes";
import GlobalStyles from "./GlobalStyles";
import { AuthContext } from "../contexts/AuthContext";
import API_BASE_URL from "./apiConfig";

const themes = {
  light: lightTheme,
  dark: darkTheme,
  violet: violetTheme,
};

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const { user, token, getCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      getCurrentUser();
    }
  }, [token, getCurrentUser]);

  useEffect(() => {
    if (user) {
      setTheme(user.theme || "dark");
    }
  }, [user]);

  const handleChangeTheme = async (newTheme) => {
    setTheme(newTheme);
    try {
      await axios.post(
        `${API_BASE_URL}/api/user/theme`,
        { theme: newTheme },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to update theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      <StyledThemeProvider theme={themes[theme]}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ThemeProvider, ThemeContext };
