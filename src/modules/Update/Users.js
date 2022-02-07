import axios from "axios";

export const CreatePin = (pin, id, token) => {
  const URL = `${process.env.NEXT_PUBLIC_HOST}/user/pin/${id}`;
  return axios.patch(URL, pin, { headers: { Authorization: "Bearer " + token } });
};
