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
  console.log("Token in fetchCurrentUser:", token);
  const response = await axios.get(`${BASE_URL}/user/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
