import axios from "axios";
import { getServerSideProps } from "../index";

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
