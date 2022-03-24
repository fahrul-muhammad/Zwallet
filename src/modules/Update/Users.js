import axios from "axios";

export const CreatePin = (pin, id, token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/user/pin/${id}`;
  return axios.patch(URL, pin, { headers: { Authorization: "Bearer " + token } });
};

export const userPhoneNumber = (id, noTelp, token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/user/profile/${id}`;
  return axios.patch(URL, noTelp, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const changePassword = (id, body, token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/user/password/${id}`;
  return axios.patch(URL, body, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const updateUserProfileImage = (id, body, token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/user/image/${id}`;
  return axios.patch(URL, body, {
    headers: { Authorization: "Bearer " + token },
  });
};
