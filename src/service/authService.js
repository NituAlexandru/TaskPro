import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const register = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, userData);
  return response.data;
};
