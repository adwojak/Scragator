// @flow
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import {
  addFavArticle,
  removeFavArticle,
  showPopup
} from "../../states/actions";
import singleArticleAPI from "../../api/singleArticle";
import ArticlePlaceholder from "../../static/images/articlePlaceholder.jpg";
import "./Article.scss";

type ArticleType = $ReadOnly<{|
  article: {
    id: number,
    date: string,
    author: string,
    title: string,
    service: string,
    url: string,
    isFavourite: boolean
  },
  setDisplayArticle: Function
|}>;

const Article = (props: ArticleType): React.Node => {
  const { id, date, author, title, service, url, isFavourite } = props.article;
  const { setDisplayArticle } = props;
  const [favourite, setFavourite] = React.useState(isFavourite);
  const isLogged = useSelector((state: Object): Object => state.isLogged);
  const dispatch = useDispatch();

  const callAddFavArticle = () => {
    singleArticleAPI.POST.addFavArticle({
      article_id: id
    })
      .then((response: Object) => {
        dispatch(
          addFavArticle({
            favouriteArticles: response.data.user_fav_articles
          })
        );
        setFavourite(true);
      })
      .catch((error: Error) => {
        this.props.history.push("/message", {
          serverError: true
        });
      });
  };

  const callRemoveFavArticle = () => {
    singleArticleAPI.POST.removeFavArticle({
      article_id: id
    })
      .then((response: Object) => {
        dispatch(
          removeFavArticle({
            favouriteArticles: response.data.user_fav_articles
          })
        );
        setFavourite(false);
      })
      .catch((error: Error) => {
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
      dispatch(showPopup({ showPopup: true }));
    }
  };

  const openWindow = (event: Event) => {
    const notTriggerOnClasses = ["ArticleBookmark", "Favourite"];
    if (!notTriggerOnClasses.includes(event.target.className)) {
      setDisplayArticle(url);
    }
  };

  return (
    <li
      className="Article"
      style={{
        backgroundImage: `url(${ArticlePlaceholder})`,
        height: `${Math.floor(Math.random() * 130) + 151}px`
      }}
      onClick={openWindow}
    >
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
