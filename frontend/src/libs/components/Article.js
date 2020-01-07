// @flow
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { addFavArticle, removeFavArticle } from "../../states/actions";
import singleArticleAPI from "../../api/singleArticle";
import "./Article.scss";

type ArticleType = $ReadOnly<{|
  article: {
    id: number,
    date: string,
    author: string,
    title: string,
    service: string,
    isFavourite: boolean
  },
  setDisplayArticle: Function
|}>;

const Article = (props: ArticleType): React.Node => {
  const { id, date, author, title, service, url, isFavourite } = props.article;
  const { setDisplayArticle } = props;
  const [favourite, setFavourite] = React.useState(isFavourite);
  const [renderArticle, setRenderArticle] = React.useState(false);
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
      console.log("You need to be logged in to save articles!");
    }
  };

  const openWindow = event => {
    const notTriggerOnClasses = ["ArticleBookmark", "Favourite"];
    if (!notTriggerOnClasses.includes(event.target.className)) {
      setDisplayArticle(url);
      // return (
      //   <div>
      //     <iframe
      //       src={url}
      //       width={`80%`}
      //       height={`100%`}
      //       style={{ position: `fixed`, float: `left` }}
      //       frameborder={0}
      //     ></iframe>
      //   </div>
      // );fixed
    }
  };

  // const ArticleWindow = () => {
  //   return (
  //     <div
  //       style={{
  //         display: "flow",
  //         alignItems: "center",
  //         zIndex: "100"
  //       }}
  //     >
  //       <iframe
  //         src={url}
  //         width={`80%`}
  //         height={`100%`}
  //         style={{ position: `absolute`, float: `left` }}
  //         frameborder={0}
  //       ></iframe>
  //     </div>
  //   );
  // };

  return (
    <li
      className="Article"
      style={{
        backgroundImage:
          "url(https://m.autokult.pl/tesla-model-3jp-jpg-121a-8e93371,750,470,0,0.jpg)",
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
