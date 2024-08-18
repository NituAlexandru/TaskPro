import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  register,
  login as apiLogin,
  fetchCurrentUser,
} from "../service/authService";

export const AuthContext = createContext();

// AuthProvider component to manage authentication state and actions
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Effect to initialize user data from local storage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && token) {
      setUser(storedUser); // Set user state if valid data is found in local storage
    }
  }, [token]);

  // Function to register a new user
  const registerUser = async (userData) => {
    try {
      const data = await register(userData);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("sessionId", data.sid);
      return data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  const loginUser = async (userData) => {
    try {
      const data = await apiLogin(userData);
      login(data.user, data.token, data.refreshToken, data.sid);
      return data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  // Function to set user and token data in state and local storage
  const login = (userData, token, refreshToken, sessionId) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("sessionId", sessionId);
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("sessionId");
  }, []);

  const getCurrentUser = useCallback(async () => {
    if (!token) {
      console.log("No token available in getCurrentUser");
      return;
    }
    try {
      const data = await fetchCurrentUser(token);
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  }, [token, logout]);

  // Function to update the user state and local storage
  const updateUser = (userData) => {
    setUser(userData); // Update user state
    localStorage.setItem("user", JSON.stringify(userData)); // Update local storage with new user data
  };

  // Provide the context values to child components
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        registerUser,
        loginUser,
        login,
        logout,
        getCurrentUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
