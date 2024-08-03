import axios from "axios";

const BASE_URL = "http://localhost:4500/api";

// Register a new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login user
export const login = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Fetch current user details using token
export const fetchCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

// Get user details by email
export const getUserDetailsByEmail = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/details-by-email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details by email:", error);
    return null;
  }
};

// Get users by their IDs
export const getUsersByIds = async (ids) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/get-users-by-ids`, { ids });
    return response.data;
  } catch (error) {
    console.error("Error fetching users by IDs:", error);
    throw error;
  }
};
