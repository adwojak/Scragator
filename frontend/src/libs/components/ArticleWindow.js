import * as React from "react";
import "./ArticleWindow.scss";

const ArticleWindow = props => {
  const { url, setDisplayArticle } = props;
  return (
    <div className="OuterFrame">
      <iframe className="Frame" src={url}></iframe>
      <button className="FrameButton" onClick={() => setDisplayArticle(null)}>
        Return
      </button>
    </div>
  );
};

export default ArticleWindow;
