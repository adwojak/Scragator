import { axiosPost } from "./apiBase";

const POST = data => {
  return axiosPost("http://127.0.0.1:5000/user/login", data);
};

const loginAPI = {
  POST: POST
};

export default Object.create(loginAPI);
