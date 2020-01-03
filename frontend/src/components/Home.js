// @flow
import * as React from "react";
import classNames from "classnames";
import "./Home.scss";

const favouriteArticles = [1, 3, 5, 7];
const exampleArticle = number => {
  return {
    id: String(number),
    title: `Article title Article title Article title Article title Article title Article title Article title Article title ${number}`,
    service: `Service ${number}`,
    author: `Author ${number}`,
    date: "12",
    url: "",
    img: "https://miro.medium.com/max/590/1*cBFSQ9Ytv_D0jwGtpuL5WA.png",
    isFavourite: favouriteArticles.includes(number)
  };
};
const exampleArticlesList = () => {
  return Array.from({ length: 10 }, (value, key) => exampleArticle(key));
};

const ArticlesList = () => {
  return (
    <ul className="Articles">
      {exampleArticlesList().map(article => (
        <li key={article.id}>
          <span
            className={classNames({
              ArticleBookmark: true,
              Favourite: article.isFavourite
            })}
          ></span>
          <span className="ArticleDate">{article.date}</span>
          <span className="ArticleAuthor">
            {article.service} | {article.author}
          </span>
          <hr />
          <span className="ArticleTitle">{article.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default ArticlesList;
