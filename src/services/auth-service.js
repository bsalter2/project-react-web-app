import axios from "axios";

const SERVER = "http://localhost:4000";
const BASE_API = `${SERVER}/api/users`;

const request = axios.create({
  withCredentials: true,
});

export const register = async (user) => {
  const response = await request.post(`${BASE_API}/register`, user);
  return response.data;
};

export const login = async (user) => {
  const response = await request.post(`${BASE_API}/login`, user);
  return response.data;
};

export const profile = async () => {
  const response = await request.post(`${BASE_API}/profile`);
  return response.data;
};

export const logout = async () => {
  const response = await request.post(`${BASE_API}/logout`);
  return response.data;
};