import { axiosPost } from "./apiBase";

const addFavArticle = data => {
  return axiosPost("http://127.0.0.1:5000/add_fav_article", data);
};

const removeFavArticle = data => {
  return axiosPost("http://127.0.0.1:5000/remove_fav_article", data);
};

const singleArticleApi = {
  POST: {
    addFavArticle: addFavArticle,
    removeFavArticle: removeFavArticle
  }
};

export default Object.create(singleArticleApi);