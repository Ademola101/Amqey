import axios from 'axios';
export const baseURL = 'https://b711274bcd9c.ngrok-free.app';
const api = axios.create({
  baseURL: 'https://b711274bcd9c.ngrok-free.app',
  timeout: 10000, 
});

export default api;