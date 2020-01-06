// @flow
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { addFavArticle, removeFavArticle } from "../states/actions";
import singleArticleAPI from "../api/singleArticle";
import "./Article.scss";

const Service = props => {
  const { serviceName, serviceImg, isFavourite } = props.service;
  return (
    <div>
      <p>{serviceName}</p>
    </div>
  );
};

export default Service;
