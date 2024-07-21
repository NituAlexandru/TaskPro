import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { register, login, fetchCurrentUser } from "../service/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Stored user:", storedUser);
    console.log("Stored token:", token);
    if (storedUser && token) {
      setUser(storedUser);
    }
  }, [token]);

  const registerUser = async (userData) => {
    const data = await register(userData);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    console.log("Registered user:", data.user);
    console.log("Stored token after registration:", data.token);
    return data;
  };

  const loginUser = async (userData) => {
    const data = await login(userData);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    console.log("Logged in user:", data.user);
    console.log("Stored token after login:", data.token);
    return data;
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("Logged out");
  }, []);

  const getCurrentUser = useCallback(async () => {
    if (!token) {
      console.log("No token available in getCurrentUser");
      return;
    }
    try {
      console.log("Token in getCurrentUser:", token);
      const data = await fetchCurrentUser(token);
      setUser(data.user);
      console.log("Fetched user:", data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  }, [token, logout]);

  return (
    <AuthContext.Provider
      value={{ user, token, registerUser, loginUser, logout, getCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
