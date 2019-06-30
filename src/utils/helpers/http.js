// helper function
import { authService } from '../auth';

// third party library
import axios from 'axios';

const token = authService.getToken();

const http = axios.create({
  baseURL: process.env.REACT_APP_SHOPMATE_API,
  headers: {
    'user-key': token,
  },
});

http.interceptors.request.use((config) => {
  if (authService.isExpired()) {
    // still need to come to this because the decoded exp date is returning years back
    localStorage.removeItem('jwtToken')
  }
  return config;
});

export default http;
