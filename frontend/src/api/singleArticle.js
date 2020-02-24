// @flow
import { axiosPost } from "./apiBase";
import { ADD_FAV_ARTICLE, REMOVE_FAV_ARTICLE } from "./urls";

const addFavArticle = (data: Object): Promise => {
  return axiosPost(ADD_FAV_ARTICLE, data);
};

const removeFavArticle = (data: Object): Promise => {
  return axiosPost(REMOVE_FAV_ARTICLE, data);
};

const singleArticleApi = {
  POST: {
    addFavArticle: addFavArticle,
    removeFavArticle: removeFavArticle
  }
};

export default Object.create(singleArticleApi);
