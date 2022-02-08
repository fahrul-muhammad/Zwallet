import axios from "axios";

export const TopUp = (body, token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/transaction/top-up`;
  return axios.post(URL, body, { headers: { Authorization: "Bearer " + token } });
};

export const GetChart = (id, token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/dashboard/${id}`;
  return axios.get(URL, { headers: { Authorization: "Bearer " + token } });
};

export const GetHistory = (token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/transaction/history?page=1&limit=4&filter=WEEK`;
  return axios.get(URL, { headers: { Authorization: "Bearer " + token } });
};

export const getAllHistory = (filter, page, token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/transaction/history?page=${page}&limit=6&filter=${filter}`;
  return axios.get(URL, { headers: { Authorization: "Bearer " + token } });
};

export const Transfer = (body, token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/transaction/transfer`;
  return axios.post(URL, body, { headers: { Authorization: "Bearer " + token } });
};
