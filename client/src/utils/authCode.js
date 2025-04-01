import axios from 'axios';
import { getToken, setToken, removeToken } from './Token';

export const refreshToken = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/refresh', {
      token: getToken()
    });
    setToken(res.data.token);
    return res.data.token;
  } catch (err) {
    console.error('Failed to refresh token', err);
    removeToken();
    return null;
  }
};