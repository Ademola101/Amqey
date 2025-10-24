import axios from 'axios';
export const baseURL = 'https://2062207da8df.ngrok-free.app';
const api = axios.create({
  baseURL: baseURL,
  timeout: 10000, 
});

export default api;