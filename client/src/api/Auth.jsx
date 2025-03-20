import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.post(`${API_URL}/register`, userData, config);
  return response.data;
};

export const loginUser = async (loginData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.post(`${API_URL}/login`, loginData, config);
  return response.data;
};