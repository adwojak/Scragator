import axios from "axios";
import qs from "qs";

export const axiosPost = (url, data) => {
  return axios.post(url, qs.stringify(data), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};
