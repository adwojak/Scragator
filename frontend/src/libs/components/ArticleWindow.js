// @flow
import * as React from "react";
import "./ArticleWindow.scss";

type PropsType = $ReadOnly<{|
  url: string,
  setDisplayArticle: Function
|}>;

const ArticleWindow = (props: PropsType): React.Node => {
  const { url, setDisplayArticle } = props;
  return (
    <div className="OuterFrame">
      <iframe className="Frame" title={url} src={url}></iframe>
      <button
        className="FrameButton"
        onClick={(): null => setDisplayArticle(null)}
      >
        Return
      </button>
    </div>
  );
};

export default ArticleWindow;
