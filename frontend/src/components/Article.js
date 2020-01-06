// @flow
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { addFavArticle, removeFavArticle } from "../states/actions";
import singleArticleAPI from "../api/singleArticle";
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
  const { id, date, author, title, service, isFavourite } = props.article;
  const [favourite, setFavourite] = React.useState(isFavourite);
  const isLogged = useSelector((state: Object): Object => state.isLogged);
  const dispatch = useDispatch();

  const callAddFavArticle = () => {
    singleArticleAPI.POST.addFavArticle({
      article_id: id
    })
      .then(response => {
        dispatch(
          addFavArticle({
            favouriteArticles: response.data.user_fav_articles
          })
        );
        setFavourite(true);
      })
      .catch(error => {
        this.props.history.push("/message", {
          serverError: true
        });
      });
  };

  const callRemoveFavArticle = () => {
    singleArticleAPI.POST.removeFavArticle({
      article_id: id
    })
      .then(response => {
        dispatch(
          removeFavArticle({
            favouriteArticles: response.data.user_fav_articles
          })
        );
        setFavourite(false);
      })
      .catch(error => {
        this.props.history.push("/message", {
          serverError: true
        });
      });
  };

  const bookmarkClicked = () => {
    if (isLogged) {
      if (favourite) {
        callRemoveFavArticle();
      } else {
        callAddFavArticle();
      }
    } else {
      console.log("You need to be logged in to save articles!");
    }
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
