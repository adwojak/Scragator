import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import qs from "qs";
import Cookies from "universal-cookie";
import store from "../states/store";
import { TOKEN_REFRESH } from "./urls";

const headers = Object.freeze({
  "Content-Type": "application/x-www-form-urlencoded"
});

const getHeaders = tokenType => {
  let auth = {};
  const cookie = new Cookies();
  const token = cookie.get(tokenType);
  if (token) {
    Object.assign(auth, {
      Authorization: `Bearer ${token}`
    });
  }
  return Object.assign({}, headers, auth);
};

const axiosRequestWithTokenCheck = axiosRequest => {
  const cookie = new Cookies();
  const refreshAuthLogic = failedRequest =>
    axios
      .post(
        TOKEN_REFRESH,
        {},
        {
          headers: getHeaders("refreshToken")
        }
      )
      .then(response => {
        cookie.set("accessToken", response.data.access_token);
        failedRequest.response.config.headers["Authorization"] =
          "Bearer " + response.data.access_token;
        return Promise.resolve();
      });
  createAuthRefreshInterceptor(axios, refreshAuthLogic);
  return axiosRequest();
};

export const axiosPost = (url, data) => {
  return axiosRequestWithTokenCheck(() => {
    return axios.post(url, qs.stringify(data), {
      headers: getHeaders("accessToken")
    });
  });
};

export const axiosGet = url => {
  return axiosRequestWithTokenCheck(() => {
    return axios.get(url, {
      headers: getHeaders("accessToken")
    });
  });
};
