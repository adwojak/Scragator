import { axiosPost } from "./apiBase";

const addFavService = data => {
  return axiosPost("http://127.0.0.1:5000/add_fav_service", data);
};

const removeFavService = data => {
  return axiosPost("http://127.0.0.1:5000/remove_fav_service", data);
};

const singleServiceApi = {
  POST: {
    addFavService: addFavService,
    removeFavService: removeFavService
  }
};

export default Object.create(singleServiceApi);