import { axiosPost } from "./apiBase";

const POST = data => {
  return axiosPost("http://127.0.0.1:5000/page", data);
};

const articlesAPI = {
  POST: POST
};

export default Object.create(articlesAPI);
