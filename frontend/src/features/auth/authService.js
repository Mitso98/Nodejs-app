// Service is for making HTTP requests & setting data in the local storage

import axios from "axios";

const API_URL = "/api/users/";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  // take the response data and save it into the local storage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//logout
const logout = async () => {
  localStorage.removeItem("user");
};

//login
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  // take the response data and save it into the local storage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
