import axios from "axios";

const BASE_URL = "http://localhost:4500/api";

export const register = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, userData);
  return response.data;
};
export const fetchCurrentUser = async (token) => {
  // console.log("Token in fetchCurrentUser:", token);
  const response = await axios.get(`${BASE_URL}/user/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getUserDetailsByEmail = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/details-by-email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

export const getUsersByIds = async (ids) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/get-users-by-ids`, { ids });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};