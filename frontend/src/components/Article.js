// @flow
import * as React from "react";
import classNames from "classnames";
import "./Article.scss";

type ArticleType = $ReadOnly<{|
  article: {
    date: string,
    author: string,
    title: string,
    service: string,
    isFavourite: boolean
  }
|}>;

const Article = (props: ArticleType): React.Node => {
  const { date, author, title, service, isFavourite } = props.article;

  const [favourite, setFavourite] = React.useState(isFavourite);

  const bookmarkClicked = () => {
    setFavourite(!favourite);
    // Handle request for saving new favourire and saving it to users global store
  };

  return (
    <li className="Article">
      <span className="ArticleBookmark" onClick={bookmarkClicked}></span>
      <span
        className={classNames({ Favourite: favourite })}
        onClick={bookmarkClicked}
      ></span>
      <span className="ArticleDate">{date}</span>
      <span className="ArticleAuthor">
        {service} | {author}
      </span>
      <hr />
      <span className="ArticleTitle">{title}</span>
    </li>
  );
};

export default Article;
