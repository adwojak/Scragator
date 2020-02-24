// @flow
import * as React from "react";
import { useTranslation } from 'react-i18next';
import "./ArticleWindow.scss";

type PropsType = $ReadOnly<{|
  url: string,
  setDisplayArticle: Function
|}>;

const ArticleWindow = (props: PropsType): React.Node => {
  const { url, setDisplayArticle } = props;
  const { t } = useTranslation();
  return (
    <div className="OuterFrame">
      <iframe className="Frame" title={url} src={url}></iframe>
      <button
        className="FrameButton"
        onClick={(): null => setDisplayArticle(null)}
      >
        {t("RETURN")}
      </button>
    </div>
  );
};

export default ArticleWindow;
