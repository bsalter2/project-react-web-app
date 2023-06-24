import axios from "axios";

const SERVER = "http://localhost:4000";
const BASE_API = `${SERVER}/api/users`;

const request = axios.create({
  withCredentials: true,
});

export const getAllUsers = async () => {
  const response = await axios.get(BASE_API);
  return response.data;
};

export const getUserByID = async (id) => {
  const response = await axios.get(`${BASE_API}/${id}`);
  return response.data;
};

export const getUserByUsername = async (username) => {
  const response = await axios.get(`${BASE_API}/username/${username}`);
  return response.data;
}

export const createUser = async (user) => {
  const response = await axios.post(BASE_API, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${BASE_API}/${id}`);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${BASE_API}/${id}`, user);
  return response.data;
};