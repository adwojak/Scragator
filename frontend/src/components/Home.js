// @flow
import * as React from "react";
import Article from "./Article";
import "./Home.scss";

const favouriteArticles = [1, 3, 5, 7];
const exampleArticle = number => {
  return {
    id: String(number),
    title: `Article title Article title Article title Article title Article title Article title Article title Article tit ${number}`,
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
        <Article key={article.id} article={article} />
      ))}
    </ul>
  );
};

export default ArticlesList;
