import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme, violetTheme } from "./themes";
import GlobalStyles from "./GlobalStyles";
import ThemeSwitcher from "../components/ThemeSwitcher";

const themes = {
  light: lightTheme,
  dark: darkTheme,
  violet: violetTheme,
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    try {
      const response = await axios.get("/api/user/theme");
      const userTheme = response.data.theme || "light";

      setTheme(userTheme);
    } catch (error) {
      console.error("Failed to fetch theme:", error);
    }
  };

  const handleChangeTheme = async (newTheme) => {
    setTheme(newTheme);

    try {
      await axios.post("/api/user/theme", { theme: newTheme });
    } catch (error) {
      console.error("Failed to save theme:", error);
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
