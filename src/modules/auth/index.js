import axios from "axios";

export const Login = (body) => {
  console.log(process.env.NEXT_PUBLIC_HOST);
  const URL = `${process.env.NEXT_PUBLIC_HOST}/auth/login`;
  return axios.post(URL, body);
};

export const Register = (body) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/auth/register`;
  return axios.post(URL, body);
};

export const GetUser = (token, id) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/user/profile/${id}`;
  return axios.get(URL, { headers: { Authorization: "Bearer " + token } });
};

export const Logout = (token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/auth/logout`;
  return axios.post(URL, { headers: { Authorization: "Bearer " + token } });
};

export const getContact = (token, page) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/user?page=${page}&limit=3&sort=firstName DESC`;
  return axios.get(URL, { headers: { Authorization: "Bearer " + token } });
};

export const SearchUser = (page, key, token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/user?page=${page}&limit=3&search=${key}`;
  return axios.get(URL, { headers: { Authorization: "Bearer " + token } });
};

export const getUserById = (id, token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/user/profile/${id}`;
  return axios.get(URL, { headers: { Authorization: "Bearer " + token } });
};
