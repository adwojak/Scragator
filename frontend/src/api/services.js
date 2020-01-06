import { axiosGet } from "./apiBase";

const GET = () => {
  return axiosGet("http://127.0.0.1:5000/services");
};

const servicesAPI = {
  GET: GET
};

export default Object.create(servicesAPI);
