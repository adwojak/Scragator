// @flow
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import Cookies from "universal-cookie";
import { TOKEN_REFRESH } from "./urls";

const headers = Object.freeze({
  "Content-Type": "application/json"
});

const getHeaders = (tokenType: string): Object => {
  const auth = {};
  const cookie = new Cookies();
  const token = cookie.get(tokenType);
  if (token) {
    Object.assign(auth, {
      Authorization: `Bearer ${token}`
    });
  }
  return Object.assign({}, headers, auth);
};

const axiosRequestWithTokenCheck = (axiosRequest: Promise): Promise => {
  const cookie = new Cookies();
  const refreshAuthLogic = (failedRequest: Promise): Promise =>
    axios
      .post(
        TOKEN_REFRESH,
        {},
        {
          headers: getHeaders("refreshToken")
        }
      )
      .then((response: Object): Promise => {
        cookie.set("accessToken", response.data.access_token);
        failedRequest.response.config.headers["Authorization"] =
          "Bearer " + response.data.access_token;
        return Promise.resolve();
      });
  createAuthRefreshInterceptor(axios, refreshAuthLogic);
  return axiosRequest();
};

export const axiosPost = (url: string, data: Object): Promise => {
  return axiosRequestWithTokenCheck((): Promise => {
    return axios.post(url, data, {
      headers: getHeaders("accessToken")
    });
  });
};

export const axiosGet = (url: string): Promise => {
  return axiosRequestWithTokenCheck((): Promise => {
    return axios.get(url, {
      headers: getHeaders("accessToken")
    });
  });
};
