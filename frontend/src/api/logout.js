import { axiosPost } from "./apiBase";

const POST = data => {
  return axiosPost("http://127.0.0.1:5000/user/logout_access");
};

const logoutAPI = {
  POST: POST
};

export default Object.create(logoutAPI);
