// @flow
import { axiosPost } from "./apiBase";
import { ADD_FAV_SERVICE, REMOVE_FAV_SERVICE } from "./urls";

const addFavService = (data: Object): Promise => {
  return axiosPost(ADD_FAV_SERVICE, data);
};

const removeFavService = (data: Object): Promise => {
  return axiosPost(REMOVE_FAV_SERVICE, data);
};

const singleServiceApi = {
  POST: {
    addFavService: addFavService,
    removeFavService: removeFavService
  }
};

export default Object.create(singleServiceApi);
