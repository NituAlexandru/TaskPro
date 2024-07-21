
import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme, violetTheme } from "./themes";
import GlobalStyles from "./GlobalStyles";
import { AuthContext } from "../contexts/AuthContext";

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
      console.log("Token found in ThemeProvider:", token);
      getCurrentUser();
    }
  }, [token, getCurrentUser]);

  useEffect(() => {
    if (user) {
      console.log("User found in ThemeProvider:", user);
      setTheme(user.theme || "dark");
    }
  }, [user]);

  const handleChangeTheme = async (newTheme) => {
    setTheme(newTheme);
    try {
      console.log("Changing theme with token:", token);
      const response = await axios.post(
        "http://localhost:4500/api/user/theme",
        { theme: newTheme },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Theme change response:", response.data);
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
