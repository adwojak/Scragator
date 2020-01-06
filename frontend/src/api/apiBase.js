import axios from "axios";
import qs from "qs";
import store from "../states/store";

export const axiosPost = (url, data) => {
  const accessToken = store.getState().accessToken;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  if (accessToken) {
    Object.assign(headers, {
      Authorization: `Bearer ${accessToken}`
    });
  }

  return axios.post(url, qs.stringify(data), {
    headers: headers
  });
};
